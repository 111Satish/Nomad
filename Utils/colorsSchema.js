import { Appearance, View, Text, Button } from 'react-native';
import React, { useState } from 'react';

const lightColors = {
  primary: '#75B7FB',
  accent: '#3498DB',
  background: '#B0C6DD',
  text: '#000204',
  button: '#288DF3',
  secondaryText: '#1D2732',
  highlight: '#0877E9',
  border: '#8FA1B4',
  inputArea:'#94C0EE',
};

const darkColors = {
  primary: '#130D03',
  accent: '#2980B9',
  background: '#1F2C39',
  text: '#FFFFFF',
  button: '#3FC1E4',
  secondaryText: '#BDC3C7',
  highlight: '#D35400',
  border: '#7F8C8D',
  inputArea: '#293133',
};

const getColorScheme = () => {
  const colorScheme = Appearance.getColorScheme();
  return colorScheme === 'dark' ? darkColors : lightColors;
};

const ColorSchemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  const toggleColorScheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  toggleColorScheme();
};
export {ColorSchemeToggle};

export default getColorScheme;
