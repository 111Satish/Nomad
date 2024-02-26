import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import io from 'socket.io-client';
import userStore from '../MobX/userStore';
import axios from 'axios';

const SERVER_URL = 'http://10.2.106.243:5000';

const ChatScreen = ({ route }) => {
  const { roomData } = route.params;
  const userData = userStore.user.userInfo;
  const roomId = roomData._id;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://10.2.106.243:5000/getChats/${roomId}`);
        const chats = response.data;
        setMessages([...chats].reverse());
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchData();
  }, [roomId]);

  useEffect(() => {
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
      newSocket.emit('joinRoom', roomId);
    });

    newSocket.on('chat message', (msg) => {
      console.log('Received message:', msg);
      setMessages((prevMessages) => [msg,...prevMessages]);
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [roomId]);

  const sendMessage = () => {
    if (socket) {
      const chatMessage = {
        userId: userData._id,
        name: userData.userName, 
        time: new Date().toLocaleTimeString(),
        message: message,
      };

      socket.emit('chat message', roomId, chatMessage);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.userId === userData._id ? styles.sentMessage : styles.receivedMessage,
              ]}
            >
              <Text style={styles.name}>
                ~{item.name}
              </Text>
              <Text style={styles.messageText}>
                {item.message}
              </Text>
              <Text style={styles.messageTime}>
                {item.time}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          inverted={true} 
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setMessage(text)}
          value={message}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  name: {
    fontSize: 16,
    color: '#333',
    fontWeight:'bold',
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    padding: 8,
  },
});

export default ChatScreen;
