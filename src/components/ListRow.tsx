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

  const containerStyle = [
    styles.container,
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      padding: spacing.lg,
    },
    style,
  ];

  const content = (
    <>
      <View style={styles.content}>
        <Text style={[typography.bodyBold, { color: colors.text }]} numberOfLines={2}>
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[typography.caption, { color: colors.textMuted, marginTop: spacing.xs }]}
            numberOfLines={2}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {trailing && <View style={[styles.trailing, { marginLeft: spacing.md }]}>{trailing}</View>}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          containerStyle,
          pressed && { opacity: 0.7 },
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{content}</View>;
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
    flexShrink: 0,
  },
});
