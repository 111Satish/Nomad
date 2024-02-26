import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import StarRating from './rating';
import userStore from '../MobX/userStore';
import { observer } from 'mobx-react';

const Room = ({ roomData, navigation }) => {
  const [isJoined, setIsJoined] = useState(false);
  const userId = userStore.user.userInfo._id;

  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen focused");
      if (userStore.user.userInfo.joinedRooms.includes(roomData._id)) {
        setIsJoined(true);
        console.log("Joined");
      } else {
        setIsJoined(false);
      }
    }, [roomData._id])
  );

  const handleJoinRoom = async () => {
    try {
      console.log('Joining Room:', roomData._id, 'User ID:', userId);

      userStore.joinRoom(roomData._id);
      setIsJoined(true);

    } catch (error) {
      console.error('Error joining room:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{roomData.roomName}</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: roomData.imageUrl }} />
        <View style={styles.rating}>
          <StarRating rating={roomData.rating} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.descrip} numberOfLines={5}>
          {roomData.description}
        </Text>
        <TouchableOpacity
          onPress={isJoined ? null : handleJoinRoom}
          style={[styles.joinButton, isJoined && styles.joinedButton]}
          disabled={isJoined}
        >
          <Text style={styles.buttonText}>{isJoined ? 'Joined' : 'Join'}</Text>
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
});
export default observer(Room);
