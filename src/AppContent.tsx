import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useThemeMode } from './theme/theme';

export function AppContent() {
  const { isDark } = useThemeMode();

  return <StatusBar style={isDark ? 'light' : 'dark'} />;
}
