import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import userStore from '../MobX/userStore';

const Profile = ({ navigation }) => {
  const user = userStore.user.userInfo;

  const handleLogout = () => {
    // Implement your logout logic here
    // Example: navigation.navigate('Login');
  };

  const handleEditProfile = () => {
    // Implement your edit profile logic here
    // Example: navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity style={styles.editIcon} onPress={handleEditProfile}>
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
        {/* Add Date of Birth if available */}
        <Text style={styles.label}>Date of Birth: {user.dateOfBirth}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    color: 'white',
  },
  profileHeader: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  profilePicContainer: {
    borderWidth: 5,
    borderRadius: 100,
    borderColor: '#00bcd4',
    overflow: 'hidden',
    marginBottom: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  editIcon: {
    backgroundColor: '#00bcd4',
    padding: 10,
    borderRadius: 50,
  },
  userInfo: {
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#00bcd4',
    padding: 10,
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 18,
    color: 'white',
  },
});

export default observer(Profile);
