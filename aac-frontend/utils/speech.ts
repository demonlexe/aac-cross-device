import * as Speech from 'expo-speech';

export interface SpeechOptions {
  rate?: number;
  pitch?: number;
  voice?: string;
  language?: string;
}

class SpeechService {
  private defaultOptions: SpeechOptions = {
    rate: 0.8,
    pitch: 1.0,
    language: 'en-US',
  };

  private currentlyPlaying: boolean = false;

  /**
   * Speak the given text with optional custom options
   */
  async speak(text: string, options?: SpeechOptions): Promise<void> {
    if (this.currentlyPlaying) {
      await this.stop();
    }

    const speechOptions = { ...this.defaultOptions, ...options };

    this.currentlyPlaying = true;

    return new Promise((resolve, reject) => {
      Speech.speak(text, {
        ...speechOptions,
        onDone: () => {
          this.currentlyPlaying = false;
          resolve();
        },
        onError: (error) => {
          this.currentlyPlaying = false;
          reject(error);
        },
      });
    });
  }

  /**
   * Stop current speech
   */
  async stop(): Promise<void> {
    if (this.currentlyPlaying) {
      Speech.stop();
      this.currentlyPlaying = false;
    }
  }

  /**
   * Check if speech is currently playing
   */
  isPlaying(): boolean {
    return this.currentlyPlaying;
  }

  /**
   * Get available voices
   */
  async getAvailableVoices(): Promise<Speech.Voice[]> {
    return Speech.getAvailableVoicesAsync();
  }

  /**
   * Update default speech options
   */
  updateDefaultOptions(options: Partial<SpeechOptions>): void {
    this.defaultOptions = { ...this.defaultOptions, ...options };
  }

  /**
   * Get current default options
   */
  getDefaultOptions(): SpeechOptions {
    return { ...this.defaultOptions };
  }

  /**
   * Play an alert tone (for attention getting)
   */
  async playAlertTone(): Promise<void> {
    // Using speech to create a simple alert sound
    await this.speak('beep', {
      rate: 2.0,
      pitch: 2.0
    });
  }
}

// Export singleton instance
export const speechService = new SpeechService();

// Convenience functions
export const speak = (text: string, options?: SpeechOptions) =>
  speechService.speak(text, options);

export const stopSpeech = () => speechService.stop();

export const playAlert = () => speechService.playAlertTone();