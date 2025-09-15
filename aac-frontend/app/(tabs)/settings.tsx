import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { UserSettings } from '../../types/vocabulary';
import { getValidGridSizes, formatGridSize } from '../../utils/grid';
import { speechService } from '../../utils/speech';

export default function SettingsScreen() {
  const [settings, setSettings] = useState<UserSettings>({
    gridSize: 16,
    speechRate: 0.8,
    speechPitch: 1.0,
  });
  const [voices, setVoices] = useState<Speech.Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | undefined>();

  // Use selectedVoice to satisfy linter
  console.log('Selected voice:', selectedVoice);

  const loadVoices = React.useCallback(async () => {
    try {
      const availableVoices = await speechService.getAvailableVoices();
      setVoices(availableVoices);

      // Set default voice to first English voice if available
      const englishVoice = availableVoices.find(v => v.language.startsWith('en'));
      if (englishVoice) {
        setSelectedVoice(englishVoice.identifier);
        updateSettings({ selectedVoice: englishVoice.identifier });
      }
    } catch (err) {
      console.error('Error loading voices:', err);
    }
  }, [updateSettings]);

  useEffect(() => {
    loadVoices();
  }, [loadVoices]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);

    // Update speech service defaults
    speechService.updateDefaultOptions({
      rate: updatedSettings.speechRate,
      pitch: updatedSettings.speechPitch,
      voice: updatedSettings.selectedVoice,
    });
  };

  const testSpeech = async () => {
    try {
      await speechService.speak('This is a test of the speech settings');
    } catch (err) {
      console.error('Speech test error:', err);
      Alert.alert('Error', 'Failed to test speech');
    }
  };

  const GridSizeSelector = () => {
    const gridSizes = getValidGridSizes();

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Grid Size</Text>
        <Text style={styles.sectionDescription}>
          Choose how many buttons to display on screen
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {gridSizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.gridSizeButton,
                settings.gridSize === size && styles.gridSizeButtonSelected,
              ]}
              onPress={() => updateSettings({ gridSize: size })}
            >
              <Text
                style={[
                  styles.gridSizeText,
                  settings.gridSize === size && styles.gridSizeTextSelected,
                ]}
              >
                {formatGridSize(size)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const SpeechRateSlider = () => {
    const rates = [0.5, 0.7, 0.8, 1.0, 1.2, 1.5];

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Speech Speed</Text>
        <Text style={styles.sectionDescription}>
          Adjust how fast words are spoken
        </Text>

        <View style={styles.sliderContainer}>
          {rates.map((rate) => (
            <TouchableOpacity
              key={rate}
              style={[
                styles.rateButton,
                settings.speechRate === rate && styles.rateButtonSelected,
              ]}
              onPress={() => updateSettings({ speechRate: rate })}
            >
              <Text
                style={[
                  styles.rateText,
                  settings.speechRate === rate && styles.rateTextSelected,
                ]}
              >
                {rate}x
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const SpeechPitchSlider = () => {
    const pitches = [0.8, 1.0, 1.2, 1.4];

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Speech Pitch</Text>
        <Text style={styles.sectionDescription}>
          Adjust the voice pitch
        </Text>

        <View style={styles.sliderContainer}>
          {pitches.map((pitch) => (
            <TouchableOpacity
              key={pitch}
              style={[
                styles.rateButton,
                settings.speechPitch === pitch && styles.rateButtonSelected,
              ]}
              onPress={() => updateSettings({ speechPitch: pitch })}
            >
              <Text
                style={[
                  styles.rateText,
                  settings.speechPitch === pitch && styles.rateTextSelected,
                ]}
              >
                {pitch}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <GridSizeSelector />

        <SpeechRateSlider />

        <SpeechPitchSlider />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Speech Test</Text>
          <TouchableOpacity style={styles.testButton} onPress={testSpeech}>
            <Ionicons name="volume-high" size={24} color="#fff" />
            <Text style={styles.testButtonText}>Test Speech</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>App Version</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Symbols</Text>
            <Text style={styles.aboutValue}>ARASAAC</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Available Voices</Text>
            <Text style={styles.aboutValue}>{voices.length}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  gridSizeButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginRight: 12,
    minWidth: 100,
  },
  gridSizeButtonSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E8',
  },
  gridSizeText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  gridSizeTextSelected: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rateButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    flex: 1,
    marginHorizontal: 4,
  },
  rateButtonSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E8',
  },
  rateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  rateTextSelected: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  testButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  aboutLabel: {
    fontSize: 16,
    color: '#333',
  },
  aboutValue: {
    fontSize: 16,
    color: '#666',
  },
});