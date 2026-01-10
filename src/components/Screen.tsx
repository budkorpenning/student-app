import React, { ReactNode } from 'react';
import { View, StyleSheet, ScrollView, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/theme';

interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
}

export function Screen({ children, scroll = false, style }: ScreenProps) {
  const { colors, spacing } = useTheme();

  const containerStyle = [
    styles.container,
    { backgroundColor: colors.bg, padding: spacing.lg },
    style,
  ];

  if (scroll) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={containerStyle}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]} edges={['top']}>
      <View style={containerStyle}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});
