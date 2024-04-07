import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import StarRating from './rating';
import userStore from '../MobX/userStore';
import { observer } from 'mobx-react';
import getColorScheme from '../Utils/colorsSchema';
import LinearGradient from 'react-native-linear-gradient';
const colors = getColorScheme();

const Room = ({ roomData }) => {
  const navigation = useNavigation();
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
    <LinearGradient
      colors={[colors.primary, colors.background]}
      style={styles.container}
    >
        <TouchableOpacity onPress={() => navigation.navigate('Room Details', { roomData: roomData })}>
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
              <Text style={styles.buttonText}>
                {isJoined ?
                  <View>
                    <Icon2 name='library-add-check' size={30} color={colors.button} />
                  </View>
                  :
                  <View>
                    <Icon2 name='add-to-photos' size={30} color={colors.button} />
                  </View>}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    paddingTop: 7,
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
    borderColor: colors.border
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  descrip: {
    flex: 1,
    fontSize: 18,
    color: colors.text,
  },
  joinButton: {
    // backgroundColor: colors.button,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },

});
export default observer(Room);
