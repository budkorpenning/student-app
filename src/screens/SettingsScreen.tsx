import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { useTheme, useThemeMode, ThemeMode } from '../theme/theme';
import { useI18n } from '../i18n/i18n';
import { Language } from '../i18n/strings';

interface SettingsOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

function SettingsOption({ label, selected, onPress }: SettingsOptionProps) {
  const { colors, spacing, typography } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        {
          backgroundColor: colors.surface,
          borderColor: selected ? colors.primary : colors.border,
          borderWidth: selected ? 2 : 1,
          padding: spacing.lg,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Text style={[typography.body, { color: colors.text }]}>{label}</Text>
      {selected && (
        <View style={[styles.checkmark, { backgroundColor: colors.primary }]}>
          <Text style={[styles.checkmarkText, { color: colors.textOnPrimary }]}>✓</Text>
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

interface LanguageOptionData {
  label: string;
  value: Language;
}

interface ThemeOptionData {
  label: string;
  value: ThemeMode;
}

export function SettingsScreen() {
  const { colors, spacing, typography } = useTheme();
  const { mode, setMode } = useThemeMode();
  const { t, language, setLanguage } = useI18n();
  const insets = useSafeAreaInsets();

  const languageOptions: LanguageOptionData[] = [
    { label: t('languageSwedish'), value: 'sv' },
    { label: t('languageEnglish'), value: 'en' },
  ];

  const themeOptions: ThemeOptionData[] = [
    { label: t('themeSystem'), value: 'system' },
    { label: t('themeLight'), value: 'light' },
    { label: t('themeDark'), value: 'dark' },
  ];

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
          {t('settingsTitle')}
        </Text>

        {/* Theme section */}
        <SectionHeader title={t('theme')} />
        <View style={{ marginBottom: spacing.xl }}>
          {themeOptions.map((option, index) => (
            <React.Fragment key={option.value}>
              {index > 0 && <View style={{ height: spacing.sm }} />}
              <SettingsOption
                label={option.label}
                selected={mode === option.value}
                onPress={() => setMode(option.value)}
              />
            </React.Fragment>
          ))}
        </View>

        {/* Language section */}
        <SectionHeader title={t('language')} />
        <View style={{ marginBottom: spacing.xl }}>
          {languageOptions.map((option, index) => (
            <React.Fragment key={option.value}>
              {index > 0 && <View style={{ height: spacing.sm }} />}
              <SettingsOption
                label={option.label}
                selected={language === option.value}
                onPress={() => setLanguage(option.value)}
              />
            </React.Fragment>
          ))}
        </View>

        {/* About section */}
        <SectionHeader title={t('about')} />
        <SettingsRow label={t('version')} value="1.0.0" />
      </ScrollView>
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
