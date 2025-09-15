import { GridSize } from '../types/vocabulary';

/**
 * Calculate grid dimensions from grid size
 */
export function getGridDimensions(gridSize: GridSize): { rows: number; cols: number } {
  switch (gridSize) {
    case 1:
      return { rows: 1, cols: 1 };
    case 4:
      return { rows: 2, cols: 2 };
    case 9:
      return { rows: 3, cols: 3 };
    case 16:
      return { rows: 4, cols: 4 };
    case 20:
      return { rows: 4, cols: 5 };
    case 25:
      return { rows: 5, cols: 5 };
    case 30:
      return { rows: 5, cols: 6 };
    case 36:
      return { rows: 6, cols: 6 };
    case 40:
      return { rows: 8, cols: 5 };
    default:
      return { rows: 4, cols: 4 };
  }
}

/**
 * Calculate button size based on screen dimensions and grid size
 */
export function calculateButtonSize(
  screenWidth: number,
  screenHeight: number,
  gridSize: GridSize,
  padding: number = 8
): { width: number; height: number } {
  const { rows, cols } = getGridDimensions(gridSize);

  const availableWidth = screenWidth - (padding * (cols + 1));
  const availableHeight = screenHeight - (padding * (rows + 1));

  const buttonWidth = availableWidth / cols;
  const buttonHeight = availableHeight / rows;

  return {
    width: Math.max(60, buttonWidth),
    height: Math.max(60, buttonHeight),
  };
}

/**
 * Get valid grid sizes for selection
 */
export function getValidGridSizes(): GridSize[] {
  return [1, 4, 9, 16, 20, 25, 30, 36, 40];
}

/**
 * Format grid size for display
 */
export function formatGridSize(gridSize: GridSize): string {
  const { rows, cols } = getGridDimensions(gridSize);
  return `${rows}×${cols} (${gridSize} buttons)`;
}