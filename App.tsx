import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './Screens/signUp';
import Login from './Screens/login';
import BottomTab from './Navigation/bottomTab';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = 'Sign Up' component={SignUp}/>
        <Stack.Screen name = 'Login' component={Login}/>
        <Stack.Screen name = 'BottomTab' component={BottomTab}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
