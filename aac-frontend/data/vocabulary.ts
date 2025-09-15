import { VocabularyCategory, VocabularyItem } from '../types/vocabulary';
import { ARASAAC_SYMBOLS, getArasaacImageUrl } from './arasaacSymbols';

// Helper function to create vocabulary items
function createVocabItem(
  id: string,
  word: string,
  category: string,
  symbolKey: keyof typeof ARASAAC_SYMBOLS,
  isCore: boolean = false
): VocabularyItem {
  return {
    id,
    word,
    category,
    imageUrl: getArasaacImageUrl(ARASAAC_SYMBOLS[symbolKey]),
    isCore,
  };
}

// Core vocabulary items
export const CORE_VOCABULARY: VocabularyItem[] = [
  createVocabItem('yes', 'yes', 'core', 'yes', true),
  createVocabItem('no', 'no', 'core', 'no', true),
  createVocabItem('want', 'want', 'core', 'want', true),
  createVocabItem('more', 'more', 'core', 'more', true),
  createVocabItem('stop', 'stop', 'core', 'stop', true),
  createVocabItem('please', 'please', 'core', 'please', true),
  createVocabItem('help', 'help', 'core', 'help', true),
  createVocabItem('finished', 'finished', 'core', 'finished', true),
];

// Category-based vocabulary
export const VOCABULARY_CATEGORIES: VocabularyCategory[] = [
  {
    id: 'core',
    name: 'Core Words',
    color: '#4CAF50',
    items: CORE_VOCABULARY,
  },
  {
    id: 'people',
    name: 'People',
    color: '#2196F3',
    items: [
      createVocabItem('i', 'I', 'people', 'I'),
      createVocabItem('you', 'you', 'people', 'you'),
      createVocabItem('he', 'he', 'people', 'he'),
      createVocabItem('she', 'she', 'people', 'she'),
      createVocabItem('we', 'we', 'people', 'we'),
    ],
  },
  {
    id: 'actions',
    name: 'Actions',
    color: '#FF9800',
    items: [
      createVocabItem('go', 'go', 'actions', 'go'),
      createVocabItem('come', 'come', 'actions', 'come'),
      createVocabItem('look', 'look', 'actions', 'look'),
      createVocabItem('listen', 'listen', 'actions', 'listen'),
      createVocabItem('eat', 'eat', 'actions', 'eat'),
      createVocabItem('drink', 'drink', 'actions', 'drink'),
      createVocabItem('play', 'play', 'actions', 'play'),
      createVocabItem('sleep', 'sleep', 'actions', 'sleep'),
    ],
  },
  {
    id: 'food',
    name: 'Food',
    color: '#FF5722',
    items: [
      createVocabItem('water', 'water', 'food', 'water'),
      createVocabItem('milk', 'milk', 'food', 'milk'),
      createVocabItem('bread', 'bread', 'food', 'bread'),
      createVocabItem('apple', 'apple', 'food', 'apple'),
      createVocabItem('banana', 'banana', 'food', 'banana'),
    ],
  },
  {
    id: 'places',
    name: 'Places',
    color: '#9C27B0',
    items: [
      createVocabItem('home', 'home', 'places', 'home'),
      createVocabItem('school', 'school', 'places', 'school'),
      createVocabItem('park', 'park', 'places', 'park'),
    ],
  },
  {
    id: 'feelings',
    name: 'Feelings',
    color: '#E91E63',
    items: [
      createVocabItem('happy', 'happy', 'feelings', 'happy'),
      createVocabItem('sad', 'sad', 'feelings', 'sad'),
      createVocabItem('angry', 'angry', 'feelings', 'angry'),
    ],
  },
  {
    id: 'questions',
    name: 'Questions',
    color: '#607D8B',
    items: [
      createVocabItem('what', 'what', 'questions', 'what'),
      createVocabItem('where', 'where', 'questions', 'where'),
      createVocabItem('when', 'when', 'questions', 'when'),
      createVocabItem('who', 'who', 'questions', 'who'),
      createVocabItem('why', 'why', 'questions', 'why'),
    ],
  },
];

// Get all vocabulary items
export function getAllVocabulary(): VocabularyItem[] {
  return VOCABULARY_CATEGORIES.flatMap(category => category.items);
}

// Get category by ID
export function getCategoryById(id: string): VocabularyCategory | undefined {
  return VOCABULARY_CATEGORIES.find(category => category.id === id);
}

// Get vocabulary items by category
export function getVocabularyByCategory(categoryId: string): VocabularyItem[] {
  const category = getCategoryById(categoryId);
  return category ? category.items : [];
}