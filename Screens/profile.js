import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import userStore from '../MobX/userStore'; 

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {userStore.user ? (
        <>
          <Text style={styles.label}>Name: {userStore.user.userInfo.userName}</Text>
          <Text style={styles.label}>Email: {userStore.user.userInfo.userEmail}</Text>
        </>
      ) : (
        <Text style={styles.label}>User data not available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default observer(Profile);
