import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import Room from '../Components/joinedRoom';
import Search from '../Components/search';
import userStore from '../MobX/userStore';
import { observer } from 'mobx-react';

const JoinedRooms = ({ navigation }) => {
  const [roomsData, setRoomsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = userStore.user.userInfo._id;

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          setRoomsData(userStore.room || []);
        } catch (error) {
          console.error('Error fetching data:', error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [userId])
  );

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  };

  const userJoinedRooms = roomsData.filter((room) => {
    const joinedRoomsArray = userStore.user.userInfo.joinedRooms || [];
    return Array.isArray(joinedRoomsArray) && joinedRoomsArray.includes(room._id);
  });

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
