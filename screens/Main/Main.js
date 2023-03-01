import 'react-native-gesture-handler'
import { useState, useEffect } from "react";
import React from 'react';
import { Text, View, TouchableHighlight, Button, StyleSheet, TouchableOpacity } from 'react-native';
import firebaseService from '../../services/firebase';
import { useNavigation } from "@react-navigation/native";

const Main = ({ navigation }) => {


  
  const [userName, setUserName] = useState('')
  //Equivalente a deepComponentMode
  useEffect(() => {
    (
      async () => {

        try {
          const userData = await firebaseService.getUser()
          setUserName(userData)
        } catch (e) {

          alert(e)
        }
      }
    )()
  }, [])


  return (

    
    
    <View style={styles.container}>
      
      <Text style={styles.tittle}> {`Bienvenidos ${userName} a Alquileres De Canchas!`} </Text>
      


      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Reserva")} >
        
        <Text style={styles.textButton}>VER RESERVAS</Text>
      </TouchableOpacity>
    
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CrearReserva")} >
        <Text style={styles.textButton}>CREAR RESERVA</Text>
      </TouchableOpacity>

     
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center'
    

  },
  inputText: {
    height: 50,
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 20,
    color: 'black',
    backgroundColor: 'white'

  },
  tittle: {
    height: 30,
    borderWidth: 1,
    paddingHorizontal: 50,
    color: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    marginBottom: 100,

  },
  button: {

    elevation: 8,
    backgroundColor: "#1e88e5",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 25,
    marginHorizontal: 50,
    justifyContent: 'center'
    
  },
  textButton: {
    color: 'white',
    textAlign: 'center'
   
  }

})
export default Main