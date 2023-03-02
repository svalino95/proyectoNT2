import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet , Alert} from 'react-native';
import firebaseService from '../../services/firebase';



const validateTime = (time) => {
  const [hour, minute] = time.split(':');
  const numericHour = parseInt(hour, 10);
  if (numericHour < 10 || numericHour > 22) {
    return false;
  }
  return true;
}

function CreateReserva() {

  const userName = firebaseService.getUser();

 const [date, setDate] = useState('');
 const [time, setTime] = useState('');
const status = 'Aceptada'


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
      Alert.alert('Aviso', 'Ya existe una reserva para esta fecha y hora');
      return;
    }

    // Validar que la hora sea válida
    if (!validateTime(time)) {
      console.log('La hora ingresada no es válida');
      return;
    }

    // Validar que la fecha sea válida y no anterior al día actual
    const dateFormat = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!dateFormat.test(date)) {
      console.log('Formato de fecha inválido');
      return;
    }

    const [day, month, year] = date.split('/');
    const numericYear = parseInt(year, 10);
    const numericMonth = parseInt(month, 10) - 1; // Los meses en Date empiezan en 0
    const numericDay = parseInt(day, 10);
    const selectedDate = new Date(numericYear, numericMonth, numericDay);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      console.log('La fecha ingresada no puede ser anterior al día actual');
      return;
    }

    // Si no hay ninguna reserva para la misma fecha y hora y la hora es válida, guardar la nueva reserva
    const data = { userName, date, time , status};
    await reservationsRef.add(data);
    console.log('Reserva creada');
    Alert.alert('Aviso', 'Reserva creada con éxito');

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
        required={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (HH)"
        value={time}
        onChangeText={setTime}
        required={true}
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
    backgroundColor: '#ffe4c4'
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