import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firebaseService from '../../services/firebase';



function CreateReserva() {

  const userName = firebaseService.getUser();

 const [date, setDate] = useState('');
 const [time, setTime] = useState('');

  const crearReserva = async () => {
    try {
      // Comprobar si ya hay una reserva para la misma fecha y hora
      const reservationsRef = firebaseService.db.collection('reservas');
      const querySnapshot = await reservationsRef
        .where('date', '==', date)
        .where('time', '==', time)
        .get();
      if (!querySnapshot.empty) {
        console.log('Ya existe una reserva para esta fecha y hora');
        return;
      }
  
      // Si no hay ninguna reserva para la misma fecha y hora, guardar la nueva reserva
      const data = { userName, date, time };
      await reservationsRef.add(data);
      console.log('Reserva creada');
      // Limpiar el formulario después de guardar
      
      setDate('');
      setTime('');
    } catch (error) {
      console.error('Error al crear reserva:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Crear una reserva</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userName}
       editable={false}
      />

           <TextInput
        style={styles.input}
        placeholder="Fecha (DD/MM/AAAA)"
        value={date}
        onChangeText={setDate}
   
        
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (HH:MM)"
        value={time}
        onChangeText={setTime}
     
      />
      <Button title="Crear reserva" onPress={crearReserva} />
    </View>
  );
}

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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
});

export default CreateReserva; 