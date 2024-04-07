import React from 'react';
import { Alert, StyleSheet, Text } from 'react-native';

const CustomAlert = () => {
  const showAlert = () => {
    Alert.alert(
      'Custom Alert',
      'This is a custom alert message.',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'default', // You can customize the button style here
        },
      ],
      {
        cancelable: false, // Prevents dismissing the alert by tapping outside
        onDismiss: () => console.log('Alert dismissed'), // Callback when the alert is dismissed
        overlayStyle: styles.overlay, // Custom overlay style
        titleStyle: styles.title, // Custom title style
        messageStyle: styles.message, // Custom message style
      }
    );
  };

  return (
    <Text style={styles.button} onPress={showAlert}>
      Show Custom Alert
    </Text>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 5,
    marginTop: 20,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
  },
  title: {
    color: 'red', // Custom title color
    fontSize: 20, // Custom title font size
    fontWeight: 'bold', // Custom title font weight
  },
  message: {
    color: 'green', // Custom message color
    fontSize: 16, // Custom message font size
  },
});

export default CustomAlert;
