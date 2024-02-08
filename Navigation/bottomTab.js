import React, {useEffect, useState}from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Travelogue from '../Screens/travelogue';
import JoinRooms from '../Screens/joinRooms';
import Profile from '../Screens/profile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const BottomTab = ({navigation}) => {
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

    // console.log("fghj:::", userData.userInfo.userName);
    // let name= (userData.userInfo.userName);
  return (
    
      <Tab.Navigator
        screenOptions={({route}) => ({
            headerTitle:"",
          headerLeft: ({userInfo}) => {
            return (
              <View style={styles.container}>
                <View>
                  <Image
                    style={styles.profile}
                    source={{
                      uri: 'https://cdn.pixabay.com/photo/2015/07/29/22/56/taj-mahal-866692_1280.jpg',
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.name}>{'Satish Kumar'}</Text>
                  <Text style={styles.name}>{'📍 Tiruchirappalli'}</Text>
                </View>
              </View>
            );
          },

          headerRight:()=>{
            return(
                <TouchableOpacity onPress={()=>{
                    AsyncStorage.clear();
                    navigation.navigate('Login')
                }}>
                    <Text style={styles.logout}>
                        Logout
                    </Text>
                </TouchableOpacity>
            
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
        <Tab.Screen name="Travelogue" component={Travelogue}/>
        <Tab.Screen name="Joined Rooms" component={JoinRooms} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-start',
    padding: 5,
    position: 'absolute',
    paddingRight: 10,
  },
  name:{
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  profile:{
    width: 40,
    height: 40,
    borderRadius: 50,
    marginLeft: 10,
  },
  logout:{
    color:'blue',
    padding:10,
    fontWeight:'bold',
  }
});
export default BottomTab;
