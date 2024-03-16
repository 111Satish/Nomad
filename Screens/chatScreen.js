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
  Keyboard,
  Dimensions,
} from 'react-native';
import io from 'socket.io-client';
import userStore from '../MobX/userStore';
import axios from 'axios';
import { apiUrl } from '../App';

const ChatScreen = ({ route }) => {
  const { roomData } = route.params;
  const userData = userStore.user.userInfo;
  const roomId = roomData._id;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [inputContainerMargin, setInputContainerMargin] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getChats/${roomId}`);
        const chats = response.data;
        setMessages([...chats].reverse());
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchData();
  }, [roomId]);

  useEffect(() => {
    const newSocket = io(apiUrl);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
      newSocket.emit('joinRoom', roomId);
    });

    newSocket.on('chat message', (msg) => {
      console.log('Received message:', msg);
      setMessages((prevMessages) => [msg, ...prevMessages]);
    });

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        const screenHeight = Dimensions.get('window').height;
        const keyboardHeight = event.endCoordinates.height;
        const inputContainerHeight = 50; 
        const availableSpace = screenHeight - keyboardHeight - inputContainerHeight;
        const messagesHeight = messages.length * 50; 
        const margin = Math.max(availableSpace - messagesHeight, 0);
        setInputContainerMargin(margin);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setInputContainerMargin(0);
      }
    );

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [roomId, messages]);

  const sendMessage = () => {
    if (!message.trim()) {
      return; 
    }

    if (socket) {
      const chatMessage = {
        userId: userData._id,
        name: userData.userName,
        time: new Date().toLocaleTimeString(),
        message: message.trim(), 
      };

      socket.emit('chat message', roomId, chatMessage);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
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
              <Text style={styles.name}>~{item.name}</Text>
              <Text style={styles.messageText}>{item.message}</Text>
              <Text style={styles.messageTime}>{item.time}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          inverted={true}
        />
      </View>
      <View
        style={[
          styles.inputContainer,
          { marginBottom: inputContainerMargin },
        ]}
      >
        <TextInput
          style={styles.input}
          onChangeText={(text) => setMessage(text)}
          value={message}
          placeholder="Type your message..."
          multiline={true}
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
    fontWeight: 'bold',
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
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    padding: 8,
    color: 'black',
  },
});

export default ChatScreen;
