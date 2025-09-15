import {
  CORE_VOCABULARY,
  VOCABULARY_CATEGORIES,
  getAllVocabulary,
  getCategoryById,
  getVocabularyByCategory,
} from '../../data/vocabulary';

describe('Vocabulary Data', () => {
  describe('CORE_VOCABULARY', () => {
    test('should contain core vocabulary items', () => {
      expect(CORE_VOCABULARY.length).toBeGreaterThan(0);
      expect(CORE_VOCABULARY.every(item => item.isCore)).toBe(true);
    });

    test('should contain essential words', () => {
      const words = CORE_VOCABULARY.map(item => item.word);
      expect(words).toContain('yes');
      expect(words).toContain('no');
      expect(words).toContain('want');
      expect(words).toContain('more');
      expect(words).toContain('stop');
    });
  });

  describe('VOCABULARY_CATEGORIES', () => {
    test('should contain multiple categories', () => {
      expect(VOCABULARY_CATEGORIES.length).toBeGreaterThan(0);
    });

    test('should have valid category structure', () => {
      VOCABULARY_CATEGORIES.forEach(category => {
        expect(category).toHaveProperty('id');
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('color');
        expect(category).toHaveProperty('items');
        expect(Array.isArray(category.items)).toBe(true);
      });
    });

    test('should contain core category', () => {
      const coreCategory = VOCABULARY_CATEGORIES.find(cat => cat.id === 'core');
      expect(coreCategory).toBeDefined();
      expect(coreCategory?.items).toEqual(CORE_VOCABULARY);
    });

    test('should have unique category IDs', () => {
      const ids = VOCABULARY_CATEGORIES.map(cat => cat.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });
  });

  describe('getAllVocabulary', () => {
    test('should return all vocabulary items from all categories', () => {
      const allItems = getAllVocabulary();
      const expectedLength = VOCABULARY_CATEGORIES.reduce(
        (total, category) => total + category.items.length,
        0
      );

      expect(allItems.length).toBe(expectedLength);
    });

    test('should include core vocabulary items', () => {
      const allItems = getAllVocabulary();
      const coreWords = CORE_VOCABULARY.map(item => item.word);

      coreWords.forEach(word => {
        expect(allItems.some(item => item.word === word)).toBe(true);
      });
    });
  });

  describe('getCategoryById', () => {
    test('should return correct category for valid ID', () => {
      const coreCategory = getCategoryById('core');
      expect(coreCategory).toBeDefined();
      expect(coreCategory?.id).toBe('core');
      expect(coreCategory?.name).toBe('Core Words');
    });

    test('should return undefined for invalid ID', () => {
      const invalidCategory = getCategoryById('nonexistent');
      expect(invalidCategory).toBeUndefined();
    });
  });

  describe('getVocabularyByCategory', () => {
    test('should return items for valid category', () => {
      const coreItems = getVocabularyByCategory('core');
      expect(coreItems).toEqual(CORE_VOCABULARY);
    });

    test('should return empty array for invalid category', () => {
      const invalidItems = getVocabularyByCategory('nonexistent');
      expect(invalidItems).toEqual([]);
    });

    test('should return correct items for each category', () => {
      VOCABULARY_CATEGORIES.forEach(category => {
        const items = getVocabularyByCategory(category.id);
        expect(items).toEqual(category.items);
      });
    });
  });

  describe('Vocabulary Item Structure', () => {
    test('should have valid item structure in all categories', () => {
      const allItems = getAllVocabulary();

      allItems.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('word');
        expect(item).toHaveProperty('category');
        expect(item).toHaveProperty('imageUrl');
        expect(typeof item.id).toBe('string');
        expect(typeof item.word).toBe('string');
        expect(typeof item.category).toBe('string');
        expect(typeof item.imageUrl).toBe('string');
      });
    });

    test('should have unique item IDs across all categories', () => {
      const allItems = getAllVocabulary();
      const ids = allItems.map(item => item.id);
      const uniqueIds = new Set(ids);

      expect(ids.length).toBe(uniqueIds.size);
    });

    test('should have valid ARASAAC image URLs', () => {
      const allItems = getAllVocabulary();

      allItems.forEach(item => {
        expect(item.imageUrl).toMatch(/^https:\/\/api\.arasaac\.org\/api\/pictograms\/\d+/);
      });
    });
  });
});