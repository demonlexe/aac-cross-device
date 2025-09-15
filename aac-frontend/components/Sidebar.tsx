import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { playAlert } from '../utils/speech';

interface SidebarProps {
  onHomePress?: () => void;
  onQuickPhrasesPress?: () => void;
  onAlertPress?: () => void;
  onErrorPress?: () => void;
  isVisible?: boolean;
}

export function Sidebar({
  onHomePress,
  onQuickPhrasesPress,
  onAlertPress,
  onErrorPress,
  isVisible = true,
}: SidebarProps) {
  const handlePress = async (action: () => void, hapticType = Haptics.ImpactFeedbackStyle.Medium) => {
    await Haptics.impactAsync(hapticType);
    action();
  };

  const handleAlertPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await playAlert();
    onAlertPress?.();
  };

  if (!isVisible) return null;

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity
        style={[styles.button, styles.homeButton]}
        onPress={() => handlePress(() => onHomePress?.())}
        testID="sidebar-home"
      >
        <Ionicons name="home" size={24} color="#fff" />
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.quickButton]}
        onPress={() => handlePress(() => onQuickPhrasesPress?.())}
        testID="sidebar-quick"
      >
        <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
        <Text style={styles.buttonText}>Quick</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.alertButton]}
        onPress={handleAlertPress}
        testID="sidebar-alert"
      >
        <Ionicons name="notifications" size={24} color="#fff" />
        <Text style={styles.buttonText}>Alert</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.errorButton]}
        onPress={() => handlePress(() => onErrorPress?.(), Haptics.ImpactFeedbackStyle.Heavy)}
        testID="sidebar-error"
      >
        <Ionicons name="warning" size={24} color="#fff" />
        <Text style={styles.buttonText}>Error</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: '#2C3E50',
    paddingVertical: 20,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    minHeight: 64,
  },
  homeButton: {
    backgroundColor: '#3498DB',
  },
  quickButton: {
    backgroundColor: '#9B59B6',
  },
  alertButton: {
    backgroundColor: '#F39C12',
  },
  errorButton: {
    backgroundColor: '#E74C3C',
  },
  buttonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
});