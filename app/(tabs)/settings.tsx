import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ChevronRight, Key, Bell, Database as DataObject, MessageSquare, Phone } from 'lucide-react-native';

export default function SettingsScreen() {
  const settingsItems = [
    {
      id: 'account',
      icon: <Key size={24} color="#075E54" />,
      title: 'Account',
      subtitle: 'Privacy, security, change number',
    },
    {
      id: 'notifications',
      icon: <Bell size={24} color="#075E54" />,
      title: 'Notifications',
      subtitle: 'Message, group & call tones',
    },
    {
      id: 'storage',
      icon: <DataObject size={24} color="#075E54" />,
      title: 'Storage and data',
      subtitle: 'Network usage, auto-download',
    },
    {
      id: 'chats',
      icon: <MessageSquare size={24} color="#075E54" />,
      title: 'Chats',
      subtitle: 'Theme, wallpapers, chat history',
    },
    {
      id: 'calls',
      icon: <Phone size={24} color="#075E54" />,
      title: 'Calls',
      subtitle: 'Voice and video calls',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36' }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileStatus}>Available</Text>
        </View>
      </View>

      <View style={styles.settingsList}>
        {settingsItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              {item.icon}
              <View style={styles.settingsItemText}>
                <Text style={styles.settingsItemTitle}>{item.title}</Text>
                <Text style={styles.settingsItemSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  profileStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  settingsList: {
    marginTop: 20,
  },
  settingsItem: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemText: {
    marginLeft: 16,
  },
  settingsItemTitle: {
    fontSize: 16,
    color: '#000',
  },
  settingsItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});