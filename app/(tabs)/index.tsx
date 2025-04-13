import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { formatDistanceToNow } from 'date-fns';
import { User } from '@/types/chat';

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
  {
    id: '4',
    name: 'Sarah Wilson',
    status: 'accepted',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
  },
  {
    id: '5',
    name: 'Team Alpha',
    status: 'accepted',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
  },
  {
    id: '6',
    name: 'David Chen',
    status: 'pending',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  },
  {
    id: '7',
    name: 'Emma Davis',
    status: 'accepted',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
  },
  {
    id: '8',
    name: 'Marketing Team',
    status: 'accepted',
    avatar: 'https://images.unsplash.com/photo-1543269664-7eef42226a21',
  },
];

const CHATS = [
  {
    id: '1',
    name: 'John Doe',
    lastMessage: 'Hey, how are you?',
    timestamp: new Date(2024, 0, 15, 14, 30),
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
  },
  {
    id: '2',
    name: 'Jane Smith',
    lastMessage: 'Are we still meeting tomorrow?',
    timestamp: new Date(2024, 0, 15, 13, 45),
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    lastMessage: 'Thanks for the help!',
    timestamp: new Date(2024, 0, 15, 10, 20),
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    lastMessage: 'Just sent you the updated design files 🎨',
    timestamp: new Date(2024, 0, 15, 9, 15),
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
  },
  {
    id: '5',
    name: 'Team Alpha',
    lastMessage: 'Alice: Great work everyone! 🎉',
    timestamp: new Date(2024, 0, 15, 8, 30),
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
  },
  {
    id: '6',
    name: 'David Chen',
    lastMessage: 'Would love to collaborate on the project',
    timestamp: new Date(2024, 0, 14, 22, 45),
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  },
  {
    id: '7',
    name: 'Emma Davis',
    lastMessage: 'The presentation went really well!',
    timestamp: new Date(2024, 0, 14, 18, 20),
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
  },
  {
    id: '8',
    name: 'Marketing Team',
    lastMessage: 'Tom: Here are the campaign metrics 📊',
    timestamp: new Date(2024, 0, 14, 16, 10),
    avatar: 'https://images.unsplash.com/photo-1543269664-7eef42226a21',
  },
];

export default function ChatsScreen() {
  const router = useRouter();

  const handleChatPress = (chat) => {
    const user = USERS.find(u => u.id === chat.id);
    if (user?.status === 'blocked') {
      return;
    }
    router.push(`/chat/${chat.id}`);
  };

  const renderItem = ({ item }) => {
    const user = USERS.find(u => u.id === item.id);
    const isBlocked = user?.status === 'blocked';

    return (
      <TouchableOpacity
        style={[styles.chatItem, isBlocked && styles.blockedChat]}
        onPress={() => handleChatPress(item)}
        disabled={isBlocked}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.timestamp}>
              {formatDistanceToNow(item.timestamp, { addSuffix: true })}
            </Text>
          </View>
          <Text style={[styles.lastMessage, isBlocked && styles.blockedText]} numberOfLines={1}>
            {isBlocked ? 'Chat unavailable' : item.lastMessage}
          </Text>
          {user?.status === 'pending' && (
            <View style={styles.pendingBadge}>
              <Text style={styles.pendingText}>Pending Request</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CHATS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  blockedChat: {
    opacity: 0.6,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  blockedText: {
    fontStyle: 'italic',
    color: '#999',
  },
  pendingBadge: {
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  pendingText: {
    color: '#856404',
    fontSize: 12,
  },
});