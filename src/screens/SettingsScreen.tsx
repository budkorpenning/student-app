import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { useTheme } from '../theme/theme';
import { useI18n } from '../i18n/i18n';
import { Language } from '../i18n/strings';

interface LanguageOptionProps {
  label: string;
  value: Language;
  selected: boolean;
  onPress: () => void;
}

function LanguageOption({ label, selected, onPress }: LanguageOptionProps) {
  const { colors, spacing, typography } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.option,
        {
          backgroundColor: colors.surface,
          borderColor: selected ? colors.primary : colors.border,
          borderWidth: selected ? 2 : 1,
          padding: spacing.lg,
        },
      ]}
    >
      <Text style={[typography.body, { color: colors.text }]}>{label}</Text>
      {selected && (
        <View style={[styles.checkmark, { backgroundColor: colors.primary }]}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </Pressable>
  );
}

function SettingsRow({ label, value }: { label: string; value: string }) {
  const { colors, spacing, typography } = useTheme();

  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          padding: spacing.lg,
        },
      ]}
    >
      <Text style={[typography.body, { color: colors.text }]}>{label}</Text>
      <Text style={[typography.body, { color: colors.textMuted }]}>{value}</Text>
    </View>
  );
}

export function SettingsScreen() {
  const { colors, spacing, typography } = useTheme();
  const { t, language, setLanguage } = useI18n();

  return (
    <Screen scroll>
      <Text style={[typography.title, { color: colors.text, marginBottom: spacing.xl }]}>
        {t('settingsTitle')}
      </Text>

      {/* Language section */}
      <SectionHeader title={t('language')} />
      <View style={{ marginBottom: spacing.xl }}>
        <LanguageOption
          label={t('languageSwedish')}
          value="sv"
          selected={language === 'sv'}
          onPress={() => setLanguage('sv')}
        />
        <View style={{ height: spacing.sm }} />
        <LanguageOption
          label={t('languageEnglish')}
          value="en"
          selected={language === 'en'}
          onPress={() => setLanguage('en')}
        />
      </View>

      {/* About section */}
      <SectionHeader title={t('about')} />
      <SettingsRow label={t('version')} value="1.0.0" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    borderWidth: 1,
  },
});
