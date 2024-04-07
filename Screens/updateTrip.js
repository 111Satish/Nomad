import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, Alert } from 'react-native';
import getColorScheme from '../Utils/colorsSchema';
const colors = getColorScheme();

const UpdateTripScreen = ({ route, navigation }) => {
  const { trip } = route.params;

  const [tripName, setTripName] = useState(trip.name);
  const [destination, setDestination] = useState(trip.destination);
  const [departureDate, setDepartureDate] = useState(trip.departureDate);
  const [returnDate, setReturnDate] = useState(trip.returnDate);
  const [notes, setNotes] = useState(trip.notes);
  const [activities, setActivities] = useState(trip.activities);
  const [expectedExpense, setExpectedExpense] = useState(trip.expectedExpense);
  const [members, setMembers] = useState(trip.members);

  const handleUpdateTrip = () => {
    const updatedTrip = {
      ...trip,
      name: tripName,
      destination: destination,
      departureDate: departureDate,
      returnDate: returnDate,
      notes: notes,
      activities: activities,
      expectedExpense: expectedExpense,
      members: members,
    };
    console.log('Updated Trip:', updatedTrip);
    navigation.goBack();
  };

  const handleDeleteTrip = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this trip?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Add logic to delete trip data from backend
            console.log('Trip deleted:', trip.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleAddMember = () => {
    const newMember = { id: Math.random().toString(), name: 'Jane Doe' }; // Dummy member
    setMembers(prevMembers => [...prevMembers, newMember]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Trip</Text>
      <TextInput
        style={styles.input}
        placeholder="Trip Name"
        value={tripName}
        onChangeText={setTripName}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
      />
      <TextInput
        style={styles.input}
        placeholder="Departure Date"
        value={departureDate}
        onChangeText={setDepartureDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Return Date"
        value={returnDate}
        onChangeText={setReturnDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Activities"
        value={activities}
        onChangeText={setActivities}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Expected Expense"
        value={expectedExpense}
        onChangeText={setExpectedExpense}
        keyboardType="numeric"
      />
      <Text style={styles.membersText}>Members: {members.length}</Text>
      <FlatList
        data={members}
        renderItem={({ item }) => (
          <Text style={styles.memberName}>{item.name}</Text>
        )}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddMember}>
        <Text style={styles.buttonText}>Add Member</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateTrip}>
        <Text style={styles.buttonText}>Update Trip</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteTrip}>
        <Text style={styles.buttonText}>Delete Trip</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: colors.inputArea,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  membersText: {
    fontSize: 16,
    marginBottom: 10,
  },
  memberName: {
    fontSize: 14,
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: colors.button,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: colors.button,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateTripScreen;
