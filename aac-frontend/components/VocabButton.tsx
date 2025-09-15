import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { VocabularyItem } from '../types/vocabulary';
import { speak } from '../utils/speech';

interface VocabButtonProps {
  item: VocabularyItem;
  width: number;
  height: number;
  onPress?: (item: VocabularyItem) => void;
  disabled?: boolean;
  showText?: boolean;
}

export function VocabButton({
  item,
  width,
  height,
  onPress,
  disabled = false,
  showText = true,
}: VocabButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handlePress = async () => {
    if (disabled || isLoading) return;

    try {
      setIsLoading(true);

      // Haptic feedback
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Speak the word
      await speak(item.word);

      // Call custom onPress handler
      onPress?.(item);
    } catch (error) {
      console.error('Error in VocabButton press:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonStyle = [
    styles.button,
    {
      width,
      height,
      backgroundColor: item.isCore ? '#4CAF50' : '#E3F2FD',
      opacity: disabled ? 0.5 : 1,
    },
  ];

  const imageSize = Math.min(width * 0.6, height * 0.6, 80);

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
      testID={`vocab-button-${item.id}`}
    >
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#666" />
        ) : (
          <>
            {!imageError ? (
              <Image
                source={{ uri: item.imageUrl }}
                style={[
                  styles.image,
                  {
                    width: imageSize,
                    height: imageSize,
                  },
                ]}
                contentFit="contain"
                transition={200}
                onError={() => setImageError(true)}
              />
            ) : (
              <View
                style={[
                  styles.imagePlaceholder,
                  {
                    width: imageSize,
                    height: imageSize,
                  },
                ]}
              >
                <Text style={styles.placeholderText}>?</Text>
              </View>
            )}

            {showText && (
              <Text
                style={[
                  styles.text,
                  { fontSize: Math.max(12, Math.min(width * 0.08, 16)) }
                ]}
                numberOfLines={2}
                adjustsFontSizeToFit
              >
                {item.word}
              </Text>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    margin: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  image: {
    marginBottom: 4,
  },
  imagePlaceholder: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  placeholderText: {
    fontSize: 24,
    color: '#999',
    fontWeight: 'bold',
  },
  text: {
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
});