import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import userStore from '../MobX/userStore';
import { observer } from 'mobx-react';
import { apiUrl } from '../App';
import Loading from '../Components/loading';
import getColorScheme from '../Utils/colorsSchema';
const colors = getColorScheme();

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isEmailValid = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const isPasswordValid = (text) => {
    return text.length >= 6;
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = await AsyncStorage.getItem('userData');
      if (token) {
        navigation.replace('BottomTab');
      }
    };

    checkLoggedIn();
  }, [navigation]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`${apiUrl}/login`, {
        userEmail: email,
        userPassword: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        setError('Login failed');
        setIsLoading(false);
        return;
      }

      const data = await response.data;
      userStore.setUser(data);
      await userStore.saveUserToStorage(data);
      navigation.replace('BottomTab');

    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setError('Invalid email or password');
            break;
          case 404:
            setError('User not found');
            break;
          default:
            setError('An error occurred');
        }
      } else {
        setError('An error occurred');
      }
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={require('../Assets/background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Nomad</Text>

        {isLoading ? (
          <Loading />
        ) : (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={colors.secondaryText}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase().trim())}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {isEmailValid(email) && <Icon name="check-circle" size={20} color="green" style={styles.icon} />}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={colors.secondaryText}
                value={password}
                onChangeText={(text) => setPassword(text.trim())}
                secureTextEntry
              />
              {isPasswordValid(password) && <Icon name="check-circle" size={20} color="green" style={styles.icon} />}
            </View>

            <TouchableOpacity
              style={[styles.loginButton, isEmailValid(email) && isPasswordValid(password) && styles.validForm]}
              onPress={handleLogin}
              disabled={!isEmailValid(email) || !isPasswordValid(password)}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
              <Text style={styles.signup}>
                Not a member? Sign Up
              </Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.errorText}>{error}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 10,
    alignItems:'center'
  },
  input: {
    width: 270,
    height: 50,
    backgroundColor: colors.inputArea,
    marginBottom: 5,
    color: colors.text,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize:18,
  },
  loginButton: {
    backgroundColor: colors.background,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
    width: 270,
    height:50,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  validForm: {
    backgroundColor: colors.button,
  },
  signup: {
    backgroundColor: colors.background,
    paddingLeft: 5,
    paddingRight: 5,
    color: colors.secondaryText,
    margin: 10,
    borderRadius: 20,
  },
  errorText: {
    backgroundColor: colors.background,
    color: colors.highlight,
    marginBottom: 10,
    paddingHorizontal:5,
    borderRadius:10,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
});

export default observer(Login);
