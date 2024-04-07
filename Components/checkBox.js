import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import getColorScheme from '../Utils/colorsSchema';
const colors= getColorScheme();
const Checkbox = ({ label, checked, onPress }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <View style={[styles.checkbox, { backgroundColor: checked ? colors.button : 'transparent' }]} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:4,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 2,
    marginRight: 10,
    borderColor: colors.border
  },
  label: {
    fontSize: 20,
    color:colors.text,
  },
});

export default Checkbox;
