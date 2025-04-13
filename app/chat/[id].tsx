import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Send, Paperclip, Mic, Camera, Smile, Video } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { compressVideo } from '@/utils/videoCompression';
import { Message, User } from '@/types/chat';
import ChatRequest from '@/components/ChatRequest';

const USERS: User[] = [
  {
    id: '1',
    name: 'John Doe',
    status: 'accepted',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
  },
  {
    id: '2',
    name: 'Jane Smith',
    status: 'pending',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    status: 'blocked',
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e',
  },
];

const MESSAGES: { [key: string]: Message[] } = {
  '1': [
    {
      id: '1',
      text: 'Hey there! Would you like to start chatting?',
      timestamp: new Date(2024, 0, 15, 8, 45),
      sent: true,
      type: 'request',
      requestId: '1',
    },
    {
      id: '2',
      text: 'Testing visual challenge',
      timestamp: new Date(2024, 0, 15, 9, 30),
      sent: false,
    },
    {
      id: '3',
      text: 'Cool :)',
      timestamp: new Date(2024, 0, 15, 9, 31),
      sent: true,
    },
    {
      id: '4',
      text: 'Apology',
      timestamp: new Date(2024, 0, 15, 9, 32),
      sent: false,
    },
    {
      id: '5',
      text: 'Overtyping',
      timestamp: new Date(2024, 0, 15, 9, 33),
      sent: false,
    },
    {
      id: '6',
      text: 'Me too',
      timestamp: new Date(2024, 0, 15, 9, 34),
      sent: true,
    },
    {
      id: '7',
      text: 'Sushi?',
      timestamp: new Date(2024, 0, 15, 9, 35),
      sent: true,
    },
    {
      id: '8',
      text: 'Nice quote!!!',
      timestamp: new Date(2024, 0, 15, 9, 36),
      sent: false,
    },
    {
      id: '9',
      text: ':)',
      timestamp: new Date(2024, 0, 15, 9, 37),
      sent: false,
    },
  ],
};

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(MESSAGES[id as string] || []);
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatStatus, setChatStatus] = useState<'pending' | 'accepted' | 'blocked'>('pending');

  const user = USERS.find(u => u.id === id);

  useEffect(() => {
    if (user) {
      setChatStatus(user.status === 'blocked' ? 'blocked' : user.status === 'accepted' ? 'accepted' : 'pending');
    }
  }, [user]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      timestamp: new Date(),
      sent: true,
      type: 'text',
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const renderMessage = ({ item }: { item: Message }) => {
    if (item.type === 'request') {
      return <ChatRequest onAccept={() => {}} onDecline={() => {}} />;
    }

    return (
      <View style={[styles.messageContainer, item.sent ? styles.sentMessage : styles.receivedMessage]}>
        <View style={[styles.messageBubble, item.sent ? styles.sentBubble : styles.receivedBubble]}>
          {item.video ? (
            <View style={styles.videoContainer}>
              <Image source={{ uri: item.video.thumbnail }} style={styles.videoThumbnail} />
              <View style={styles.videoOverlay}>
                <TouchableOpacity style={styles.playButton}>
                  <Video size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text style={[styles.messageText, item.sent ? styles.sentText : styles.receivedText]}>
              {item.text}
            </Text>
          )}
          <Text style={[styles.timestamp, item.sent ? styles.sentTimestamp : styles.receivedTimestamp]}>
            {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.iconButton}>
            <Smile size={24} color="#8E8E93" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Message"
            placeholderTextColor="#8E8E93"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.iconButton}>
            <Paperclip size={24} color="#8E8E93" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Camera size={24} color="#8E8E93" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSendMessage}>
          {message.length > 0 ? (
            <Send size={20} color="#fff" />
          ) : (
            <Mic size={20} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121B22',
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    marginVertical: 2,
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 8,
    padding: 8,
    paddingBottom: 18,
  },
  sentBubble: {
    backgroundColor: '#005C4B',
  },
  receivedBubble: {
    backgroundColor: '#1F2C34',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  sentText: {
    color: '#E9EDEF',
  },
  receivedText: {
    color: '#E9EDEF',
  },
  timestamp: {
    fontSize: 11,
    position: 'absolute',
    bottom: 4,
    right: 8,
  },
  sentTimestamp: {
    color: '#99BEB7',
  },
  receivedTimestamp: {
    color: '#99BEB7',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 8,
    paddingBottom: Platform.OS === 'ios' ? 30 : 8,
    backgroundColor: '#1F2C34',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#2A3942',
    borderRadius: 24,
    marginRight: 8,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingHorizontal: 8,
    color: '#E9EDEF',
  },
  iconButton: {
    padding: 4,
  },
  sendButton: {
    backgroundColor: '#00A884',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: 200,
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 4,
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});