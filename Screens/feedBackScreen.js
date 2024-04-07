import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { apiUrl } from '../App';
import getColorScheme from '../Utils/colorsSchema';
const colors = getColorScheme();
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
      colors={[colors.primary, colors.background]}
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
            style={styles.textInput}
            placeholder="Write your feedback here..."
            multiline
            numberOfLines={5}
            value={feedbackText}
            onChangeText={(text) => setFeedbackText(text)}
            placeholderTextColor={colors.secondaryText}
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
    color: colors.text,
  },
  dropdownContainer: {
    borderRadius:10,
    marginBottom: 20,
    width: '80%',
    backgroundColor: colors.inputArea,
  },
  dropdown: {
    borderRadius:50,
    height: 50,
    width: '100%',
    color: colors.text,
  },
  textAreaContainer: {
    marginBottom: 20,
    width: '80%',
    backgroundColor: colors.inputArea,
    borderRadius: 10,
  },
  textInput: {
    height: 100,
    padding: 10,
    textAlignVertical: 'top',
    color: colors.text,
  },
  submitButton: {
    backgroundColor: colors.button,
    padding: 15,
    borderRadius: 10,
    width:250
  },
  submitButtonText: {
    color: colors.text,
    fontSize: 18,
    textAlign: 'center',
    fontWeight:'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  modalContent: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    color:colors.secondaryText
  },
  closeButton: {
    fontSize: 16,
    color: colors.button,
  },
});

export default FeedbackScreen;
