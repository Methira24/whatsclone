import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Phone, Video, PhoneIncoming, PhoneOutgoing, PhoneMissed, Link } from 'lucide-react-native';
import { format } from 'date-fns';

const CALLS = [
  {
    id: '1',
    name: 'Mizko & Karencheng',
    timestamp: new Date(2024, 0, 23, 10, 53),
    type: 'video',
    status: 'incoming',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
  },
  {
    id: '2',
    name: 'Danlok',
    timestamp: new Date(2024, 0, 23, 10, 35),
    type: 'video',
    status: 'incoming',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
  },
  {
    id: '3',
    name: 'Shiny',
    timestamp: new Date(2024, 0, 23, 10, 33),
    type: 'voice',
    status: 'incoming',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
  },
  {
    id: '4',
    name: 'Kimaiban',
    timestamp: new Date(2024, 0, 23, 10, 29),
    type: 'video',
    status: 'missed',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
  },
  {
    id: '5',
    name: 'Mizko',
    timestamp: new Date(2024, 0, 23, 8, 46),
    type: 'video',
    status: 'outgoing',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
  },
  {
    id: '6',
    name: 'Maureen',
    timestamp: new Date(2024, 0, 23, 8, 18),
    type: 'voice',
    status: 'incoming',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
  },
  {
    id: '7',
    name: 'Kalypso',
    timestamp: new Date(2024, 0, 23, 7, 47),
    type: 'voice',
    status: 'incoming',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
  },
];

export default function CallsScreen() {
  const getCallIcon = (type: string, status: string) => {
    if (status === 'missed') {
      return <PhoneMissed size={16} color="#FF3B30" style={styles.callStatusIcon} />;
    }
    if (status === 'incoming') {
      return <PhoneIncoming size={16} color="#34C759" style={styles.callStatusIcon} />;
    }
    return <PhoneOutgoing size={16} color="#007AFF" style={styles.callStatusIcon} />;
  };

  const renderHeader = () => (
    <TouchableOpacity style={styles.createLinkContainer}>
      <View style={styles.createLinkIconContainer}>
        <Link size={22} color="#fff" />
      </View>
      <View style={styles.createLinkContent}>
        <Text style={styles.createLinkTitle}>Create call link</Text>
        <Text style={styles.createLinkSubtitle}>Share a link for your WhatsApp call</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.callItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.callInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.callDetails}>
          {getCallIcon(item.type, item.status)}
          <Text style={[
            styles.callStatus,
            item.status === 'missed' && styles.missedCall
          ]}>
            {format(item.timestamp, 'dd MMMM, HH:mm')}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.callButton}>
        {item.type === 'video' ? (
          <Video size={22} color="#075E54" />
        ) : (
          <Phone size={22} color="#075E54" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={CALLS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity style={styles.fab}>
        <Phone size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121B22',
  },
  listContent: {
    paddingBottom: 80,
  },
  createLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1F2C34',
    marginBottom: 8,
  },
  createLinkIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#00A884',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  createLinkContent: {
    flex: 1,
  },
  createLinkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  createLinkSubtitle: {
    fontSize: 14,
    color: '#8696A0',
  },
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1F2C34',
    marginBottom: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  callInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 4,
  },
  callDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callStatusIcon: {
    marginRight: 6,
  },
  callStatus: {
    fontSize: 14,
    color: '#8696A0',
  },
  missedCall: {
    color: '#FF3B30',
  },
  callButton: {
    padding: 8,
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00A884',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});