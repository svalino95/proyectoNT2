import React from "react";
import {createStackNavigator } from '@react-navigation/stack'
import {NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//pantallas
import Login from './screens/Users/Login/Login'
import SignUp from './screens/Users/SignUp/SingUp'
import Main from './screens/Main/Main'
import Reserva from './screens/Reserva/Reserva'
import CrearReserva from './screens/Reserva/CrearReserva'
import SettingScreen from "./screens/Users/SettingScreen";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    card: 'rgb(182,166,220)',
    

  },
};


function MyStack() {    
    return(
<Stack.Navigator screenOptions = {{headerShown: false}}   initialRouteName = "Login" >

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

    <Tab.Navigator screenOptions = {{headerShown: false}}  >
        <Tab.Screen name ="Home" component={MyStack}/>
          <Tab.Screen name ="Setting" component={SettingScreen}/>
      
    </Tab.Navigator>
    
  );
}

export default function Navigation() {
    return (
      <NavigationContainer theme={MyTheme}>
  
  <MyTabs/>
  
  
      </NavigationContainer>
       
      
    );
    }

