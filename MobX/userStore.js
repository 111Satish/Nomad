import { makeAutoObservable } from "mobx";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { apiUrl } from "../App";

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
    await this.saveUserToStorage();
    console.log("Join Room Called");
  };

  leaveRoom = async (roomId) => {
    this.user.userInfo.joinedRooms = this.user.userInfo.joinedRooms.filter(
      (id) => id !== roomId
    );
    await this.updateUserBackend();
    await this.saveUserToStorage();
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
      await axios.post(`${apiUrl}/updateUser`, this.user);
      console.log('update user backend called');
      console.log(this.user.userInfo.joinedRooms);
    } catch (error) {
      console.error('Error updating user data on the backend:', error);
    }
  }

  async loadRoomFromBackend() {
    try {
      console.log('is getting Data')
      const response = await axios.post(`${apiUrl}/getRoom`);
      this.room = response.data;
      console.log("Room  data Checking")
      console.log(this.room);

    } catch (error) {
      console.error('Error loading room data from backend:', error);
    }
  }

  async loadUserFromBackend() {
    try {
      const response = await axios.get(`${apiUrl}/getUserData`);
      this.setUser(response.data);
    } catch (error) {
      console.error('Error loading user data from backend:', error);
    }
  }

  async clearData() {
    this.user = {
      userInfo: {
        _id: "",
        joinedRooms: [],
      },
    };
    this.room = {
      roomInfo: []
    };
    await AsyncStorage.clear();
  }


  updateProfile(editedProfile) {
    const currentProfile = this.user.userInfo;
  
    // Update only the properties that are provided in editedProfile
    if (editedProfile.userName !== undefined) {
      currentProfile.userName = editedProfile.userName;
    }
    if (editedProfile.city !== undefined) {
      currentProfile.city = editedProfile.city;
    }
    if (editedProfile.mobile !== undefined) {
      currentProfile.mobile = editedProfile.mobile;
    }
    if (editedProfile.profession !== undefined) {
      currentProfile.profession = editedProfile.profession;
    }
    if (editedProfile.dateOfBirth !== undefined) {
      currentProfile.dateOfBirth = editedProfile.dateOfBirth;
    }
  
    // Now, update the user in the backend and save to storage
    this.updateUserBackend();
    this.saveUserToStorage();
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
