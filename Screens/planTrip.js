import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import getColorScheme from '../Utils/colorsSchema';
import { apiUrl } from '../App';
import userStore from '../MobX/userStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const colors = getColorScheme();

const PlanTripScreen = ({ navigation }) => {
    const [tripName, setTripName] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [notes, setNotes] = useState('');
    const [activities, setActivities] = useState('');
    const [expectedExpense, setExpectedExpense] = useState('');
    const [numMembers, setNumMembers] = useState(1);
    const [members, setMembers] = useState([]);
    const [trips, setTrips] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [showCalendarDeparture, setShowCalendarDeparture] = useState(false);
    const [showCalendarReturn, setShowCalendarReturn] = useState(false);

    useEffect(() => {
        const userId = userStore.user.userInfo._id;
        const userInfo = userStore.user.userInfo;
        fetchTrips(userId);
        setMembers([{ _id: userInfo._id, userName: userInfo.userName, userEmail: userInfo.userEmail }]);
    }, []);

    const fetchTrips = async (userId) => {
        try {
            const response = await axios.get(`${apiUrl}/trip/user/${userId}`);
            setTrips(response.data);
        } catch (error) {
            console.error('Error fetching trips:', error.message);
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            const userId = userStore.user.userInfo._id;
            fetchTrips(userId);
        }, [])
    )

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${apiUrl}/trip/searchMember?email=${searchQuery.toLowerCase().trim()}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching for users:', error.message);
            Alert.alert('Error', 'Failed to search for users');
        }
    };

    const handleAddMemberFromSearch = () => {
        if (searchResults && searchResults._id) {
            const isMemberExist = members.some(member => member._id === searchResults._id);
            if (isMemberExist) {
                Alert.alert('Error', 'This member is already added to the trip');
                return;
            }
            const searchUser = { _id: searchResults._id, userName: searchResults.userName, userEmail: searchResults.userEmail };
            setMembers([...members, searchUser]);
            setNumMembers(prevNum => prevNum + 1);
            setSearchQuery('');
            setSearchResults(null);
        }
    };

    const handlePlanTrip = async () => {
        if (!tripName || !destination || !departureDate || !returnDate || !notes || !activities || !expectedExpense) {
            Alert.alert('Dear Nomad!', 'Please fill in all fields before planning the trip');
            return;
        }

        const tripData = {
            name: tripName,
            destination,
            departureDate,
            returnDate,
            notes,
            activities,
            expectedExpense,
            creator: userStore.user.userInfo._id,
            members
        };

        try {
            const response = await axios.post(`${apiUrl}/trip/create`, tripData);
            if (!response.data) {
                throw new Error('Failed to create trip');
            }
            const responseData = response.data;
            setTrips(prevTrips => [responseData, ...prevTrips]);
            clearInputFields();
        } catch (error) {
            console.error('Error creating trip:', error.message);
            Alert.alert('Error', 'Failed to create trip');
        }
    };

    const clearInputFields = () => {
        setTripName('');
        setDestination('');
        setDepartureDate('');
        setReturnDate('');
        setNotes('');
        setActivities('');
        setExpectedExpense('');
        setMembers([{ _id: userStore.user.userInfo._id, userName: userStore.user.userInfo.userName, userEmail: userStore.user.userInfo.userEmail }]);
        setNumMembers(1);
    };

    const handleDeleteTrip = (id) => {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to delete this trip?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            const response = await axios.delete(`${apiUrl}/trip/delete/${id}`);
                            if (response.status === 200) {
                                setTrips(prevTrips => prevTrips.filter(trip => trip._id !== id));
                                console.log('Trip deleted:', id);
                            } else {
                                throw new Error('Failed to delete trip');
                            }
                        } catch (error) {
                            console.error('Error deleting trip:', error.message);
                            Alert.alert('Error', 'Failed to delete trip');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <ScrollView style={styles.container}>
            <LinearGradient
                colors={[colors.primary, colors.background]}
                style={{ flex: 1, paddingHorizontal: 10 }}
            >
                <FlatList
                    data={trips}
                    renderItem={({ item }) => (
                        <View style={styles.tripContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('Trip', { trip: item })}>
                                <Text style={styles.tripName}>{item.name}</Text>
                                <Text style={styles.destination}>{item.destination}</Text>
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity
                                    onPress={() => handleDeleteTrip(item._id)}>
                                    <Icon2 name='delete' size={30} color={colors.button} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item._id}
                />
                <Text style={styles.title}>Plan Your Trip</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Trip Name"
                    value={tripName}
                    onChangeText={setTripName}
                    placeholderTextColor={colors.secondaryText}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Destination"
                    value={destination}
                    onChangeText={setDestination}
                    placeholderTextColor={colors.secondaryText}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputCal}
                        placeholder="Departure Date"
                        value={departureDate}
                        onFocus={() => setShowCalendarDeparture(true)}
                        placeholderTextColor={colors.secondaryText}
                    />
                    <TouchableOpacity style={styles.calendarIcon} onPress={() => setShowCalendarDeparture(true)}>
                        <Icon name='calendar' size={20} color={colors.button} />
                    </TouchableOpacity>
                </View>
                {showCalendarDeparture && (
                    <Calendar
                        current={departureDate}
                        minDate={new Date()}
                        onDayPress={(day) => {
                            setDepartureDate(day.dateString);
                            setShowCalendarDeparture(false);
                        }}
                        theme={{
                            // Customize calendar theme if needed
                        }}
                    />
                )}

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputCal}
                        placeholder="Returning Date"
                        value={returnDate}
                        onFocus={() => setShowCalendarReturn(true)}
                        placeholderTextColor={colors.secondaryText}
                    />
                    <TouchableOpacity style={styles.calendarIcon} onPress={() => setShowCalendarReturn(true)}>
                        <Icon name='calendar' size={20} color={colors.button} />
                    </TouchableOpacity>
                </View>
                {showCalendarReturn && (
                    <Calendar
                        current={returnDate}
                        minDate={departureDate || new Date()}
                        onDayPress={(day) => {
                            setReturnDate(day.dateString);
                            setShowCalendarReturn(false);
                        }}
                        theme={{
                            // Customize calendar theme if needed
                        }}
                    />
                )}

                <TextInput
                    style={[styles.input,{height: 100, textAlignVertical:'top'}]}
                    placeholder="Notes..."
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                    placeholderTextColor={colors.secondaryText}
                />
                <TextInput
                    style={[styles.input,{height: 100, textAlignVertical:'top'}]}
                    placeholder="Activities..."
                    value={activities}
                    onChangeText={setActivities}
                    multiline
                    placeholderTextColor={colors.secondaryText}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Expected Expense"
                    value={expectedExpense}
                    onChangeText={setExpectedExpense}
                    keyboardType="numeric"
                    placeholderTextColor={colors.secondaryText}
                />
                <Text style={styles.title}>Members: {members.length}</Text>
                <FlatList
                    data={members}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="user-o" size={18} color={colors.text} />
                            <Text style={styles.memberName}>{item.userName}</Text>
                        </View>
                    )}
                    keyExtractor={item => item._id}
                />
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by email"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor={colors.secondaryText}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                        <Icon name="search" size={18} color={colors.text} />
                    </TouchableOpacity>
                </View>
                {searchResults ? (
                    <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                        <Icon name="chevron-right" size={18} color={colors.text} />
                        <Text style={styles.memberName}>{searchResults.userName}</Text>
                        <TouchableOpacity style={styles.addButton} onPress={handleAddMemberFromSearch}>
                            <Icon name="plus-circle" size={25} color={colors.text} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View >
                        <Icon name="chevron-right" size={18} color={colors.text} />
                    </View>
                )}

                <TouchableOpacity style={styles.planButton} onPress={handlePlanTrip}>
                    <Text style={styles.buttonText}>Plan Trip</Text>
                </TouchableOpacity>
            </LinearGradient>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        color: colors.text,
        alignSelf: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        height: 50,
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 15,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: colors.inputArea,
        alignSelf: 'center',
    },
    inputCal: {
        flex: 1,
        color: colors.text,
        fontSize: 18,
    },
    destination: {
        color: colors.secondaryText,
        fontSize: 16,
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 15,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: colors.text,
        backgroundColor: colors.inputArea,
        alignSelf: 'center',
        fontSize: 18
    },
    calendarIcon: {
        paddingRight: 10,
    },
    memberName: {
        paddingLeft: 5,
        fontSize: 18,
        marginBottom: 5,
        color: colors.text,
        paddingBottom: 3,
    },
    addButton: {
        backgroundColor: colors.button,
        borderRadius: 50,
        alignSelf: 'flex-start',
        marginLeft: '5%'
    },
    planButton: {
        marginVertical: 20,
        backgroundColor: colors.button,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        width: '80%',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: colors.border
    },
    buttonText: {
        color: colors.text,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    tripContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5,
    },
    tripName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text
    },
    tripButton: {
        backgroundColor: colors.button,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        marginLeft: 5,
        borderWidth: 2,
        borderColor: colors.border,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginRight: 10,
        color: colors.text,
        backgroundColor: colors.inputArea
    },
    searchButton: {
        backgroundColor: colors.button,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
    },
});

export default PlanTripScreen;
