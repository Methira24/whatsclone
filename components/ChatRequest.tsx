import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check, X } from 'lucide-react-native';

interface ChatRequestProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function ChatRequest({ onAccept, onDecline }: ChatRequestProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Would you like to start chatting?</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={onAccept}>
          <Check size={20} color="#fff" />
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={onDecline}>
          <X size={20} color="#fff" />
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 120,
    justifyContent: 'center',
  },
  acceptButton: {
    backgroundColor: '#00A884',
    marginRight: 8,
  },
  declineButton: {
    backgroundColor: '#FF4B4B',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});