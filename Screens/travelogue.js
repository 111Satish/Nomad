
import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import Room from "../Components/room";
import Search from "../Components/search";
import axios from "axios";

const Travelogue = () => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchAreaData = async () => {
      try {
        const response = await axios.post('http://10.2.106.243:5000/getArea');
        setAreas(response.data);
      } catch (error) {
        console.error('Error fetching area data:', error);
        // Handle error appropriately (e.g., show an error message)
      }
    };

    fetchAreaData();
  }, []);

  const renderItems = ({ item }) => {
    return <Room roomData={item} />;
  };

  return (
    <View>
      <Search />
      <FlatList
        data={areas}
        renderItem={renderItems}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default Travelogue;
