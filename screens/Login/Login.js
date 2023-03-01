import 'react-native-gesture-handler'
import React, { useState } from 'react';
import { Text, View ,TouchableHighlight, StyleSheet, ImageBackground} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebaseService from '../../services/firebase';

const Login = ({navigation}) =>{
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

const onPressLogin = async () => {
try {
  await firebaseService.login(user, pass)
  navigation.navigate('Main')
} catch (e) {
  alert(e)
}
}

    return (
   
    <View style = {styles.container}>
      <View>
      <TextInput 
      placeholder = "Email"
      style = {styles.inputText}
      value = {user}
      defaultValue ="santiago.valino@gmail.com"
      onChange = {(e) => setUser(e.nativeEvent.text) } 
      />
       <TextInput 
      placeholder = "Password"
      style = {styles.inputText}
      value = {pass}
      defaultValue = "123456"
      onChange = {(e) => setPass(e.nativeEvent.text) } 
      />
      </View>

      <TouchableHighlight style = {styles.button} onPress={onPressLogin}>
        <Text style = {styles.textButton} >Login</Text>
      </TouchableHighlight>
      <TouchableHighlight style = {styles.button}  onPress={() => navigation.navigate('SignUp')}>
        <Text style = {styles.textButton} >Crear nuevo Usuario</Text>
      </TouchableHighlight>
    </View> 
  );
  }

 export default Login

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
    
  },
  inputText : {
      height: 50,
      borderWidth: 1,
      marginTop: 10,
      paddingHorizontal : 20,
      color: 'black',
      backgroundColor: 'white'

  },
  button : {
    elevation: 8,
    backgroundColor: "#1e88e5",
    borderRadius: 10,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,

    },
  textButton : {

      textAlign: 'center',
      color: 'white'
      
      
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // o 'stretch' para ajustar la imagen a todo el fondo
    width: '100%',
    height: '100%'
  }
});