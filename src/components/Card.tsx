import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme/theme';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'hero';
  style?: ViewStyle;
}

export function Card({ children, variant = 'default', style }: CardProps) {
  const { colors, spacing } = useTheme();

  const cardStyle = [
    styles.card,
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      padding: spacing.lg,
      borderRadius: 12,
    },
    variant === 'hero' && {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
  },
});
