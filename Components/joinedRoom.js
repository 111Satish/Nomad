import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import StarRating from "./rating";
import userStore from "../MobX/userStore";
import { useNavigation } from '@react-navigation/native';
import { observer } from "mobx-react";
import getColorScheme from "../Utils/colorsSchema";
import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';
const colors = getColorScheme();

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

        <TouchableOpacity onPress={() => navigation.navigate('Room Details', { roomData: roomData })}>
            <LinearGradient
                colors={[colors.primary, colors.background]}
                style={styles.container}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '85%' }}>
                        <Text style={styles.name}>{roomData.roomName}</Text>
                    </View>
                    {isJoined ? (
                        <TouchableOpacity onPress={confirmLeaveRoom} style={styles.leaveButton}>
                            <Icon name='share-square-o' size={30} color={'red'} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={handleJoinRoom} style={styles.joinButton}>
                            <Text style={styles.buttonText}>Join</Text>
                        </TouchableOpacity>
                    )}
                </View>
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
                        <TouchableOpacity onPress={() => navigation.navigate('TabNavigation', { roomData: roomData })} style={styles.leaveButton}>
                            <Icon name='comments' size={30} color={colors.button} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={handleJoinRoom} style={styles.joinButton}>
                            <Text style={styles.buttonText}>Join</Text>
                        </TouchableOpacity>
                    )}

                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        paddingTop: 5,
        padding: 15,
        borderRadius: 15,
        elevation: 10,
        margin: 5,
    },
    name: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.text,
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
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 2,
        borderRadius: 8,
        position: 'absolute',
        top: 10,
        right: 10,
        borderWidth: 1,
        borderColor: colors.border,
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
        color: colors.text,
    },
    joinButton: {
        backgroundColor: colors.button,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    buttonText: {
        color: colors.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    joinedButton: {
        backgroundColor: 'green',
    },

    leaveButton: {
        // backgroundColor: colors.highlight,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 8,
        marginTop: 10,
    },
});

export default observer(JoinedRoom);
