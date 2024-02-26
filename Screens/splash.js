import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { observer } from 'mobx-react';
import userStore from '../MobX/userStore'; 

const Splash = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const titleScale = new Animated.Value(0);
  const taglineTranslateY = new Animated.Value(30);

  useEffect(() => {
    const loadUserData = async () => {
      await userStore.initializeApp(); 
    };

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

    const splashTimeout = setTimeout(() => {
      navigation.replace(userStore.user ? 'BottomTab' : 'Sign Up');
    }, 5000);

    loadUserData();

    return () => {
      clearTimeout(splashTimeout);
      fadeAnim.setValue(0);
      titleScale.setValue(0);
      taglineTranslateY.setValue(30);
    };
  }, [navigation, fadeAnim, titleScale, taglineTranslateY]);

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
