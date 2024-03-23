import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import Room from "../Components/room";
import Search from "../Components/search";
import userStore from "../MobX/userStore";
import { observer } from "mobx-react";
import Loading from "../Components/loading";
import LocationPermissionsComponent from "../Components/getLocation";

const Travelogue = ({ navigation }) => {
  const [areas, setAreas] = useState([]);
  const [forceRender, setForceRender] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchAreaData = async () => {
    try {
      await userStore.loadUserFromStorage();
      const response = userStore.room;
      setAreas(response);
      if(response)
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching area data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchAreaData();
    setForceRender((prev) => !prev);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (isFocused) {
      fetchAreaData();
    }
  }, [isFocused]);

  const renderItems = ({ item }) => {
    return <Room roomData={item} onUpdate={fetchAreaData} />;
  };

  return (
    <View style = {{marginBottom:'10%'}}>
      
      {isLoading ? (
        <Loading/>
      ) : (
        <>
        <Search />
        <View style={{}}>
        </View>
        <FlatList
          data={areas}
          renderItem={renderItems}
          keyExtractor={(item) => item._id}
          extraData={forceRender}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={['#3498db']}
            />
          }
        />
        </>
      )}
    </View>
  );
};

export default observer(Travelogue);
