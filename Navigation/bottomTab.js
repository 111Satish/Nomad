import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Travelogue from '../Screens/travelogue';
import JoinRooms from '../Screens/joinRooms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userStore from '../MobX/userStore';
import { observer } from 'mobx-react-lite';

const Tab = createBottomTabNavigator();

const BottomTab = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await AsyncStorage.getItem('userData');
        const parsedUserInfo = JSON.parse(user);
        console.log(parsedUserInfo);
        setUserData(parsedUserInfo);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitle: '',
        headerLeft: () => (
          <View>
          <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('Profile')}>
            <View>
              <Image
                style={styles.profile}
                source={{
                  uri: 'https://cdn.pixabay.com/photo/2015/07/29/22/56/taj-mahal-866692_1280.jpg',
                }}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{userStore.user.userInfo.userName}</Text>
              <Text style={styles.name}>{'📍 Tiruchirappalli'}</Text>
            </View>
          </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={()=>{navigation.navigate('Feedback')}}>
            <Text style={styles.logout}>Feedback</Text>
          </TouchableOpacity>
        ),
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Travelogue') {
            return <Icon1 name="travel-explore" size={30} color="black" />;
          } else if (route.name === 'Joined Rooms') {
            return <Icon2 name="layer-group" size={30} color="black" />;
          }
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Travelogue" component={Travelogue} />
      <Tab.Screen name="Joined Rooms" component={JoinRooms} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-start',
    padding: 5,
    position: 'absolute',
    paddingRight: 10,
  },
  textContainer:{
    marginLeft:10,
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginLeft: 10,
  },
  logout: {
    color: 'blue',
    padding: 10,
    fontWeight: 'bold',
  },
});

export default observer(BottomTab);
