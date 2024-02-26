import { makeAutoObservable } from "mobx";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class UserStore {
  user = {
    userInfo: {
      _id: "",
      joinedRooms: [],
    },
  };

  room = {
    roomInfo: []
  };

  constructor() {
    makeAutoObservable(this);
  }

  joinRoom = async (roomId) => {
    this.user.userInfo.joinedRooms.push(roomId);
    await this.updateUserBackend();
    console.log("Join Room Called");
  };

  leaveRoom = async (roomId) => {
    this.user.userInfo.joinedRooms = this.user.userInfo.joinedRooms.filter(
      (id) => id !== roomId
    );
    await this.updateUserBackend();
    console.log("Leave Room Called");
  };

  setUser(newUser) {
    this.user = newUser;
  }

  async loadUserFromStorage() {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        this.setUser(userData);
        return true;
      }
    } catch (error) {
      console.error('Error loading user data from storage:', error);
    }

    return false;
  }

  async saveUserToStorage() {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(this.user));
    } catch (error) {
      console.error('Error saving user data to storage:', error);
    }
  }

  async updateUserBackend() {
    try {
      await axios.post('http://10.2.106.243:5000/updateUser', this.user);
      console.log('update user backend called');
      console.log(this.user.userInfo.joinedRooms);
    } catch (error) {
      console.error('Error updating user data on the backend:', error);
    }
  }

  async loadRoomFromBackend() {
    try {
      console.log('is getting Data')
      const response = await axios.post('http://10.2.106.243:5000/getRoom');
      this.room = response.data;
      console.log("Room  data Checking")
      console.log(this.room);

    } catch (error) {
      console.error('Error loading room data from backend:', error);
    }
  }

  async loadUserFromBackend() {
    try {
      const response = await axios.get('http://10.2.106.243:5000/getUserData');
      this.setUser(response.data);
    } catch (error) {
      console.error('Error loading user data from backend:', error);
    }
  }


  async initializeApp() {
    const loadedFromStorage = await this.loadUserFromStorage();

    if (!loadedFromStorage) {
      await this.loadUserFromBackend();
    }

    await this.loadRoomFromBackend();
  }
}

const userStore = new UserStore();
export default userStore;
