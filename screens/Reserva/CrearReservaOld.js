import 'react-native-gesture-handler'
import React from 'react';
import {
  StatusBar,
  Text,
  View,
  TextInput,
  Button,
  Alert,
} from 'react-native';

const CrearReserva = ({ navigation }) => {

 
  return (
    <View  >
      <View>
        <TextInput
          placeholder="Name"

          onChange={(e) => ""}
        />


      </View>

      <Text >Realiza tu reserva</Text>
      <Button
        title="Confirmar"
        onPress={() => CrearReserva}
      />
    </View>

  );


}

export default CrearReserva


