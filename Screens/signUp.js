import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../App';
import Loading from '../Components/loading';
import getColorScheme from '../Utils/colorsSchema';
import Icon from 'react-native-vector-icons/FontAwesome';
const colors = getColorScheme();

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [rePasswordValid, setRePasswordValid] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('userData')
      .then((token) => {
        if (token) {
          navigation.navigate('BottomTab');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (error) {
      setShowError(true);

      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const isEmailValid = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const isPasswordValid = (text) => {
    return text.length >= 6;
  };

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      if (name.length < 3) {
        setShowError(true);
        setIsLoading(false);
        setError('Name should be at least 3 characters long.');
        return;
      }

      const response = await axios.post(`${apiUrl}/signup`, {
        userName: name,
        userEmail: email,
        userPassword: password, 
      });

      const userData = JSON.stringify(response.data);
      await AsyncStorage.setItem('userData', userData);
      navigation.navigate('Login');
    } catch (error) {
      setShowError(true);
      setIsLoading(false);
  
      if (error.response && error.response.status === 409) {
        setError('Email already exists.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <ImageBackground
      source={require('../Assets/background.jpg')}
      style={styles.backgroundImage}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Nomad</Text>
          <Text style={styles.subtitle}>Travel freely, Connect Globally</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={colors.secondaryText}
              value={name}
              onChangeText={(text) => {
                setName(text);
                setNameValid(text.length >= 3);
              }}
              autoCapitalize="words"
            />
            {nameValid && <Icon name="check-circle" size={20} color="green" style={styles.iconInsideInput} />}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.secondaryText}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailValid(isEmailValid(text.toLowerCase().trim()));
              }}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {emailValid && <Icon name="check-circle" size={20} color="green" style={styles.iconInsideInput} />}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor= {colors.secondaryText}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordValid(isPasswordValid(text));
              }}
              secureTextEntry
            />
            {passwordValid && <Icon name="check-circle" size={20} color="green" style={styles.iconInsideInput} />}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Re-enter Password"
              placeholderTextColor= {colors.secondaryText}
              value={rePassword}
              onChangeText={(text) => {
                setRePassword(text);
                setRePasswordValid(password === text);
              }}
              secureTextEntry
            />
            {rePasswordValid && <Icon name="check-circle" size={20} color="green" style={styles.iconInsideInput} />}
          </View>

          <TouchableOpacity
            style={[
              styles.signUpButton,
              emailValid && passwordValid && rePasswordValid && styles.validForm,
            ]}
            onPress={handleSignUp}
            disabled={!emailValid || !passwordValid || !rePasswordValid}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.login}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
          {showError && <Text style={styles.errorText}>{error}</Text>}
        </View>
      )}
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
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 30,
  },
  inputContainer: {
    position: 'relative',
    width: 270,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.inputArea,
    color: colors.text,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize:18,
    borderColor: colors.border,
    borderWidth:1,
  },
  // validInput: {
  //   borderColor: 'green',
  //   borderWidth: 2,
  // },
  iconInsideInput: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  signUpButton: {
    backgroundColor: colors.background,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    width:270,
    alignItems:'center'
  },
  buttonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  validForm: {
    backgroundColor: colors.button,
  },
  login: {
    backgroundColor:colors.background,
    color: colors.text,
    margin: 10,
    paddingHorizontal:5,
    borderColor: colors.border,
    borderRadius:10,
  },
  errorText: {
    color: colors.highlight,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor:colors.background,
    borderRadius:10,
    paddingHorizontal:5,
  },
});

export default SignUp;

