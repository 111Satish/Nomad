import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { Header, createStackNavigator } from '@react-navigation/stack';
import SignUp from './Screens/signUp';
import Login from './Screens/login';
import BottomTab from './Navigation/bottomTab';
import Splash from './Screens/splash';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = 'Splash' component={Splash} options={{headerShown: false}}/>
        <Stack.Screen name = 'Sign Up' component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name = 'Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name = 'BottomTab' component={BottomTab} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
