import React from 'react';
import { render } from '@testing-library/react-native';
import { CommunicationGrid } from '../../components/CommunicationGrid';
import { VocabularyItem, GridSize } from '../../types/vocabulary';

// Mock dependencies
jest.mock('../../components/VocabButton', () => ({
  VocabButton: ({ item, testID }: any) => {
    const MockedVocabButton = 'VocabButton';
    return <MockedVocabButton testID={testID}>{item?.word || 'empty'}</MockedVocabButton>;
  },
}));

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    useWindowDimensions: () => ({
      width: 400,
      height: 600,
    }),
  };
});

describe('CommunicationGrid', () => {
  const mockItems: VocabularyItem[] = [
    {
      id: 'item-1',
      word: 'hello',
      category: 'greetings',
      imageUrl: 'https://example.com/hello.png',
    },
    {
      id: 'item-2',
      word: 'goodbye',
      category: 'greetings',
      imageUrl: 'https://example.com/goodbye.png',
    },
    {
      id: 'item-3',
      word: 'thank you',
      category: 'greetings',
      imageUrl: 'https://example.com/thanks.png',
    },
  ];

  const defaultProps = {
    items: mockItems,
    gridSize: 4 as GridSize,
  };

  test('renders correct number of items', () => {
    const { getAllByText } = render(<CommunicationGrid {...defaultProps} />);

    expect(getAllByText('hello')).toHaveLength(1);
    expect(getAllByText('goodbye')).toHaveLength(1);
    expect(getAllByText('thank you')).toHaveLength(1);
    expect(getAllByText('empty')).toHaveLength(1); // Empty slot for 4-item grid
  });

  test('limits items to grid size', () => {
    const { getAllByText } = render(
      <CommunicationGrid {...defaultProps} gridSize={2} />
    );

    expect(getAllByText('hello')).toHaveLength(1);
    expect(getAllByText('goodbye')).toHaveLength(1);
    expect(getAllByText('thank you')).toHaveLength(0); // Should be cut off
  });

  test('fills empty slots when items are fewer than grid size', () => {
    const { getAllByText } = render(
      <CommunicationGrid {...defaultProps} gridSize={9} />
    );

    expect(getAllByText('empty')).toHaveLength(6); // 9 - 3 items = 6 empty slots
  });

  test('renders with single item grid', () => {
    const { getAllByText } = render(
      <CommunicationGrid {...defaultProps} gridSize={1} />
    );

    expect(getAllByText('hello')).toHaveLength(1);
    expect(getAllByText('goodbye')).toHaveLength(0);
    expect(getAllByText('empty')).toHaveLength(0);
  });

  test('renders with large grid', () => {
    const { getAllByText } = render(
      <CommunicationGrid {...defaultProps} gridSize={40} />
    );

    expect(getAllByText('hello')).toHaveLength(1);
    expect(getAllByText('goodbye')).toHaveLength(1);
    expect(getAllByText('thank you')).toHaveLength(1);
    expect(getAllByText('empty')).toHaveLength(37); // 40 - 3 items = 37 empty slots
  });
});