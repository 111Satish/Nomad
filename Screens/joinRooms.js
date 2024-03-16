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
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          await userStore.loadRoomFromBackend();
          setRoomsData(userStore.room || []);
          setLoading(false);
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

  if (loading)
    return <Loading />;
  
  if (userJoinedRooms.length < 1)
    return (
      <View style={{ padding: 10, alignContent: 'center', paddingTop:20 }}>
        <Text style={{ color: 'black', fontSize:18, alignSelf:'center' }}>You haven't joined any room.</Text>
      </View>
    );
  else {
    return (
      <View style={{ marginBottom: '10%' }}>
        <Search />
        <FlatList
          data={userJoinedRooms}
          renderItem={renderItems}
          keyExtractor={(item) => item._id}
        />
      </View>
    );
  }
};

export default observer(JoinedRooms);
