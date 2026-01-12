import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/theme';

interface AskFabProps {
  onPress: () => void;
}

export function AskFab({ onPress }: AskFabProps) {
  const { colors, spacing } = useTheme();
  const insets = useSafeAreaInsets();

  // Position above tab bar (84px) + safe bottom inset + spacing
  const bottomOffset = 84 + Math.max(insets.bottom, spacing.md) + spacing.md;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.fab,
        {
          backgroundColor: colors.primary,
          bottom: bottomOffset,
          right: spacing.lg,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Ionicons name="sparkles" size={24} color={colors.textOnPrimary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
