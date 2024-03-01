// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
// import { io } from 'socket.io-client';
// import socketIOClient from 'socket.io-client';
// import { apiUrl } from '../App';

// const ChatComponent = ({ roomId, userData}) => {
//   const socket = io(`${apiUrl}`); 
//   const [messages, setMessages] = useState([]);
//   const [messageText, setMessageText] = useState('');

//   useEffect(() => {
//     const socket = socketIOClient(`${apiUrl}`, {
//       query: { roomId },
//     });

//     socket.on('connect', () => {
//       console.log('Socket connected');
//     });

//     return () => {
//       socket.disconnect();
//       console.log('Socket disconnected');
//     };
//   }, [roomId, userData._id]);

//   const sendMessage = () => {
//     const time = new Date().toLocaleTimeString();

//     const newMessage = {
//       userId: userData._id,
//       name: userData.userName,
//       time,
//       message: messageText,
//     };

//     socket.emit('message', { roomId, ...newMessage });
//     setMessageText('');
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//   };

//   const renderMessage = ({ item }) => (
//     <View>
//       <Text>{`${item.name} (${item.time}): ${item.message}`}</Text>
//     </View>
//   );

//   return (
//     <View>
//       <FlatList
//         data={messages}
//         renderItem={renderMessage}
//         keyExtractor={(item, index) => index.toString()}
//       />
//       <View>
//         <TextInput
//           placeholder="Type your message..."
//           value={messageText}
//           onChangeText={setMessageText}
//         />
//         <TouchableOpacity onPress={sendMessage}>
//           <Text>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ChatComponent;
