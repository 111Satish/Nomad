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
import getColorScheme from './Utils/colorsSchema';
import Icon from 'react-native-vector-icons/AntDesign';
import UpdateTripScreen from './Screens/updateTrip';
import TripDetailsScreen from './Screens/trip';
import ExpenseDetails from './Screens/expenseDetails';
import SettleUp from './Screens/setlleUp';
import SettleAmount from './Screens/settleAmount';
import Expenses from './Screens/expenses';
const colors = getColorScheme();

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
        <Icon name="arrowleft" size={30} color={colors.text} />
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
        <Stack.Screen
          name="Feedback"
          component={FeedbackScreen}
          options={{
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.text,
          }}
        />

        <Stack.Screen
          name="Edit Profile"
          component={EditProfile}
          options={{
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.text,
          }}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.text,
          }}
        />
        <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{header: props => <CustomHeader {...props} />}}
        />
        <Stack.Screen
          name="Room Details"
          component={RoomDetailsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
        name="TicTacToe" 
        component={TicTacToe}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.text,
        }} 
        />
        <Stack.Screen
          name='Update Plan'
          component={UpdateTripScreen}
          options={{
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.text,
          }}
        />
        <Stack.Screen
        name="Trip"
        component={TripDetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.text,
        }}
        />

        <Stack.Screen
        name="Expense Details"
        component={ExpenseDetails}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.text,
        }}
        />
        <Stack.Screen
        name="Settle Up"
        component={SettleUp}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.text,
        }}
        />
        <Stack.Screen
        name="Settle Amount"
        component={SettleAmount}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.text,
        }}
        />
        <Stack.Screen
        name="Expenses"
        component={Expenses}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.text,
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    padding: 10,
    color: colors.primary,
    height: 50,
  },
  headerText: {
    marginLeft: 20,
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    verticalAlign: 'middle',
    fontWeight: 'bold',
  },
  back: {
    color: colors.text,
    alignItems: 'flex-start',
    fontSize: 30,
    fontWeight: '900',
  },
});

export default App;
