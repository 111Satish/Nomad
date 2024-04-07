import { Text, StyleSheet, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PlanTripScreen from '../Screens/planTrip';
import TripHubScreen from '../Screens/tripHub';
import getColorScheme from '../Utils/colorsSchema';
const colors = getColorScheme();
const Tab = createMaterialTopTabNavigator();

export default function TabNavigationTrip() {

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.button,
        inactiveTintColor: colors.text,
        style: { backgroundColor: colors.primary },
      }}
      tabBarHideOnScroll={true}
    >
      <Tab.Screen
        name="Your Trips"
        component={PlanTripScreen}
        options={({ route }) => ({
          tabBarVisible: route.state && route.state.index === 0,
        })}
      />
      <Tab.Screen
        name="Public Trips"
        component={TripHubScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
