import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { VocabButton } from '../../components/VocabButton';
import { VocabularyItem } from '../../types/vocabulary';

// Mock dependencies
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Medium: 'medium',
  },
}));

jest.mock('../../utils/speech', () => ({
  speak: jest.fn(),
}));

jest.mock('expo-image', () => ({
  Image: ({ testID, onError }: any) => {
    const MockedImage = 'Image';
    return <MockedImage testID={testID} onPress={onError} />;
  },
}));

describe('VocabButton', () => {
  const mockItem: VocabularyItem = {
    id: 'test-1',
    word: 'hello',
    category: 'greetings',
    imageUrl: 'https://example.com/hello.png',
    isCore: true,
  };

  const defaultProps = {
    item: mockItem,
    width: 100,
    height: 100,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with item data', () => {
    const { getByTestId, getByText } = render(<VocabButton {...defaultProps} />);

    expect(getByTestId('vocab-button-test-1')).toBeTruthy();
    expect(getByText('hello')).toBeTruthy();
  });

  test('calls onPress when button is pressed', async () => {
    const mockOnPress = jest.fn();
    const mockSpeak = require('../../utils/speech').speak;
    const mockHaptics = require('expo-haptics').impactAsync;

    const { getByTestId } = render(
      <VocabButton {...defaultProps} onPress={mockOnPress} />
    );

    fireEvent.press(getByTestId('vocab-button-test-1'));

    await waitFor(() => {
      expect(mockHaptics).toHaveBeenCalled();
      expect(mockSpeak).toHaveBeenCalledWith('hello');
      expect(mockOnPress).toHaveBeenCalledWith(mockItem);
    });
  });

  test('does not call onPress when disabled', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <VocabButton {...defaultProps} onPress={mockOnPress} disabled />
    );

    fireEvent.press(getByTestId('vocab-button-test-1'));

    expect(mockOnPress).not.toHaveBeenCalled();
  });

  test('shows placeholder when image fails to load', () => {
    const { getByText } = render(<VocabButton {...defaultProps} />);

    // Simulate image error
    const image = require('expo-image').Image;
    fireEvent(image, 'onError');

    expect(getByText('?')).toBeTruthy();
  });

  test('applies core vocabulary styling', () => {
    const { getByTestId } = render(<VocabButton {...defaultProps} />);

    const button = getByTestId('vocab-button-test-1');
    expect(button.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: '#4CAF50', // Core vocabulary color
        }),
      ])
    );
  });

  test('applies non-core vocabulary styling', () => {
    const nonCoreItem = { ...mockItem, isCore: false };
    const { getByTestId } = render(
      <VocabButton {...defaultProps} item={nonCoreItem} />
    );

    const button = getByTestId('vocab-button-test-1');
    expect(button.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: '#E3F2FD', // Non-core vocabulary color
        }),
      ])
    );
  });

  test('hides text when showText is false', () => {
    const { queryByText } = render(
      <VocabButton {...defaultProps} showText={false} />
    );

    expect(queryByText('hello')).toBeNull();
  });
});