import React, { useState, useEffect } from 'react';
import { View, Text, FlatList , StyleSheet, Button } from 'react-native';
import { BackgroundImage, fonts } from 'react-native-elements/dist/config';
import firebaseService from '../../services/firebase';

const image = {uri: 'https://media.c5n.com/p/2b480f8121a831626f9002c51417d228/adjuntos/326/imagenes/000/162/0000162236/1200x675/smart/lionel-messi-mundial-qatar-2022-copa-del-mundo.jpg'}
const ReservasScreen = () => {
  const [reservas, setReservas] = useState([]);

  const cancelarReserva = (id) => {
    firebaseService.db.collection('reservas').doc(id).update({
      status: 'Cancelada',
    }).then(() => {
      console.log('Reserva cancelada');
      // Actualiza la lista de reservas para reflejar el cambio de estado
      const updatedReservas = [...reservas];
      const reservaIndex = updatedReservas.findIndex((r) => r.id === id);
      updatedReservas[reservaIndex] = { ...updatedReservas[reservaIndex], status: 'Cancelada' };
      setReservas(updatedReservas);
    }).catch((error) => {
      console.error('Error al cancelar la reserva:', error);
    });
  };

  const eliminarReserva = (id) => {
    firebaseService.db.collection('reservas').doc(id).delete()
      .then(() => {
        console.log('Reserva eliminada');
        // Actualiza la lista de reservas para reflejar el cambio de estado
        const updatedReservas = reservas.filter((r) => r.id !== id);
        setReservas(updatedReservas);
      }).catch((error) => {
        console.error('Error al eliminar la reserva:', error);
      });
  };

  useEffect(() => {
    const userId = firebaseService.getUser();
    firebaseService.db.collection('reservas')
      .where('userName', '==', userId)
      .get()
      .then(querySnapshot => {
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReservas(docs);
      })
      .catch(error => {
        console.error('Error al obtener las reservas:', error);
      });
  }, []);


  
  const renderItem = ({ item }) => {
    return (
     
      <View style={styles.reservaContainer}>
        
        <Text style={styles.reservaText}>{item.userName}</Text>
        <Text style={styles.reservaText}>{item.date} a las {item.time} hs</Text>
        <Text style={styles.reservaText}>Estado: {item.status}</Text>
        {item.status === 'Aceptada' && (
          <Button title="Cancelar reserva" onPress={() => cancelarReserva(item.id)} />
          
      
        )}
        <Button title="Eliminar" onPress={() => eliminarReserva(item.id)} />
        
      </View>
      
    );
  };

  return (
   
    <View style={styles.container}>
      <Text style={styles.heading}>  </Text>
      <Text style={styles.heading}>{`Listado de reservas: `}</Text>
      
      <FlatList
        data={reservas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 1000 }}
      />
      
    </View>
   
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#ffe4c4'

  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 70,
    alignItems: 'flex-end',
    color: 'black'

  },
  reservaContainer: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    padding: 12,
    marginBottom: 10,
    width: '100%',
    alignSelf: 'center',
    opacity: 1
  },
  reservaText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
    fontSize: 17,
  
 
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    opacity: 0.8,
    backgroundColor: "#ffe4c4",
  },
});

export default ReservasScreen;
