import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { VocabButton } from './VocabButton';
import { VocabularyItem, GridSize } from '../types/vocabulary';
import { getGridDimensions, calculateButtonSize } from '../utils/grid';

interface CommunicationGridProps {
  items: VocabularyItem[];
  gridSize: GridSize;
  onItemPress?: (item: VocabularyItem) => void;
  showText?: boolean;
  padding?: number;
}

export function CommunicationGrid({
  items,
  gridSize,
  onItemPress,
  showText = true,
  padding = 8,
}: CommunicationGridProps) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const { rows, cols } = getGridDimensions(gridSize);

  // Reserve space for navigation and other UI elements
  const availableHeight = screenHeight * 0.7;
  const buttonSize = calculateButtonSize(screenWidth, availableHeight, gridSize, padding);

  // Ensure we only show up to gridSize items
  const displayItems = items.slice(0, gridSize);

  // Fill empty slots if needed
  const emptySlots = Math.max(0, gridSize - displayItems.length);
  const allItems = [
    ...displayItems,
    ...Array(emptySlots).fill(null),
  ];

  const renderItem = ({ item }: { item: VocabularyItem | null; index: number }) => {
    if (!item) {
      return (
        <View
          style={[
            styles.emptySlot,
            {
              width: buttonSize.width,
              height: buttonSize.height,
              margin: padding / 2,
            },
          ]}
        />
      );
    }

    return (
      <VocabButton
        item={item}
        width={buttonSize.width}
        height={buttonSize.height}
        onPress={onItemPress}
        showText={showText}
      />
    );
  };

  const getItemLayout = (_: unknown, index: number) => {
    const itemHeight = buttonSize.height + padding;

    return {
      length: itemHeight,
      offset: Math.floor(index / cols) * itemHeight,
      index,
    };
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allItems}
        renderItem={renderItem}
        numColumns={cols}
        key={`${cols}-${rows}`} // Force re-render when grid changes
        contentContainerStyle={[
          styles.grid,
          { padding: padding / 2 }
        ]}
        scrollEnabled={rows > 6} // Enable scroll for large grids
        showsVerticalScrollIndicator={false}
        getItemLayout={getItemLayout}
        keyExtractor={(item, index) =>
          item ? `vocab-${item.id}` : `empty-${index}`
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptySlot: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
});