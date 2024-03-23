import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { observer } from 'mobx-react';
import userStore from '../MobX/userStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import TicTacToe from './tictactoe'; 

const Splash = ({ navigation }) => {
  const [token, setToken] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const fadeAnim = new Animated.Value(0);
  const titleScale = new Animated.Value(0);
  const taglineTranslateY = new Animated.Value(30);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
        if(token)
        await userStore.initializeApp();
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    Animated.timing(titleScale, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(taglineTranslateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    const splashTimeout = setTimeout(() => {
      if (!isConnected) {
        navigation.replace('TicTacToe'); 
      } else if (token && userStore.user) {
        navigation.replace('BottomTab');
      } else {
        navigation.replace('Login');
      }
    }, 3000);

    return () => {
      clearTimeout(splashTimeout);
      fadeAnim.setValue(0);
      titleScale.setValue(0);
      taglineTranslateY.setValue(30);
      unsubscribe();
    };
  }, [navigation, fadeAnim, titleScale, taglineTranslateY, isConnected, token]);

  return (
    <LinearGradient
      colors={['#15436e', '#01020f']}
      style={styles.container}
    >
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Image
          style={styles.logo}
          source={require('../Assets/nomadLogo.png')}
        />
        <Animated.Text
          style={[styles.title, { transform: [{ scale: titleScale }] }]}
        >
          Nomad
        </Animated.Text>
        <Animated.Text
          style={[
            styles.tag,
            { transform: [{ translateY: taglineTranslateY }] },
          ]}
        >
          TRAVEL FREELY, CONNECT GLOBALLY
        </Animated.Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 2,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  tag: {
    marginTop: 15,
    color: 'yellow',
    fontWeight: 'bold',
  },
});

export default observer(Splash);
