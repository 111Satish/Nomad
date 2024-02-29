import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FeedbackScreen = () => {
  const [selectedOption, setSelectedOption] = useState(''); // State to store selected feedback option
  const [feedbackText, setFeedbackText] = useState(''); // State to store feedback text

  const feedbackOptions = ['Select Feedback Option', 'User Interface (UI)','Functionality', 'Concept', 'Performance', 'General Impressions'];

  const handleFeedbackSubmit = () => {
    
    console.log('Selected Option:', selectedOption);
    console.log('Feedback Text:', feedbackText);
    setSelectedOption('');
    setFeedbackText('');
  };

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdownContainer: {
    marginBottom: 20,
    width: '100%',
  },
  dropdown: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
  },
  textAreaContainer: {
    marginBottom: 20,
    width: '100%',
  },
  textArea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#00bcd4',
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
