import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, RefreshControl, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import Room from "../Components/room";
import Icon from 'react-native-vector-icons/FontAwesome';
import userStore from "../MobX/userStore";
import { observer } from "mobx-react";
import axios from 'axios';
import { apiUrl } from "../App";
import getColorScheme from "../Utils/colorsSchema";
import LinearGradient from 'react-native-linear-gradient';
const colors = getColorScheme();

const Travelogue = ({ navigation }) => {
  const [areas, setAreas] = useState([]);
  const [forceRender, setForceRender] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getroom/search?term=${searchText}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error occurred while searching', error);
      setSearchResults([]); 
    }
  };

  useEffect(() => {
    if (searchText.length > 0) {
      handleSearch();
    } else {
      setSearchResults([]); 
    }
  }, [searchText]);

  const fetchAreaData = async () => {
    try {
      await userStore.loadUserFromStorage();
      await userStore.loadRoomFromBackend();
      setAreas(userStore.room);
    } catch (error) {
      console.error('Error fetching area data:', error);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchAreaData();
    setForceRender(prev => !prev);
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
    <LinearGradient
    colors={[colors.primary, colors.background]}
    style={{ flex: 1, paddingHorizontal: 10 }}
>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor={colors.secondaryText}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name='search' size={20} color={colors.secondaryText} />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.text} />
        </View>
      ) : (
        <FlatList
          data={(searchResults.length > 0 && searchText.length > 0) ? searchResults : areas}
          renderItem={renderItems}
          keyExtractor={(item) => item._id}
          extraData={forceRender}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={[colors.text]}
            />
          }
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputArea,
    borderRadius: 45,
    paddingVertical: 2,
    paddingHorizontal: 25,
    borderWidth: 1,
    margin: 10,
    width: '90%',
    alignSelf: 'center',
    borderColor: colors.border,
  },
  input: {
    padding: 2,
    flex: 1,
    height: 30,
    color: colors.text,
  },
  searchButton: {
    borderRadius: 10,
    marginLeft: 5,
    padding: 1,
    color: colors.secondaryText
  },
});

export default observer(Travelogue);
