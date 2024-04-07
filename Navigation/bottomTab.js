import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Travelogue from '../Screens/travelogue';
import JoinRooms from '../Screens/joinRooms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userStore from '../MobX/userStore';
import { observer } from 'mobx-react-lite';
import CurrentLocation from '../Components/getLocation';
import getColorScheme from '../Utils/colorsSchema';
import SplitBills from '../Screens/splitBills';
import TabNavigationTrip from './tabNavigationTrip';
const colors = getColorScheme();

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
        tabBarActiveBackgroundColor: colors.accent,
        tabBarInactiveBackgroundColor: colors.background,
        headerTitle: '',
        headerStyle: {
          backgroundColor: colors.primary, 
        },
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
                <CurrentLocation/>
              </View>
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={()=>{navigation.navigate('Feedback')}}>
            <Text style={styles.logout}>Feedback</Text>
          </TouchableOpacity>
        ),
        tabBarIcon: () => {
          if (route.name === 'Travelogue') {
            return <Icon1 name="travel-explore" size={25} color= {colors.text} />;
          }
          if (route.name === 'Joined Rooms') {
            return <Icon2 name="layer-group" size={25} color= {colors.text} />;
          }
          if(route.name === 'Split Bills'){
            return <Icon3 name="rhombus-split" size={25} color= {colors.text} />;
          }
          if(route.name === 'Trips'){
            return <Icon3 name="calendar-range" size={25} color= {colors.text} />;
          }
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          color: colors.text
        },
      })}
    >
      <Tab.Screen name="Travelogue" component={Travelogue} />
      <Tab.Screen name="Joined Rooms" component={JoinRooms} />
      <Tab.Screen name= 'Split Bills' component={SplitBills}/>
      <Tab.Screen name= 'Trips' component={TabNavigationTrip}/>
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
    backgroundColor: colors.primary
  },
  textContainer:{
    marginLeft:10,
  },
  name: {
    fontWeight: 'bold',
    color: colors.text,
    alignSelf: 'center',
  },
  profile: {
    borderWidth:1,
    borderColor: colors.border,
    width: 40,
    height: 40,
    borderRadius: 50,
    marginLeft: 10,
  },
  logout: {
    color: colors.highlight,
    padding: 10,
    fontWeight: 'bold',
  },
});

export default observer(BottomTab);
