import React from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import getColorScheme from "../Utils/colorsSchema";
import LinearGradient from 'react-native-linear-gradient';
const colors = getColorScheme();

const ExpenseDetails = ({ route }) => {
    const { expense } = route.params;

    return (
        <LinearGradient
        colors={[colors.primary, colors.background]}
        style={{ flex: 1, paddingHorizontal:30}}
    >
        <View style={styles.container}>
            {/* <Text style={styles.title}>Expense Details</Text> */}
            <View style={styles.detailItem}>
                <Text style={styles.label}>Notes:</Text>
                <Text style={styles.value}>{expense.notes}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Amount:</Text>
                <Text style={styles.value}>₹{expense.amount}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Paid By:</Text>
                <Text style={styles.value}>{expense.paidby}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.value}>{expense.date.split('T')[0]}</Text>
            </View>

            <Text style={styles.title}>Members Owing Money</Text>
            <FlatList
                data={expense.members}
                renderItem={({ item }) => (
                    <View style={styles.memberItem}>
                        <Text style={styles.memberName}>{item.userName}</Text>
                        <Text style={styles.memberOwes}>Owes: ₹{item.cost}</Text>
                    </View>
                )}
                keyExtractor={(item) => item._id.toString()}
            />
        </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title: {
        marginTop:10,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: colors.text,
    },
    detailItem: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 5,
        color: colors.secondaryText,
        fontSize:18
    },
    value: {
        color: colors.text,
        fontSize:16
    },
    memberItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    memberName: {
        marginRight: 10,
        color: colors.text,
        fontSize:18
    },
    memberOwes: {
        color: colors.secondaryText,
        fontSize:18
    },
});

export default ExpenseDetails;
