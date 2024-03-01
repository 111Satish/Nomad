import { Text, StyleSheet, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChatScreen from '../Screens/chatScreen';
import AiBotScreen from '../Screens/aiBotScreen';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigation({ route }) {
  const { roomData } = route.params;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        initialParams={{ roomData: roomData }}
      />
      <Tab.Screen name="AI Bot" component={AiBotScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
