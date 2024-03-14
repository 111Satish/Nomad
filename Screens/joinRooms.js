import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Room from '../Components/joinedRoom';
import Search from '../Components/search';
import userStore from '../MobX/userStore';
import { observer } from 'mobx-react';
import Loading from '../Components/loading';

const JoinedRooms = ({ navigation }) => {
  const [roomsData, setRoomsData] = useState([]);
  const [loading, setLoading] = useState(true); // Initial loading state

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true); 
          await userStore.loadRoomFromBackend(); 
          setRoomsData(userStore.room || []);
          setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      };

      fetchData();
    }, [navigation])
  );

  const userJoinedRooms = roomsData.filter((room) =>
    userStore.user.userInfo.joinedRooms.includes(room._id)
  );

  const renderItems = ({ item }) => {
    return <Room roomData={item} />;
  };

  return (
    <View>
      <Search />
      {loading ? ( // Show loading component if data is loading
        <Loading />
      ) : (
        <FlatList
          data={userJoinedRooms}
          renderItem={renderItems}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

export default observer(JoinedRooms);
