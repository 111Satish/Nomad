import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import StarRating from "./rating";
import userStore from "../MobX/userStore";
import { useNavigation } from '@react-navigation/native';
import { observer } from "mobx-react";

const JoinedRoom = ({ roomData }) => {
    const navigation = useNavigation();
    const userId = userStore.user.userInfo._id;
    const [isJoined, setIsJoined] = useState(false);

    useEffect(() => {
        if (userStore.user.userInfo.joinedRooms.includes(roomData._id)) {
            setIsJoined(true);
        } else {
            setIsJoined(false);
        }
    }, []);

    const handleJoinRoom = async () => {
        try {

            await userStore.joinRoom(roomData._id);
            setIsJoined(true);

        } catch (error) {
            console.error('Error joining room:', error.response ? error.response.data : error.message);
        }
    };

    const confirmLeaveRoom = () => {
        Alert.alert(
            'Confirm Leave Room',
            'Are you sure you want to leave this room?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { text: 'Leave', onPress: handleLeaveRoom },
            ],
            { cancelable: false }
        );
    };

    const handleLeaveRoom = async () => {
        try {
            console.log("Leaving Room:", roomData._id, "User ID:", userId)

            userStore.leaveRoom(roomData._id);
            setIsJoined(false);

        } catch (error) {
            console.error('Error leaving room:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <TouchableOpacity onPress={() => navigation.navigate('TabNavigation', { roomData: roomData })}>

            <View style={styles.container}>
                <Text style={styles.name}>
                    {roomData.roomName}
                </Text>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: roomData.imageUrl }}
                    />
                    <View style={styles.rating}>
                        <StarRating rating={roomData.rating} />
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.descrip} numberOfLines={5}>
                        {roomData.description}
                    </Text>

                    {isJoined ? (
                        <TouchableOpacity onPress={confirmLeaveRoom} style={styles.leaveButton}>
                            <Text style={styles.buttonText}>Leave</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={handleJoinRoom} style={styles.joinButton}>
                            <Text style={styles.buttonText}>Join</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        paddingTop: 3,
        padding: 20,
        backgroundColor: '#f8f8f8',
        borderRadius: 15,
        elevation: 5,
        margin: 3,
    },
    name: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    rating: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 5,
        borderRadius: 8,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    descrip: {
        flex: 1,
        fontSize: 20,
        color: '#555',
    },
    joinButton: {
        backgroundColor: '#3498db',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    joinedButton: {
        backgroundColor: 'green',
    },

    leaveButton: {
        backgroundColor: 'red',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 10,
    },
});

export default observer(JoinedRoom);
