import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { CommunicationGrid } from '../../components/CommunicationGrid';
import { Sidebar } from '../../components/Sidebar';
import { VOCABULARY_CATEGORIES, VocabularyCategory } from '../../data/vocabulary';
import { VocabularyItem, GridSize } from '../../types/vocabulary';

export default function CategoriesScreen() {
  const [selectedCategory, setSelectedCategory] = useState<VocabularyCategory>(
    VOCABULARY_CATEGORIES[0]
  );
  const [gridSize] = useState<GridSize>(16);

  const handleItemPress = (item: VocabularyItem) => {
    console.log('Pressed:', item.word);
  };

  const handleCategoryPress = (category: VocabularyCategory) => {
    setSelectedCategory(category);
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
        {/* Category Selection Bar */}
        <View style={styles.categoryBar}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScrollContent}
          >
            {VOCABULARY_CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor: category.color,
                    opacity: selectedCategory.id === category.id ? 1 : 0.6,
                  },
                ]}
                onPress={() => handleCategoryPress(category)}
              >
                <Text style={styles.categoryButtonText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Selected Category Title */}
        <View style={styles.titleBar}>
          <Text style={[styles.categoryTitle, { color: selectedCategory.color }]}>
            {selectedCategory.name}
          </Text>
          <Text style={styles.itemCount}>
            {selectedCategory.items.length} words
          </Text>
        </View>

        {/* Communication Grid */}
        <View style={styles.gridContainer}>
          <CommunicationGrid
            items={selectedCategory.items}
            gridSize={gridSize}
            onItemPress={handleItemPress}
            showText={true}
          />
        </View>

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
  categoryBar: {
    height: 60,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryScrollContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
    minWidth: '100%',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  titleBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
  },
  gridContainer: {
    flex: 1,
    paddingRight: 80, // Make room for sidebar
  },
});