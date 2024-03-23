import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { apiUrl } from '../App';

const FeedbackScreen = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const feedbackOptions = ['Select Feedback Option', 'User Interface (UI)', 'Functionality', 'Concept', 'Performance', 'General Impressions'];

  const handleFeedbackSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${apiUrl}/feedback`, {
        type: selectedOption,
        feedback: feedbackText
      });
      setIsLoading(false);
      setFeedbackMessage(response.data);
      setFeedbackModalVisible(true);
      setFeedbackText('');
      setSelectedOption('');
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setFeedbackMessage(error);
    }
  };

  useEffect(() => {
    if (feedbackMessage) {
      console.log('Feedback message:', feedbackMessage);
    }
  }, [feedbackMessage]);

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

        <Modal
          visible={feedbackModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setFeedbackModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalMessage}>{feedbackMessage}</Text>
              <TouchableOpacity onPress={() => setFeedbackModalVisible(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    position:'relative',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    marginTop:5,
    position:'relative',
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
    borderRadius:50,
    marginBottom: 20,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  dropdown: {
    borderRadius:50,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    color:'black'
  },
  closeButton: {
    fontSize: 16,
    color: '#2ecc71',
  },
});

export default FeedbackScreen;
