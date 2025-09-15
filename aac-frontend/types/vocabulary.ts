export interface VocabularyItem {
  id: string;
  word: string;
  category: string;
  imageUrl: string;
  audioUrl?: string;
  isCore?: boolean;
}

export interface VocabularyCategory {
  id: string;
  name: string;
  color: string;
  items: VocabularyItem[];
}

export type GridSize = 1 | 4 | 9 | 16 | 20 | 25 | 30 | 36 | 40;

export interface UserSettings {
  gridSize: GridSize;
  speechRate: number;
  speechPitch: number;
  selectedVoice?: string;
}