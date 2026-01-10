import React from 'react';
import { Text, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme/theme';

interface SectionHeaderProps {
  title: string;
  style?: ViewStyle;
}

export function SectionHeader({ title, style }: SectionHeaderProps) {
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={[styles.container, { marginBottom: spacing.md }, style]}>
      <Text style={[typography.sectionHeader, { color: colors.text }]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
