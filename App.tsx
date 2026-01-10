import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LanguageProvider } from './src/i18n/i18n';
import { RootTabs } from './src/navigation/RootTabs';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <NavigationContainer>
          <RootTabs />
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </NavigationContainer>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
