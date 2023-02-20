import 'react-native-gesture-handler'
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from 'react-native';

import {
    StatusBar,
    Text,
    View,
    TextInput,
    Button,
    Alert,
} from 'react-native';


const HomeScreen = () => {
      
    const navigation = useNavigation();

    
    return (<View>
                <Text> { `Bienvenidos a Alquileres De Canchas!`} </Text> 
 
         
                
     </View>);


}

StyleSheet.create({

    container: { flex: 1, justifyContent: "center", alignItems: "center"}

})

export default HomeScreen