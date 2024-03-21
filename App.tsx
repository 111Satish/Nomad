import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Header, createStackNavigator} from '@react-navigation/stack';
import SignUp from './Screens/signUp';
import Login from './Screens/login';
import BottomTab from './Navigation/bottomTab';
import Splash from './Screens/splash';
import ChatScreen from './Screens/chatScreen';
import FeedbackScreen from './Screens/feedBackScreen';
import EditProfile from './Screens/editProfile';
import Profile from './Screens/profile';
import TabNavigation from './Navigation/tabNavigation';
import RoomDetailsScreen from './Screens/roomDetailsScreen';
import TicTacToe from './Screens/tictactoe';

const apiUrl = 'https://nomadbackend.azurewebsites.net';
//const apiUrl = 'http://10.2.106.243:5000'

export {apiUrl};

const Stack = createStackNavigator();

const CustomHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {roomData} = route.params;

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>{`<`}</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>{roomData.roomName}</Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{header: props => <CustomHeader {...props} />}}
        />
        <Stack.Screen name="Room Details" component={RoomDetailsScreen} />
        <Stack.Screen name="TicTacToe" component={TicTacToe} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    padding: 5,
  },
  headerText: {
    marginLeft: 20,
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  back: {
    color: 'black',
    alignItems: 'flex-start',
    fontSize: 30,
    fontWeight: '900',
  },
});

export default App;
