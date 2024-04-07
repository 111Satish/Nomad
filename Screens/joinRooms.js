import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Room from '../Components/joinedRoom';
import Search from '../Components/search';
import userStore from '../MobX/userStore';
import { observer } from 'mobx-react';
import getColorScheme from '../Utils/colorsSchema';
import LinearGradient from 'react-native-linear-gradient';
const colors = getColorScheme();

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
    return (
      <LinearGradient
        colors={[colors.primary, colors.background]}
        style={{ flex: 1, paddingHorizontal: 30 }}
      >
        <View style={{ flex: 1, marginTop: 20 }}>
          <ActivityIndicator size="large" color={colors.text} />
        </View>
      </LinearGradient>
    )

  if (userJoinedRooms.length < 1)
    return (
      <LinearGradient
        colors={[colors.primary, colors.background]}
        style={{ flex: 1, paddingHorizontal: 30 }}
      >
        <View style={{ flex: 1, padding: 10, alignContent: 'center', paddingTop: 20 }}>
          <Text style={{ color: colors.text, fontSize: 18, alignSelf: 'center' }}>You haven't joined any room.</Text>
        </View>
      </LinearGradient>
    );
  else {
    return (
      <LinearGradient
        colors={[colors.primary, colors.background]}
        style={{ flex: 1, paddingHorizontal: 10 }}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            data={userJoinedRooms}
            renderItem={renderItems}
            keyExtractor={(item) => item._id}
          />
        </View>
      </LinearGradient>
    );
  }
};

export default observer(JoinedRooms);
