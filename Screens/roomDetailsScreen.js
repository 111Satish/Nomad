import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import StarRating from '../Components/rating';
import { ScrollView } from 'react-native-gesture-handler';
import userStore from '../MobX/userStore';
import { observer } from 'mobx-react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const RoomDetailsScreen = ({ route }) => {
  const { roomData } = route.params;
  const userId = userStore.user.userInfo._id;
  const navigation = useNavigation(); // Access navigation object

  const [isJoined, setIsJoined] = useState(false);

  const roomDetails = {
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ram_Janmbhoomi_Mandir%2C_Ayodhya_Dham.jpg/417px-Ram_Janmbhoomi_Mandir%2C_Ayodhya_Dham.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Sarayu_River_night_view%2C_Ayodhya_001.jpg/1920px-Sarayu_River_night_view%2C_Ayodhya_001.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Vijayraghav_Mandir%2C_Ayodhya.jpg/1280px-Vijayraghav_Mandir%2C_Ayodhya.jpg',
    ],
    reviews: [
      { user: 'User1', rating: 4, comment: 'Great room!' },
      { user: 'User2', rating: 5, comment: 'Amazing experience!' },
    ],
  };

  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');

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

  const handleReviewSubmit = () => {
    console.log('User Rating:', userRating);
    console.log('User Review:', userReview);
    setUserReview('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.roomName}>{roomData.roomName}</Text>
      <View style={styles.imageContainer}>
        <FlatList
          data={roomDetails.images}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image style={styles.image} source={{ uri: item }} />
          )}
        />
      </View>

      <Text style={styles.description}>{roomData.description}</Text>

      <View style={styles.buttonContainer}>
        {/* Join button */}
        <TouchableOpacity
          onPress={isJoined ? null : handleJoinRoom} // Disable when joined
          style={[styles.joinButton, isJoined && styles.joinedButton]}
          disabled={isJoined}
        >
          <Text style={styles.buttonText}>{isJoined ? 'Joined' : 'Join'}</Text>
        </TouchableOpacity>

        {/* Chat button (using navigation) */}
        <TouchableOpacity
          onPress={() => navigation.navigate('TabNavigation', { roomData })} // Navigate to chat room
          style={[styles.chatButton, isJoined && styles.joinedButton]}
          disabled={!isJoined} // Disable button if not joined
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
          <StarRating rating={roomData.rating} />
        </View>
        </View>
        <View style={styles.userRatingContainer}>
        <Text style={styles.ratingText}>Rate Your Experiance:</Text>
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
      />

      <TouchableOpacity style={styles.submitReviewButton} onPress={handleReviewSubmit}>
        <Text style={styles.submitReviewText}>Submit Review</Text>
      </TouchableOpacity>

      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewsTitle}>User Reviews:</Text>
        {roomDetails.reviews.map((review, index) => (
          <View key={index} style={styles.reviewItem}>
            <Text style={styles.reviewUser}>{review.user}</Text>
            <View style={styles.rating}>
              <StarRating rating={review.rating} />
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  roomName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black',
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
    color:'black'
  },
  joinButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width:'40%',
    alignItems:'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  joinedButton: {
    width:'40%',
    backgroundColor: 'green',
    alignItems:'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    color:'black',
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
    borderColor: '#3498db',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color:'black',
  },
  submitReviewButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  submitReviewText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  reviewsContainer: {
    marginTop: 20,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  reviewItem: {
    marginBottom: 10,
    color:'color',
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'black',
  },
  reviewRating: {
    marginBottom: 5,
  },
  reviewComment: {
    fontSize: 14,
    color:'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginBottom: 10,
  },
  chatButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '40%',
    alignItems:'center'
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
    borderColor: '#ccc',
    marginLeft:5,
    color:'black',
  },
  selectedRatingNumber: {
    backgroundColor: '#3498db', 
    color: '#fff',
  },
});

export default observer(RoomDetailsScreen);
