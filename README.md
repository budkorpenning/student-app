# Student App

A polished mobile app for students to manage their schedule, assignments, and messages. Built with React Native and Expo.

## Features

- **Today** — "Next up" hero card with current/upcoming lesson, later today schedule, and assignments due soon
- **Week** — Day picker with agenda view for the selected day
- **Assignments** — Filterable list (All/Open/Overdue/Completed) with status badges
- **Messages** — Message threads with unread indicators
- **More** — Access to Ask and Settings
- **Settings** — Theme toggle (System/Light/Dark) and language switch (Swedish/English)

## Tech Stack

- [Expo](https://expo.dev/) (managed workflow)
- React Native + TypeScript
- React Navigation (bottom tabs + native stack)
- Lightweight i18n (SV/EN) with device language detection
- System theme support (light/dark mode)
- AsyncStorage for persisting preferences

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Expo Go app on your device (for testing)

### Installation

```bash
npm install
```

### Running the App

```bash
npx expo start
```

Scan the QR code with Expo Go (Android) or Camera app (iOS).

### Platform-specific

```bash
npx expo start --ios      # iOS simulator
npx expo start --android  # Android emulator
```

## Project Structure

```
src/
  components/     # Reusable UI components (Screen, Card, ListRow, Badge, etc.)
  data/           # Types and mock data
  i18n/           # Localization strings and language provider
  navigation/     # React Navigation setup (tabs, stacks)
  screens/        # Screen components
  theme/          # Colors, spacing, typography, theme provider
  utils/          # Date formatting utilities
```

## Localization

The app supports Swedish and English. Language is detected from device settings (defaults to Swedish) and can be changed manually in Settings.

All user-facing strings are defined in `src/i18n/strings.ts`.

## License

Private project.
