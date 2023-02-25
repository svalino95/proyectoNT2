import React, { useState, useEffect } from 'react';
import { View, Text, FlatList , StyleSheet} from 'react-native';
import firebaseService from '../../services/firebase';

const ReservasScreen = () => {
  const [reservas, setReservas] = useState([]);

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
    </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lista de reservas</Text>
      <FlatList
        data={reservas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reservaContainer: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 10,
    width: '80%',
    alignSelf: 'center',
  },
  reservaText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ReservasScreen;
