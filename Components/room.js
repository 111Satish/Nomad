import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import StarRating from "./rating";

const Room = ({ roomData }) => {

    return (
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
                <TouchableOpacity style={styles.joinButton}>
                    <Text style={styles.buttonText}>Join</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        paddingTop:3,
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
});

export default Room;
