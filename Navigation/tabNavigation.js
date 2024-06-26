import { Text, StyleSheet, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChatScreen from '../Screens/chatScreen';
import InsightfulGuides from '../Screens/insightfulGuides';
import getColorScheme from '../Utils/colorsSchema';
const colors = getColorScheme();
const Tab = createMaterialTopTabNavigator();

export default function TabNavigation({ route }) {
  const { roomData } = route.params;

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.button,
        inactiveTintColor: colors.text,
        style: { backgroundColor: colors.primary},
      }}
      tabBarHideOnScroll={true}
    >
      <Tab.Screen
        name="Chats"
        component={ChatScreen}
        initialParams={{ roomData: roomData }}
        options={({ route }) => ({
          tabBarVisible: route.state && route.state.index === 0,
        })}
      />
      <Tab.Screen
        name="Insightful Guides"
        component={InsightfulGuides} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
