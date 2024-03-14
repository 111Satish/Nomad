import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient'; 

const FeedbackScreen = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  const feedbackOptions = ['Select Feedback Option', 'User Interface (UI)', 'Functionality', 'Concept', 'Performance', 'General Impressions'];

  const handleFeedbackSubmit = () => {
    console.log('Selected Option:', selectedOption);
    console.log('Feedback Text:', feedbackText);
    setSelectedOption('');
    setFeedbackText('');
  };

  return (
    <LinearGradient
      colors={['#3498db', '#1abc9c']}
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../Assets/nomadLogo.png')} 
        />
        <Text style={styles.title}>Share Your Precious Insights</Text>

        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedOption}
            onValueChange={(itemValue) => setSelectedOption(itemValue)}
            style={styles.dropdown}
          >
            {feedbackOptions.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        </View>

        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Write your feedback here..."
            multiline
            numberOfLines={5}
            value={feedbackText}
            onChangeText={(text) => setFeedbackText(text)}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleFeedbackSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', 
  },
  dropdownContainer: {
    marginBottom: 20,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 10,
  },
  dropdown: {
    height: 50,
    width: '100%',
    color: '#333', 
  },
  textAreaContainer: {
    marginBottom: 20,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 10,
  },
  textArea: {
    height: 100,
    padding: 10,
    textAlignVertical: 'top',
    color: '#333', 
  },
  submitButton: {
    backgroundColor: '#2ecc71', 
    padding: 15,
    borderRadius: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default FeedbackScreen;
