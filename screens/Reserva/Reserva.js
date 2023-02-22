import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
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
      <View>
        <Text>Nombre: {item.userName}</Text>
        <Text>Fecha: {item.date}</Text>
        <Text>Hora: {item.time}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={reservas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ReservasScreen;
