import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, Alert, Linking, View, Text } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const CurrentLocation = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [currLocation, setCurrLocation] = useState('Loading');

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app requires access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          // Now you can get the location
          getCurrentLocation();
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          console.log('Location permission denied');
          Alert.alert(
            'Location Permission',
            'Location permission denied. Some features of the app may not be available.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
              { text: 'Open App Settings', onPress: () => openAppSettings() }
            ]
          );
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          console.log('Location permission denied permanently');
          Alert.alert(
            'Location Permission Required',
            'Location permission denied permanently. Please enable it from your device settings.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
              { text: 'Open App Settings', onPress: () => openAppSettings() }
            ]
          );
        }
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const getCurrentLocation = async () => {
    // Get the current position
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        fetchLocationData(latitude, longitude);
      },
      error => {
        console.log('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const fetchLocationData = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://geocode.xyz/${latitude},${longitude}?json=1`);
      const { city, country } = response.data;
      setCurrLocation(`${city}, ${country}`);
    } catch (error) {
      console.error('Error fetching location data:', error);
      setCurrLocation('Error fetching location data');
    }
  };

  const openAppSettings = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings();
    } else {
      Linking.openURL('app-settings:');
    }
  };

  return (
    <View>
      <Text style={{color:'black'}}>{currLocation}</Text>
    </View>
  );
};

export default CurrentLocation;
