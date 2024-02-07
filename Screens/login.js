import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = (text) => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const isPasswordValid = (text) => {

    return text.length >= 6;
  };

  const handleLogin = () => {
    console.log('Login Pressed');
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

        <TouchableOpacity onPress={()=>navigation.navigate('Sign Up')}>
            <Text style = {styles.signup}>
                Not a member? Sign Up
            </Text>
        </TouchableOpacity>
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
  signup:{
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingLeft:5,
    paddingRight:5,
    color:'blue',
    margin:10,
    borderRadius:20,
  }
});

export default Login;
