import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import getColorScheme from '../Utils/colorsSchema';
const colors = getColorScheme();
const Search = () => {
    //{ onSearch }
//   const [searchText, setSearchText] = useState('');

//   const handleSearch = () => {
//     onSearch(searchText);
 // };
 //

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor={colors.secondaryText}
        // onChangeText={(text) => setSearchText(text)}
        // value={searchText}
      />
      <TouchableOpacity style={styles.searchButton}>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 45,
    paddingVertical: 2,
    paddingHorizontal: 25,
    borderWidth:1,
    margin:10,
    width:'90%',
    alignSelf:'center',
    borderColor: colors.border,
  },
  input: {
    padding:2,
    flex: 1,
    height: 30,
    color: colors.text,
  },
  searchButton: {
    borderRadius: 10,
    marginLeft: 5,
    padding: 1,
    color:colors.secondaryText
  },
});

export default Search;