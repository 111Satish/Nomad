import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const StarRating = ({ rating }) => {
  // Ensure that rating is within valid range (0 to 5)
  const normalizedRating = Math.max(0, Math.min(rating, 5));
  
  const filledStars = Math.floor(normalizedRating);
  const halfStar = normalizedRating % 1 !== 0;
  const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      {[...Array(filledStars)].map((_, index) => (
        <Icon key={index} name="star" size={15} color="green" />
      ))}
      {halfStar && <Icon name="star-half" size={15} color="green" />}
      {[...Array(emptyStars)].map((_, index) => (
        <Icon key={index} name="star-outline" size={15} color="green" />
      ))}
      <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#555',
  },
});

export default StarRating;
