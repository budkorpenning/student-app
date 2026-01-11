import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { Card } from '../components/Card';
import { useTheme } from '../theme/theme';
import { useI18n } from '../i18n/i18n';

export function AskScreen() {
  const { colors, spacing, typography } = useTheme();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: spacing.lg,
          paddingBottom: insets.bottom + spacing.xl,
        }}
      >
        <Text style={[typography.title, { color: colors.text, marginBottom: spacing.xl }]}>
          {t('askTitle')}
        </Text>

        <Card>
          <Text style={[typography.body, { color: colors.textMuted }]}>
            {t('askHint')}
          </Text>
        </Card>
      </ScrollView>
    </Screen>
  );
}
