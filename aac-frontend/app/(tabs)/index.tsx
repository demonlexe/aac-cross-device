import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { CommunicationGrid } from '../../components/CommunicationGrid';
import { Sidebar } from '../../components/Sidebar';
import { CORE_VOCABULARY } from '../../data/vocabulary';
import { VocabularyItem, GridSize } from '../../types/vocabulary';

export default function HomeScreen() {
  const [gridSize] = useState<GridSize>(16);
  const [selectedItems, setSelectedItems] = useState<VocabularyItem[]>([]);

  useEffect(() => {
    // Initialize with core vocabulary
    setSelectedItems(CORE_VOCABULARY);
  }, []);

  const handleItemPress = (item: VocabularyItem) => {
    console.log('Pressed:', item.word);
  };

  const handleHomePress = () => {
    console.log('Home pressed');
  };

  const handleQuickPhrasesPress = () => {
    console.log('Quick phrases pressed');
  };

  const handleAlertPress = () => {
    console.log('Alert pressed');
  };

  const handleErrorPress = () => {
    console.log('Error pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.content}>
        <CommunicationGrid
          items={selectedItems}
          gridSize={gridSize}
          onItemPress={handleItemPress}
          showText={true}
        />

        <Sidebar
          onHomePress={handleHomePress}
          onQuickPhrasesPress={handleQuickPhrasesPress}
          onAlertPress={handleAlertPress}
          onErrorPress={handleErrorPress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
});
