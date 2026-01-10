import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { useTheme } from '../theme/theme';

interface ListRowProps {
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export function ListRow({ title, subtitle, trailing, onPress, style }: ListRowProps) {
  const { colors, spacing, typography } = useTheme();

  const content = (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          padding: spacing.lg,
        },
        style,
      ]}
    >
      <View style={styles.content}>
        <Text style={[typography.body, { color: colors.text }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[typography.caption, { color: colors.textMuted, marginTop: spacing.xs }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {trailing && <View style={styles.trailing}>{trailing}</View>}
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
  },
  content: {
    flex: 1,
  },
  trailing: {
    marginLeft: 12,
  },
});
