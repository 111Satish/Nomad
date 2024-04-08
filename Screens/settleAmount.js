import React, { useState } from 'react';
import userStore from '../MobX/userStore';
import axios from 'axios';
import { apiUrl } from '../App';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import getColorScheme from '../Utils/colorsSchema';
import CheckBox from '../Components/checkBox'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';

const colors = getColorScheme();

const SettleAmount = ({ route }) => {
  const { paidTo, tripId } = route.params;
  const [amount, setAmount] = useState(Math.abs(paidTo.amountOwed).toString());
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isPaid, setIsPaid] = useState(false);
  const userInfo = userStore.user.userInfo;
  const [showCalendar, setShowCalendar] = useState(false);

  const calendarTheme = {
    backgroundColor: colors.background,
    calendarBackground: colors.background,
    textSectionTitleColor: colors.text,
    textSectionTitleDisabledColor: colors.secondaryText,
    selectedDayBackgroundColor: colors.button,
    selectedDayTextColor: colors.text,
    todayTextColor: colors.button,
    dayTextColor: colors.text,
    textDisabledColor: colors.border,
    dotColor: colors.button,
    selectedDotColor: colors.text,
    arrowColor: colors.button,
    disabledArrowColor: colors.secondaryText,
    monthTextColor: colors.text,
    indicatorColor: colors.button,
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textDayFontSize: 14,
    textMonthFontSize: 14,
    textDayHeaderFontSize: 14,
};


  const handleSettleAmount = () => {
    if (amount.trim() === '') {
      Alert.alert('Dear Nomad!', 'Please enter the amount.');
      return;
    }

    if (isNaN(amount) || parseFloat(amount) < 1) {
      Alert.alert('Dear Nomad!', 'Amount should be a positive number.');
      return;
    }

    if (date.trim() === '') {
      Alert.alert('Dear Nomad!', 'Please select a date.');
      return;
    }

    Alert.alert('Confirm', 'Are you sure you want to settle this amount?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Yes', onPress: settleAmountConfirmed },
    ]);
  };

  const settleAmountConfirmed = async () => {
    try {
      const paidToDetails = {
        _id: paidTo._id,
        userName: paidTo.userName,
        cost: amount,
      };

      const paidByDetails = {
        _id: userInfo._id,
        userName: userInfo.userName,
        cost: amount,
      };

      const expenseInfo = {
        _id: isPaid? userInfo._id : paidTo._id,
        paidby: isPaid ? userInfo.userName : paidTo.userName,
        notes: 'Settle Up',
        amount: amount,
        date: date,
        members: isPaid ? [paidToDetails] : [paidByDetails] ,
      };

      const response = await axios.post(
        `${apiUrl}/expense/add/${tripId}`,
        expenseInfo
      );
      if (response.status === 201) {
        Alert.alert('Success', 'Settle successfully');
        setAmount('');
      } else {
        throw new Error('Failed to Settle');
      }
    } catch (error) {
      console.error('Error settle:', error.message);
      Alert.alert('Error', 'Failed to settle. Please try again later.');
    }
  };
  return (
    <LinearGradient
        colors={[colors.primary, colors.background]}
        style={{ flex: 1, padding: 10 }}
      >
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>{paidTo.userName}</Text>
        <Text style={styles.userEmail}>{paidTo.userEmail}</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.currency}>₹</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="_ _ _"
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor={colors.secondaryText}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            editable={false}
            style={[styles.input, styles.dateInput]}
            placeholderTextColor={colors.secondaryText}
          />
          <TouchableOpacity onPress={() => setShowCalendar(true)} style={styles.calendarIcon}>
            <Icon name="calendar" size={20} color={colors.button} />
          </TouchableOpacity>
        </View>
      </View>
      {showCalendar && (
        <Calendar
          current={date}
          onDayPress={(day) => {
            setDate(day.dateString);
            setShowCalendar(false);
          }}
          theme={calendarTheme}
          style={styles.calendar}
        />
      )}
      <View style={styles.checkboxContainer}>
        <CheckBox label="Paid" checked={isPaid} onPress={() => setIsPaid(true)} />
        <CheckBox label="Received" checked={!isPaid} onPress={() => setIsPaid(false)} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSettleAmount}>
        <Text style={styles.buttonText}>Settle</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  userEmail: {
    fontSize: 16,
    color: colors.text,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  currency: {
    fontSize: 40,
    color: colors.text,
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  input: {
    backgroundColor: colors.inputArea,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 40,
    fontSize: 30,
    flex: 1,
    color: colors.text,
  },
  dateInput: {
    paddingRight: 40,
  },
  calendarIcon: {
    position: 'absolute',
    right: 12,
  },
  button: {
    backgroundColor: colors.button,
    borderRadius: 15,
    paddingVertical: 13,
    paddingHorizontal: 32,
    width: '80%',
  },
  buttonText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  calendar:{
    width:'100%',
    alignSelf:'center',
    borderColor:colors.border,
    borderWidth:1,
    borderRadius:30,
}
});

export default SettleAmount;