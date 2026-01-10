import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/theme';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'muted';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const { colors, spacing, typography } = useTheme();

  const getColors = () => {
    switch (variant) {
      case 'success':
        return { bg: colors.success + '20', text: colors.success };
      case 'warning':
        return { bg: colors.warning + '20', text: colors.warning };
      case 'danger':
        return { bg: colors.danger + '20', text: colors.danger };
      case 'muted':
        return { bg: colors.surface2, text: colors.textMuted };
      default:
        return { bg: colors.primary + '20', text: colors.primary };
    }
  };

  const badgeColors = getColors();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: badgeColors.bg,
          paddingHorizontal: spacing.sm,
          paddingVertical: spacing.xs,
        },
      ]}
    >
      <Text style={[typography.small, { color: badgeColors.text, fontWeight: '600' }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
});
