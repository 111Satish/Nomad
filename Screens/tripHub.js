import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import getColorScheme from '../Utils/colorsSchema';
const colors = getColorScheme();
const tripsData = [
  { id: '1', name: 'Trip 1', location: 'Location 1', creator: 'User 1' },
  { id: '2', name: 'Trip 2', location: 'Location 2', creator: 'User 2' },
  { id: '3', name: 'Trip 3', location: 'Location 3', creator: 'User 3' },
];

const TripHubScreen = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {

    setTrips(tripsData);
  }, []);

  const handleJoinTrip = (tripId) => {

    console.log('Joining trip with ID:', tripId);
  };

  const handleContactCreator = (creatorName) => {

    Alert.alert('Contact Creator', `Contacting ${creatorName}...`);
  };

  const renderTripItem = ({ item }) => (
    <TouchableOpacity style={styles.tripItem} onPress={() => handleJoinTrip(item.id)}>
      <Text style={styles.tripName}>{item.name}</Text>
      <Text style={styles.tripLocation}>{item.location}</Text>
      <TouchableOpacity style={styles.contactButton} onPress={() => handleContactCreator(item.creator)}>
        <Text style={styles.contactButtonText}>Contact Creator</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.requestButton} onPress={() => handleJoinTrip(item.id)}>
        <Text style={styles.requestButtonText}>Request to Join</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[colors.primary, colors.background]}
      style={{ flex: 1, paddingHorizontal: 20 }}
    >
      <View style={styles.container}>
        <FlatList
          data={trips}
          renderItem={renderTripItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.tripList}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text
  },
  tripList: {
    paddingBottom: 20,
  },
  tripItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  tripName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text
  },
  tripLocation: {
    fontSize: 14,
    color: colors.secondaryText,
  },
  contactButton: {
    backgroundColor: '#3498db',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  contactButtonText: {
    color: colors.text,
    fontWeight: 'bold',
  },
  requestButton: {
    backgroundColor: '#27ae60',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  requestButtonText: {
    color: colors.text,
    fontWeight: 'bold',
  },
});

export default TripHubScreen;
