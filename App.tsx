import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Travelogue from "./Screens/travelogue";
import JoinRooms from "./Screens/joinRooms";
import Profile from "./Screens/profile";

const Tab = createBottomTabNavigator();

const App = ()=>{
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name = "Travelogue" component={Travelogue}/>
        <Tab.Screen name = "Joined Rooms" component={JoinRooms}/>
        <Tab.Screen name = "Profile" component={Profile}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;