import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import userStore from '../MobX/userStore';
import axios from 'axios';
import { apiUrl } from '../App';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import getColorScheme from '../Utils/colorsSchema';
import LinearGradient from 'react-native-linear-gradient';
const colors = getColorScheme();
const SettleUp = ({ route }) => {
    const userId = userStore.user.userInfo._id;
    const navigation = useNavigation();
    const { trip } = route.params;
    const [expenses, setExpenses] = useState([]);
    const [members, setMembers] = useState(trip.members);
    const [owedMoney, setOwedMoney] = useState([]);
    const [totalOwed, setTotalOwed] = useState(0);

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

    useEffect(() => {
        fetchExpenses();
    }, [trip._id]);

    useEffect(() => {
        if (!expenses || !members) {
            console.log('Expenses data or members array is missing');
            return;
        }
        calculateOwedMoney();
    }, [expenses, members]);

    const calculateOwedMoney = () => {
        let total = 0;
        const owedMoneyList = members.map(member => {
            const amountOwed = calculateAmountOwed(expenses, member._id, userId);
            total += amountOwed;
            return {
                _id: member._id,
                userName: member.userName,
                userEmail: member.userEmail,
                amountOwed: amountOwed
            };
        });
        setOwedMoney(owedMoneyList);
        setTotalOwed(total);
    };

    const calculateAmountOwed = (expenses, paidById, _id) => {
        let totalOwed = 0;

        expenses.forEach(expense => {
            if (expense._id !== _id) {
                if (paidById === expense._id) {
                    expense.members.forEach(member => {
                        if (member._id === _id) {
                            totalOwed += member.cost;
                        }
                    });
                }
            }
        });

        expenses.forEach(expense => {
            if (expense._id !== paidById) {
                if (_id === expense._id) {
                    expense.members.forEach(member => {
                        if (member._id === paidById) {
                            totalOwed -= member.cost;
                        }
                    });
                }
            }
        });
        return totalOwed;
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchExpenses();
        }, [trip._id])
    );

    return (
        <LinearGradient
            colors={[colors.primary, colors.background]}
            style={{ flex: 1}}
        >
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        {totalOwed > 0 ?
                            <Text style={[styles.title, { color: 'red' }]}> Total amount owed ₹{Math.abs(totalOwed)}</Text>
                            :
                            <Text style={[styles.title, { color: 'green' }]}>You are owed ₹{Math.abs(totalOwed)}</Text>
                        }
                    </View>
                    <Text style={styles.subtitle}>Select to settle</Text>
                </View>
                <FlatList
                    data={owedMoney}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('Settle Amount', { paidTo: item, tripId: trip._id })}>
                            <View style={styles.item}>
                                <Text style={styles.memberName}>{item.userName}</Text>
                                {item.amountOwed > 0 ?
                                    <Text style={{ fontSize: 16, color: 'red' }}>you owe: ₹{Math.abs(item.amountOwed)}</Text>
                                    :
                                    <Text style={{ fontSize: 16, color: 'green' }}>you are owed: ₹{Math.abs(item.amountOwed)}</Text>
                                }
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
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
        marginBottom: 10,
        color: colors.text
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 10,
        color: colors.text,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingVertical: 15,
    },
    memberName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text
    },
    amountOwed: {
        fontSize: 16,
    },
});

export default SettleUp;
