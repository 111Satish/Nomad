import { useColorScheme } from 'react-native';

const colorScheme = useColorScheme();

const colors = {
  background: colorScheme === 'light' ? '#F7F7F7' : '#222831', 
  text: colorScheme === 'light' ? '#000000' : '#FFFFFF',
  primary: colorScheme === 'light' ? '#2F80ED' : '#43A047', 
  secondary: colorScheme === 'light' ? '#F9A825' : '#F2F5F7', 
  highlight: colorScheme === 'light' ? '#CEE7F7' : '#343A40',
  positive: '#4CAF50',
  neutral: '#9E9E9E',
  negative: '#F44336',
};
export default colors;