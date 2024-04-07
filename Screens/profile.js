import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import userStore from '../MobX/userStore';
import { useNavigation } from '@react-navigation/native';
import getColorScheme from '../Utils/colorsSchema';
import LinearGradient from 'react-native-linear-gradient';
const colors = getColorScheme();

const Profile = () => {
  const navigation = useNavigation();
  const user = userStore.user.userInfo;
  
  const handleLogout = async () => {
    try {
      userStore.clearData();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <LinearGradient
    colors={[colors.primary, colors.background]}
    style={{ flex: 1, paddingHorizontal: 30 }}
>
    <View style={styles.container}> 
   
      <View style={styles.profileHeader}>
        <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('Edit Profile')}>
          <Icon name="pencil" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.profilePicContainer}>
        <Image
          style={styles.profilePic}
          source={require('../Assets/dummyProfile.jpg')}
        />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Name: {user.userName}</Text>
        <Text style={styles.label}>Email: {user.userEmail}</Text>
        <Text style={styles.label}>City: {user.city}</Text>
        <Text style={styles.label}>Mobile: {user.mobile}</Text>
        <Text style={styles.label}>Profession: {user.profession}</Text>
        <Text style={styles.label}>
          Date of Birth: {user.dateOfBirth instanceof Date ? user.dateOfBirth.toLocaleDateString() : 'N/A'}
        </Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  profilePicContainer: {
    borderWidth: 5,
    borderRadius: 100,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  editIcon: {
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 50,
  },
  userInfo: {
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.text,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: colors.button,
    padding: 10,
    borderRadius: 10,
    width:250,
  },
  logoutText: {
    fontSize: 18,
    color: colors.text,
    alignSelf:'center',
    fontWeight:'bold',
  },
});

export default observer(Profile);
