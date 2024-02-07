
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const isEmailValid = (text) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const isPasswordValid = (text) => {

    return text.length >= 6;
  };

  const handleSignUp = () => {

    console.log('Sign Up Pressed');
  };

  return (
    <ImageBackground
      source={require('../Assets/background.jpg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Nomad</Text>
        <Text style={styles.subtitle}>Travel freely, Connect Globally</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#fff"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

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

        <TextInput
          style={[styles.input, password !== rePassword && styles.invalidInput]}
          placeholder="Re-enter Password"
          placeholderTextColor="#fff"
          value={rePassword}
          onChangeText={setRePassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.signUpButton, isEmailValid(email) && isPasswordValid(password) && password === rePassword && styles.validForm]}
          onPress={handleSignUp}
          disabled={!isEmailValid(email) || !isPasswordValid(password) || password !== rePassword}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
            <Text style = {styles.login}>
                Already have an account? Login
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 30,
  },
  input: {
    width: 200,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 10,
    color: 'black',
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  invalidInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  signUpButton: {
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
  login:{
    backgroundColor:'rgba(255, 255, 255, 0.5)',
    color:'blue',
    margin: 10,
    paddingLeft:5,
    paddingRight:5,
    borderRadius:20,
  }
});

export default SignUp;
