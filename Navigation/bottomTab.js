import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Travelogue from '../Screens/travelogue';
import JoinRooms from '../Screens/joinRooms';
import Profile from '../Screens/profile';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerRight: () => {
            return (
              <View style={styles.container}>
                <View>
                  <Text style={styles.name}>{'Satish Kumar'}</Text>
                  <Text style={styles.name}>{'📍 Tiruchirappalli'}</Text>
                </View>
                <View>
                  <Image
                    style={styles.profile}
                    source={{
                      uri: 'https://cdn.pixabay.com/photo/2015/07/29/22/56/taj-mahal-866692_1280.jpg',
                    }}
                  />
                </View>
              </View>
            );
          },
          // tabBarIcon: ({ color, size }) => {
          //     let iconName;

          //     if (route.name === 'Travelogue') {
          //         return <Image style={styles.icon} source= {require('../assets/icons/eye.png')} />;
          //     }
          //     else if (route.name === 'Joined Rooms') {
          //         return <Image style={styles.icon} source= {require('../assets/icons/network.png')} />;
          //     }
          //     else if(route.name === 'Profile'){
          //         return <Image style={styles.icon} source= {require('../assets/icons/chat.png')} />;
          //     }

          // },
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
        })}>
        <Tab.Screen name="Travelogue" component={Travelogue} />
        <Tab.Screen name="Joined Rooms" component={JoinRooms} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
  );
};

export default BottomTab;
