import {
  getGridDimensions,
  calculateButtonSize,
  getValidGridSizes,
  formatGridSize,
} from '../../utils/grid';
import { GridSize } from '../../types/vocabulary';

describe('Grid Utilities', () => {
  describe('getGridDimensions', () => {
    test('should return correct dimensions for standard grid sizes', () => {
      expect(getGridDimensions(1)).toEqual({ rows: 1, cols: 1 });
      expect(getGridDimensions(4)).toEqual({ rows: 2, cols: 2 });
      expect(getGridDimensions(9)).toEqual({ rows: 3, cols: 3 });
      expect(getGridDimensions(16)).toEqual({ rows: 4, cols: 4 });
      expect(getGridDimensions(25)).toEqual({ rows: 5, cols: 5 });
      expect(getGridDimensions(36)).toEqual({ rows: 6, cols: 6 });
    });

    test('should return correct dimensions for non-square grids', () => {
      expect(getGridDimensions(20)).toEqual({ rows: 4, cols: 5 });
      expect(getGridDimensions(30)).toEqual({ rows: 5, cols: 6 });
      expect(getGridDimensions(40)).toEqual({ rows: 8, cols: 5 });
    });

    test('should return default dimensions for invalid grid size', () => {
      expect(getGridDimensions(7 as GridSize)).toEqual({ rows: 4, cols: 4 });
    });
  });

  describe('calculateButtonSize', () => {
    test('should calculate button size correctly', () => {
      const screenWidth = 400;
      const screenHeight = 600;
      const gridSize: GridSize = 4;
      const padding = 8;

      const result = calculateButtonSize(screenWidth, screenHeight, gridSize, padding);

      // 2x2 grid with padding
      // Available width: 400 - (8 * 3) = 376
      // Available height: 600 - (8 * 3) = 576
      // Button width: 376 / 2 = 188
      // Button height: 576 / 2 = 288
      expect(result.width).toBe(188);
      expect(result.height).toBe(288);
    });

    test('should enforce minimum button size', () => {
      const screenWidth = 100;
      const screenHeight = 100;
      const gridSize: GridSize = 36;
      const padding = 8;

      const result = calculateButtonSize(screenWidth, screenHeight, gridSize, padding);

      // Should enforce minimum of 60x60
      expect(result.width).toBe(60);
      expect(result.height).toBe(60);
    });
  });

  describe('getValidGridSizes', () => {
    test('should return all valid grid sizes', () => {
      const validSizes = getValidGridSizes();
      expect(validSizes).toEqual([1, 4, 9, 16, 20, 25, 30, 36, 40]);
    });
  });

  describe('formatGridSize', () => {
    test('should format grid sizes correctly', () => {
      expect(formatGridSize(1)).toBe('1×1 (1 buttons)');
      expect(formatGridSize(4)).toBe('2×2 (4 buttons)');
      expect(formatGridSize(9)).toBe('3×3 (9 buttons)');
      expect(formatGridSize(20)).toBe('4×5 (20 buttons)');
      expect(formatGridSize(40)).toBe('8×5 (40 buttons)');
    });
  });
});