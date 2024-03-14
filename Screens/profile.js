import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import userStore from '../MobX/userStore';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const user = userStore.user.userInfo;

  const handleLogout = async () => {
    try {
      userStore.clearData();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity style={styles.editIcon} onPress={()=>navigation.navigate('Edit Profile')}>
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
        {/* <Text style={styles.label}>Date of Birth: {user.dateOfBirthtoLocaleDateString()}</Text> */}
        <Text style={styles.label}>
  Date of Birth: {user.dateOfBirth instanceof Date ? user.dateOfBirth.toLocaleDateString() : 'N/A'}
</Text>

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
    borderColor: 'blue',
    overflow: 'hidden',
    marginBottom: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  editIcon: {
    backgroundColor: 'blue',
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
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 18,
    color: 'white',
  },
});

export default observer(Profile);
