import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firebaseService from '../../services/firebase';



export default function CrateReserva() {
 const [name, setName] = useState('');
 const [date, setDate] = useState('');
 const [time, setTime] = useState('');

  const handleSubmit = async () => {
    try {
      const data = { name, date };
      await firebaseService.db.collection('reservas').add(data);
      console.log('Reserva creada');
      // Limpiar el formulario después de guardar
      setName('');
      setDate('');
      
  
    } catch (error) {
      console.error('Error al crear reserva:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Crear una reserva</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
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
       
       
      />
      <Button title="Crear reserva" onPress={handleSubmit} />
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
