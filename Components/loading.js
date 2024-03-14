import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Loading = () => {
  const [isVisible, setIsVisible] = useState([true, false, false]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => {
        const newVisibility = [...prev];
        const lastVisible = newVisibility.pop();
        newVisibility.unshift(lastVisible);
        return newVisibility;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
        <View style={styles.bandsContainer}>
          <View style={[styles.firstBand, isVisible[0] && styles.visible]} />
          <View style={[styles.secondBand, isVisible[1] && styles.visible]} />
          <View style={[styles.thirdBand, isVisible[2] && styles.visible]} />
          <Image
            style={styles.image}
            source={require('../Assets/nomadLogo.png')}
          />
        </View>
    </View>
  );
}
  const styles = StyleSheet.create({
    container: {
      marginTop: '30%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    bandsContainer: {
      position: 'absolute',
      width: 120,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 60, 
    },
    firstBand: {
      position: 'absolute',
      width: 100,
      height: 100, 
      borderRadius: 50,
      borderWidth: 5,
      borderColor: '#3498db',
    },
    secondBand: {
      position: 'absolute',
      width: 80, 
      height: 80, 
      borderRadius: 40,
      borderWidth: 5,
      borderColor: '#e67e22',
    },
    thirdBand: {
      position: 'absolute',
      width: 60, 
      height: 60, 
      borderRadius: 30,
      borderWidth: 5,
      borderColor: '#27ae60',
    },
    visible: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    image: {
      width: 60,
      height: 60,
      zIndex: 1,
    },
  });
  
  export default Loading;
  