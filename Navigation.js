import React from "react";
import {createStackNavigator } from '@react-navigation/stack'
import {NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//pantallas
import Login from './screens/Login/Login'
import SignUp from './screens/SignUp/SingUp'
import Main from './screens/Main/Main'
import Reserva from './screens/Reserva/Reserva'
import CrearReserva from './screens/Reserva/CrearReserva'
import SettingScreen from "./screens/Home/SettingScreen";
import HomeScreen from "./screens/Home/HomeScreen";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyStack() {    
    return(
<Stack.Navigator initialRouteName = "Main">

    <Stack.Screen name = "Login" component={Login}></Stack.Screen>
    <Stack.Screen name = "SignUp" component={SignUp}></Stack.Screen>
    <Stack.Screen name = "Main" component={Main}></Stack.Screen>
    <Stack.Screen name = "Reserva" component={Reserva}></Stack.Screen>
    <Stack.Screen name = "CrearReserva" component={CrearReserva}></Stack.Screen>

</Stack.Navigator>
)

}

function MyTabs() {
  return (

    <Tab.Navigator>
        <Tab.Screen name ="MinMenu" component={MyStack}/>
          <Tab.Screen name ="Home" component={HomeScreen}/>
        
      

        
    </Tab.Navigator>
    
  );
}

export default function Navigation() {
    return (
      <NavigationContainer>
  
  <MyTabs/>
  
  
      </NavigationContainer>
       
      
    );
    }

