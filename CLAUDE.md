# AAC Cross-Device App Plan

## Tech Stack
- **React Native/Expo** - Cross-platform mobile development
- **TypeScript** - Type safety
- **Expo Router** - File-based navigation
- **React Navigation** - Tab-based navigation

## Early Version Plan

### Core Features
1. **Grid-based Communication Board**
   - Configurable grid sizes (1-40 buttons per screen)
   - Symbol + text buttons for core vocabulary
   - Touch feedback with haptics (`expo-haptics`)

2. **Essential Navigation**
   - Bottom tab navigation (Home, Categories, Settings)
   - Sidebar with quick access buttons (Home, Quick Phrases, Alert)
   - Alert button with audio tone for attention

3. **Basic Categories**
   - Core vocabulary (yes, no, want, more, stop)
   - People, Food, Actions, Places
   - Question words

4. **Simple Customization**
   - Button size adjustment
   - Basic symbol/text editing
   - User profiles

### Implementation Structure
```
app/
├── (tabs)/
│   ├── home.tsx          # Main communication grid
│   ├── categories.tsx    # Topic-specific vocabulary
│   └── settings.tsx      # Basic customization
├── components/
│   ├── CommunicationGrid.tsx
│   ├── VocabButton.tsx
│   └── Sidebar.tsx
└── data/
    └── vocabulary.ts     # Core vocabulary data
```

### MVP Focus
- Simple grid layout with core 20-30 vocabulary items
- Text-to-speech output
- Basic button customization
- Responsive design for tablets

### Key Features from Reference App
- Available on Android
- Reasonably priced
- Sidebar for easy navigation
- Core vocabulary + topic-specific words
- Highly customizable
- Configurable button grid sizes (1-40 buttons)
- Research-backed approach

## Development Commands
- `npm run start` - Start Expo development server
- `npm run lint` - Run ESLint
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web