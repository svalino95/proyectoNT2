import 'react-native-gesture-handler'
import React, { useState } from 'react';
import { Text, View ,TouchableHighlight} from 'react-native';
import styles from './styles'
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