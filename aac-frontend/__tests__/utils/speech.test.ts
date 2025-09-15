import { speechService } from '../../utils/speech';

// Mock expo-speech
jest.mock('expo-speech', () => ({
  speak: jest.fn(),
  stop: jest.fn(),
  getAvailableVoicesAsync: jest.fn(),
}));

describe('Speech Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('speak', () => {
    test('should call Speech.speak with correct parameters', async () => {
      const mockSpeak = require('expo-speech').speak;
      mockSpeak.mockImplementation((_text: string, options: any) => {
        options.onDone?.();
      });

      await speechService.speak('hello');

      expect(mockSpeak).toHaveBeenCalledWith('hello', expect.objectContaining({
        rate: 0.8,
        pitch: 1.0,
        language: 'en-US',
      }));
    });

    test('should update currently playing state', async () => {
      const mockSpeak = require('expo-speech').speak;
      mockSpeak.mockImplementation((_text: string, options: any) => {
        // Simulate async speech
        setTimeout(() => options.onDone?.(), 100);
      });

      expect(speechService.isPlaying()).toBe(false);

      const speakPromise = speechService.speak('hello');
      expect(speechService.isPlaying()).toBe(true);

      await speakPromise;
      expect(speechService.isPlaying()).toBe(false);
    });
  });

  describe('stop', () => {
    test('should call Speech.stop when currently playing', async () => {
      const mockStop = require('expo-speech').stop;

      // Set playing state
      speechService['currentlyPlaying'] = true;

      await speechService.stop();

      expect(mockStop).toHaveBeenCalled();
      expect(speechService.isPlaying()).toBe(false);
    });
  });

  describe('updateDefaultOptions', () => {
    test('should update default options correctly', () => {
      const newOptions = { rate: 1.5, pitch: 1.2 };

      speechService.updateDefaultOptions(newOptions);

      const defaultOptions = speechService.getDefaultOptions();
      expect(defaultOptions.rate).toBe(1.5);
      expect(defaultOptions.pitch).toBe(1.2);
      expect(defaultOptions.language).toBe('en-US'); // Should preserve existing
    });
  });

  describe('getAvailableVoices', () => {
    test('should return available voices', async () => {
      const mockVoices = [
        { identifier: 'en-US-voice1', language: 'en-US', name: 'Voice 1' },
        { identifier: 'en-US-voice2', language: 'en-US', name: 'Voice 2' },
      ];

      const mockGetVoices = require('expo-speech').getAvailableVoicesAsync;
      mockGetVoices.mockResolvedValue(mockVoices);

      const voices = await speechService.getAvailableVoices();

      expect(voices).toEqual(mockVoices);
    });
  });
});