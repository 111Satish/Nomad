import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, Alert, ActivityIndicator } from 'react-native';
import StarRating from '../Components/rating';
import { ScrollView } from 'react-native-gesture-handler';
import userStore from '../MobX/userStore';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { apiUrl } from '../App';
import getColorScheme from '../Utils/colorsSchema';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome'
const colors = getColorScheme();

const RoomDetailsScreen = ({ route }) => {
  const { roomData } = route.params;
  const userId = userStore.user.userInfo._id;
  const userName = userStore.user.userInfo.userName;
  const [roomDetails, setRoomDetails] = useState(null);
  const [nomadRating, setNomadRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const fetchRoomDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/roomDetails`, { roomId: roomData._id });
      const roomDetailsData = response.data;
      if (roomDetailsData && roomDetailsData.reviews && roomDetailsData.reviews.length > 0) {
        const totalRating = roomDetailsData.reviews.reduce((acc, curr) => acc + curr.nomadRating, 0);
        const averageRating = totalRating / roomDetailsData.reviews.length;
        setNomadRating(averageRating);
      } else {
        setNomadRating(0);
      }

      setRoomDetails(roomDetailsData);
    } catch (error) {
      console.error('Error fetching room details:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchRoomDetails();
  }, [roomData._id]);

  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (userStore.user.userInfo.joinedRooms.includes(roomData._id)) {
      setIsJoined(true);
    } else {
      setIsJoined(false);
    }
  }, [roomData._id]);

  const handleJoinRoom = async () => {
    try {
      console.log('Joining Room:', roomData._id, 'User ID:', userId);
      userStore.joinRoom(roomData._id);
      setIsJoined(true);
    } catch (error) {
      console.error('Error joining room:', error.response ? error.response.data : error.message);
    }
  };

  const handleRate = (rating) => {
    setUserRating(rating);
  };
  const handleReviewSubmit = async () => {
    if (userReview.length < 20) {
      Alert.alert('Review message should be at least 20 characters long.');
      return;
    }

    if (userRating === 0) {
      Alert.alert('Please provide a rating.');
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/review`, {
        roomId: roomData._id,
        userId: userId,
        userName: userName,
        nomadRating: userRating,
        revMsg: userReview
      });

      console.log('User Rating:', userRating);
      console.log('User Review:', userReview);
      setUserReview('');
      Alert.alert(response.data);
      fetchRoomDetails();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to submit review. Please try again later.');
    }
  };

  if (isLoading)
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, marginTop: 20 }}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    )

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.background]}
        style={{ flex: 1, padding: 10 }}
      >
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
            <Icon name='arrow-left' size={30} color={colors.button} />
          </TouchableOpacity>
          <View style={{ width: '85%' }}>
            <Text style={styles.roomName}>{roomData.roomName}</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          {roomDetails && roomDetails.img && roomDetails.img.length > 0 ? (
            <FlatList
              data={roomDetails.img}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Image style={styles.image} source={{ uri: item.imgUrl }} />
              )}
            />

          ) : (
            <Image style={styles.image} source={require('../Assets/dummy-image.jpg')} />
          )}
        </View>

        {roomDetails && roomDetails.description && (
          <Text style={styles.description}>{roomDetails.description}</Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={isJoined ? null : handleJoinRoom}
            style={[styles.joinButton, isJoined && styles.joinedButton]}
            disabled={isJoined}
          >
            <Text style={styles.buttonText}>{isJoined ? 'Joined' : 'Join'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('TabNavigation', { roomData })}
            style={[styles.chatButton, isJoined && styles.joinedChatButton]}
            disabled={!isJoined}
          >
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Google Rating:</Text>
          <View style={styles.rating}>
            <StarRating rating={roomData.rating} />
          </View>
        </View>

        <View style={styles.userRatingContainer}>
          <Text style={styles.ratingText}>Nomad Rating:</Text>
          <View style={styles.rating}>
            <StarRating rating={nomadRating} />
          </View>
        </View>

        <View style={styles.userRatingContainer}>
          <Text style={styles.ratingText}>Rate Your Experience:</Text>
          <View style={styles.numberRatingContainer}>
            {[1, 2, 3, 4, 5].map((number) => (
              <TouchableOpacity key={number} onPress={() => handleRate(number)}>
                <Text style={[styles.ratingNumber, number === userRating && styles.selectedRatingNumber]}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TextInput
          style={styles.reviewInput}
          placeholder="Write a review..."
          multiline
          numberOfLines={3}
          value={userReview}
          onChangeText={(text) => setUserReview(text)}
          placeholderTextColor={colors.secondaryText}
        />

        <TouchableOpacity style={styles.submitReviewButton} onPress={handleReviewSubmit}>
          <Text style={styles.submitReviewText}>Submit Review</Text>
        </TouchableOpacity>

        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>User Reviews:</Text>
          {roomDetails && roomDetails.reviews && roomDetails.reviews.length > 0 ? (
            roomDetails.reviews.map((review, index) => (
              <View key={index} style={styles.reviewItem}>
                <Text style={styles.reviewUser}>{review.userName}</Text>
                <View style={styles.rating}>
                  <StarRating rating={review.nomadRating} />
                </View>
                <Text style={styles.reviewComment}>{review.revMsg}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.reviewsTitle}>No reviews available</Text>
          )}
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  roomName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
    alignSelf: 'center',
    justifyContent: 'center',
    multiline: 3,
  },
  imageContainer: {
    width: 'auto',
    height: 'auto',
  },
  image: {
    width: 400,
    height: 200,
    margin: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.text,
  },
  joinButton: {
    backgroundColor: colors.button,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  joinedButton: {
    width: '40%',
    backgroundColor: colors.border,
    alignItems: 'center',
  },
  joinedChatButton: {
    width: '40%',
    backgroundColor: colors.button,
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    color: colors.text,
    fontSize: 16,
    marginRight: 10,
  },
  userRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: colors.text,
    backgroundColor: colors.inputArea,
    textAlignVertical: 'top'
  },
  submitReviewButton: {
    backgroundColor: colors.button,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  submitReviewText: {
    color: colors.text,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  reviewsContainer: {
    marginTop: 20,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text
  },
  reviewItem: {
    marginBottom: 10,
    color: colors.primary,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.secondaryText,
  },
  reviewRating: {
    marginBottom: 5,
  },
  reviewComment: {
    fontSize: 14,
    color: colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  chatButton: {
    backgroundColor: colors.border,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '40%',
    alignItems: 'center'
  },
  numberRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'wrap',
    width: '100%',
  },
  ratingNumber: {
    fontSize: 18,
    padding: 5,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.border,
    marginLeft: 5,
    color: colors.text,
  },
  selectedRatingNumber: {
    backgroundColor: colors.button,
    color: colors.text,
  },
});

export default observer(RoomDetailsScreen);
