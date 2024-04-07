import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, Alert } from 'react-native';
import getColorScheme from '../Utils/colorsSchema';
import Checkbox from '../Components/checkBox';
import { apiUrl } from '../App';
import userStore from '../MobX/userStore';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';

const colors = getColorScheme();

const TripDetailsScreen = ({ route }) => {
    const navigation = useNavigation();
    const { trip } = route.params;
    const [amount, setAmount] = useState('');
    const [id, setId] = useState('');
    const [notes, setNotes] = useState('');
    const [members, setMembers] = useState([]);
    const [paidBy, setPaidBy] = useState('');
    const [date, setDate] = useState('');
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        setId(userStore.user.userInfo._id);
        setPaidBy(userStore.user.userInfo.userName);
        const currentDate = new Date();
        setDate(currentDate);
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`${apiUrl}/expense/get/${trip._id}`);
            if (response.status === 200) {
                setExpenses(response.data);
            } else {
                throw new Error('Failed to fetch expenses');
            }
        } catch (error) {
            console.error('Error fetching expenses:', error.message);
        }
    };

    const handleAddExpense = async () => {
        if (members.length === 0) {
            Alert.alert('Dear Nomad', 'Please select at least one member.');
            return;
        }

        if (notes.trim() === '' || amount.trim() === '') {
            Alert.alert('Dear Nomad', 'Please fill in notes and amount.');
            return;
        }

        try {
            const formattedMembers = members.map(memberId => {
                const member = trip.members.find(member => member._id === memberId);
                const cost = (amount / members.length).toFixed(2);
                return {
                    _id: memberId,
                    userName: member.userName,
                    cost: parseFloat(cost) 
                };
            });
            

            const expenseInfo = {
                _id: id,
                paidby: paidBy,
                notes: notes,
                amount: amount,
                date: date,
                members: formattedMembers
            };

            const response = await axios.post(`${apiUrl}/expense/add/${trip._id}`, expenseInfo);
            if (response.status === 201) {
                Alert.alert('Success', 'Expense added successfully');
                fetchExpenses();
                setNotes('');
                setAmount('');
                setMembers([]);
            } else {
                throw new Error('Failed to add expense');
            }
        } catch (error) {
            console.error('Error adding expense:', error.message);
            Alert.alert('Error', 'Failed to add expense. Please try again later.');
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchExpenses();
        }, [])
    );

    return (
        <ScrollView style={styles.container}>
             <LinearGradient
                colors={[colors.primary, colors.background]}
                style={{ flex: 1, paddingHorizontal: 20 }}
            >
            <View>
                <Text style={styles.title}>{trip.name}</Text>
            </View>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.subtitle}>Destination: </Text>
                    <Text style={styles.subtitleA}>{trip.destination}</Text>
                </View>
                <View style={{ backgroundColor: colors.border, width: '100%', height: 2, marginBottom: 10 }}></View>
            </View>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.subtitle}>Departure Date:</Text>
                    <Text style={styles.subtitleA}> {trip.departureDate.split('T')[0]}</Text>
                </View>
                <View style={{ backgroundColor: colors.border, width: '100%', height: 2, marginBottom: 10 }}></View>
            </View>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.subtitle}>Return Date:</Text>
                    <Text style={styles.subtitleA}>{trip.returnDate.split('T')[0]}</Text>
                </View>
                <View style={{ backgroundColor: colors.border, width: '100%', height: 2, marginBottom: 10 }}></View>
            </View>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.subtitle}>Notes:</Text>
                    <Text style={styles.subtitleA}>{trip.notes}</Text>
                </View>
                <View style={{ backgroundColor: colors.border, width: '100%', height: 2, marginBottom: 10 }}></View>
            </View>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.subtitle}>Activity:</Text>
                    <Text style={styles.subtitleA}>{trip.activity}</Text>
                </View>
                <View style={{ backgroundColor: colors.border, width: '100%', height: 2, marginBottom: 10 }}></View>
            </View>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.subtitle}>Expected Expense: </Text>
                    <Text style={styles.subtitleA}>₹{trip.expectedExpense}</Text>
                </View>
                <View style={{ backgroundColor: colors.border, width: '100%', height: 2, marginBottom: 10 }}></View>
            </View>


            <Text style={styles.sectionTitle}>Expenses</Text>
            <View style={styles.line}></View>
            <TouchableOpacity onPress={() => navigation.navigate('Settle Up', { trip: trip })}>
                <Text style={styles.link}>{'Settle Up -->'}</Text>
            </TouchableOpacity>

            <FlatList
                data={expenses}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Expense Details', { expense: item })}>
                        <View style={styles.expenseItem}>
                            <Text style={styles.subtitle}>Notes: {item.notes}</Text>
                            <Text style={styles.subtitle}>Date: {item.date.split('T')[0]}</Text>
                            <Text style={styles.subtitle}>Amount: ₹{item.amount}</Text>
                            <Text style={styles.subtitle}>Paid By: {item.paidby}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item._id.toString()}
            />

            <Text style={styles.title}>Members</Text>
            <FlatList style={{ paddingBottom: 20 }}
                data={trip.members}
                renderItem={({ item }) => (
                    <Checkbox
                        label={item.userName}
                        checked={members.includes(item._id)}
                        onPress={() => {
                            if (members.includes(item._id)) {
                                setMembers(prevMembers => prevMembers.filter(member => member !== item._id));
                            } else {
                                setMembers(prevMembers => [...prevMembers, item._id]);
                            }
                        }}
                    />
                )}
                keyExtractor={item => item._id.toString()}
            />
            <View style={styles.input}>
                <Icon name="align-justify" size={25} color={colors.text} />
                <TextInput
                    style={[styles.amountInput, { fontSize: 18 }]}
                    placeholder="   notes"
                    value={notes}
                    onChangeText={setNotes}
                    keyboardType=""
                    placeholderTextColor={colors.secondaryText}
                />
            </View>
            <View style={styles.input}>
                <Text style={styles.currency}>₹</Text>
                <TextInput
                    style={styles.amountInput}
                    placeholder="  _ _ _"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    placeholderTextColor={colors.secondaryText}
                />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
                <Text style={styles.buttonText}>Add Expense</Text>
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
        marginBottom: 5,
        marginTop: 20,
        color: colors.text,
        alignSelf: 'center'
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 5,
        color: colors.secondaryText,
        paddingRight: 5,
    },
    subtitleA: {
        fontSize: 18,
        marginBottom: 5,
        color: colors.text
    },
    sectionTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 3,
        color: colors.text,
        alignSelf: 'center'
    },
    link: {
        color: colors.primary,
        fontSize: 20,
        padding: 10,
        color: colors.highlight,
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    },
    expenseItem: {
        marginBottom: 10,
        borderWidth: 3,
        borderColor: colors.button,
        padding: 10,
        borderRadius: 15,
        backgroundColor: colors.inputArea,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '80%',
        borderWidth: 2,
        borderColor: colors.inputArea,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignSelf: 'center',
        color: colors.text,
    },
    currency: {
        fontSize: 40,
        color: colors.text,
    },
    amountInput: {
        flex: 1,
        // height: 40,
        // paddingHorizontal: 10,
        color: colors.text,
        fontSize: 30,
        fontWeight: 'bold'
    },
    addButton: {
        backgroundColor: colors.button,
        paddingVertical: 10,
        borderRadius: 15,
        marginBottom: 10,
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: colors.text,
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    line: {
        backgroundColor: colors.button,
        width: '100%',
        height: 3,
    }
});

export default TripDetailsScreen;
