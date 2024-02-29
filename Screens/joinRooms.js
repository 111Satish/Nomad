import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Room from '../Components/joinedRoom';
import Search from '../Components/search';
import userStore from '../MobX/userStore';
import { observer } from 'mobx-react';

const JoinedRooms = ({ navigation }) => {
  const [roomsData, setRoomsData] = useState([]);
  const [loading, setLoading] = useState(true); // Initial loading state

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true); // Set loading to true to show loading indicator
          await userStore.loadRoomFromBackend(); // Fetch data from backend
          setRoomsData(userStore.room || []); // Update roomsData
          setLoading(false); // Set loading to false after data is loaded
        } catch (error) {
          console.error('Error fetching data:', error.message);
          // Handle error gracefully, e.g., display an error message
        }
      };

      fetchData();
    }, [navigation])
  );

  const userJoinedRooms = loading
    ? null // If loading, set userJoinedRooms to null temporarily
    : roomsData.filter((room) =>
        userStore.user.userInfo.joinedRooms.includes(room._id)
      );

  // const userJoinedRooms = roomsData.filter((room) => {
  //   const joinedRoomsArray = userStore.user.userInfo.joinedRooms || [];
  //   return Array.isArray(joinedRoomsArray) && joinedRoomsArray.includes(room._id);
  // });

  const renderItems = ({ item }) => {
    return <Room roomData={item} />;
  };

  return (
    <View>
      <Search />
      <FlatList
        data={userJoinedRooms}
        renderItem={renderItems}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default observer(JoinedRooms);
