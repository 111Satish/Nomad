import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import userStore from '../MobX/userStore'; 
import { observer } from 'mobx-react';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

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
      const response = await axios.post('http://10.2.106.243:5000/login', {
        userEmail: email,
        userPassword: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        const errorData = await response.json();
        let errorMessage = 'Login failed';

        switch (response.status) {
          case 401:
            errorMessage = 'Invalid email or password';
            break;
          case 404:
            errorMessage = 'User not found';
            break;
          default:
            errorMessage = errorData.error || errorMessage;
        }

        setError(errorMessage);
        return;
      }

      const data = await response.data;
      userStore.setUser(data);
      await userStore.saveUserToStorage(data);
      navigation.replace('BottomTab');

    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
            <ImageBackground
            source={require('../Assets/background.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Nomad</Text>

                <TextInput
                    style={[styles.input, !isEmailValid(email) && styles.invalidInput]}
                    placeholder="Email"
                    placeholderTextColor="#fff"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <TextInput
                    style={[styles.input, !isPasswordValid(password) && styles.invalidInput]}
                    placeholder="Password"
                    placeholderTextColor="#fff"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

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
    input: {
        width: 200,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginBottom: 10,
        color: '#fff',
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    invalidInput: {
        borderColor: 'red',
        borderWidth: 1,
    },
    loginButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    validForm: {
        backgroundColor: '#00bcd4',
    },
    signup: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        paddingLeft: 5,
        paddingRight: 5,
        color: 'blue',
        margin: 10,
        borderRadius: 20,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});


export default observer(Login);