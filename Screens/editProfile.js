import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { observer } from 'mobx-react';
import userStore from '../MobX/userStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import getColorScheme from '../Utils/colorsSchema';
import LinearGradient from 'react-native-linear-gradient';
const colors = getColorScheme();

const EditProfile = ({ navigation }) => {
  const user = userStore.user.userInfo;

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [editedUser, setEditedUser] = useState({
    userName: user.userName,
    city: user.city,
    mobile: user.mobile,
    profession: user.profession,
    dateOfBirth: user.dateOfBirth instanceof Date ? user.dateOfBirth : new Date(),
  });

  const handleSave = () => {
    if (editedUser.userName.length >= 3 && editedUser.userName.length < 30) {
      userStore.updateProfile(editedUser);
      console.log('Edited User Data:', editedUser);
      navigation.goBack();
    } else {
      alert('Name should be more than 3 characters and less than 30');
    }
  };


  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');

    if (selectedDate instanceof Date) {
      setEditedUser({ ...editedUser, dateOfBirth: selectedDate });
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
                colors={[colors.primary, colors.background]}
                style={{ flex: 1, paddingHorizontal:30}}
            >
      <Text style={styles.title}>Edit Profile</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEditedUser({ ...editedUser, userName: text })}
          value={editedUser.userName}
          placeholder="Enter Name"
          placeholderTextColor={colors.secondaryText}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEditedUser({ ...editedUser, city: text })}
          value={editedUser.city}
          placeholder="Enter City"
          placeholderTextColor={colors.secondaryText}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mobile</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEditedUser({ ...editedUser, mobile: text })}
          value={editedUser.mobile}
          placeholder="Enter Mobile"
          placeholderTextColor={colors.secondaryText}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Profession</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEditedUser({ ...editedUser, profession: text })}
          value={editedUser.profession}
          placeholder="Enter Profession"
          placeholderTextColor={colors.secondaryText}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity onPress={showDatePickerModal}>
          <Text style={styles.input}>
            {editedUser.dateOfBirth.toDateString()}
          </Text>
        </TouchableOpacity>
        <Icon name="calendar" size={20} color="blue" style={styles.calendarIcon} />
        {showDatePicker && (
          <DateTimePicker
            value={editedUser.dateOfBirth}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
            style={styles.datePicker}
          />
        )}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    alignSelf:'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text
  },
  inputContainer: {
    padding: 5,
    marginBottom: 10,
    backgroundColor: colors.inputArea,
    borderRadius:20,
    // borderWidth:1,
    // borderColor: colors.border
  },
  label: {
    fontSize: 12,
    color: colors.secondaryText,
    marginBottom: 3,
    paddingLeft:10,
  },
  input: {
    height: 40,
    borderColor: colors.border,
    borderWidth: 0,
    borderBottomWidth: 3,
    marginBottom: 10,
    padding: 5,
    width: 230,
    color: colors.text,
    fontWeight: 'bold',
  },
  calendarIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    color:colors.highlight
  },
  datePicker: {
    width: '80%',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: colors.button,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    alignSelf:'center',
    fontSize: 18,
    color: colors.text,
  },
});

export default observer(EditProfile);
