import React from "react";
import { View, Text, FlatList } from "react-native";
import Room from "../Components/room";
import Search from "../Components/search";
const Travelogue = () => {
    const room1 = {
        name: "Agra: Taj Mahal",
        imageUrl: 'https://cdn.pixabay.com/photo/2015/07/29/22/56/taj-mahal-866692_1280.jpg',
        rating: 4.5,
        description: " This is a description box for max 2 or 3 lines ",
    };

    const roomData = [room1, room1, room1];
    const renderItems = ({ item }) => {
        return (
            <Room roomData={item} />
        )
    }

    return (
        <View>
            <Search/>
        <FlatList data={roomData} renderItem={renderItems} />
        </View>
    );
}
export default Travelogue;