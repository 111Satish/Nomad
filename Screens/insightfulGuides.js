import { View, Text } from 'react-native'
import React from 'react';
import getColorScheme from '../Utils/colorsSchema';
const colors = getColorScheme();
import LinearGradient from 'react-native-linear-gradient';
export default function InsightfulGuides() {
  return (
    <LinearGradient
    colors={[colors.primary, colors.background]}
    style={{ flex: 1, paddingHorizontal: 30 }}
>
    <View style ={{flex:1, alignItems: 'center'}}>
      <Text>Comming Soon</Text>
    </View>
    </LinearGradient>
  )
}