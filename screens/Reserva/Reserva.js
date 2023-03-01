import React, { useState, useEffect } from 'react';
import { View, Text, FlatList , StyleSheet, Button } from 'react-native';
import firebaseService from '../../services/firebase';

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
    justifyContent: 'flex-end'

  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 70,
    alignItems: 'flex-end'

  },
  reservaContainer: {
    borderWidth: 2,
    borderColor: '#1e88e5',
    borderRadius: 20,
    padding: 12,
    marginBottom: 10,
    width: '100%',
    alignSelf: 'center',
    
  },
  reservaText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ReservasScreen;
