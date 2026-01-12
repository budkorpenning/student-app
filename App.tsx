import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LanguageProvider } from './src/i18n/i18n';
import { ThemeProvider } from './src/theme/theme';
import { RootTabs } from './src/navigation/RootTabs';
import { AppContent } from './src/AppContent';
import { AskOverlayProvider } from './src/components/AskOverlayProvider';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <NavigationContainer>
            <AskOverlayProvider>
              <RootTabs />
            </AskOverlayProvider>
            <AppContent />
          </NavigationContainer>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
