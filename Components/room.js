import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Room = () => {
    const imageUrl = 'https://cdn.pixabay.com/photo/2015/07/29/22/56/taj-mahal-866692_1280.jpg'

    return (
        <View style={styles.container}>
            <Text style={styles.name}>
                Agra: Taj Mahal
            </Text>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: imageUrl }} 
                />
                <View style={styles.rating}>
                    <Text style={styles.ratingText}>Rating * * * * *</Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.description}>
                    This is a description box. This box will have a maximum of two or three lines.
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
        padding: 20,
        backgroundColor: '#f8f8f8',
        borderRadius: 15,
        elevation: 5,
        margin: 10,
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
    description: {
        flex: 1,
        width: '75%',
        fontSize: 16,
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
