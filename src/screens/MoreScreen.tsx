import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen } from '../components/Screen';
import { ListRow } from '../components/ListRow';
import { useTheme } from '../theme/theme';
import { useI18n } from '../i18n/i18n';
import { MoreStackParamList } from '../navigation/MoreStack';

type MoreScreenNavigationProp = NativeStackNavigationProp<MoreStackParamList, 'MoreHome'>;

export function MoreScreen() {
  const { colors, spacing, typography } = useTheme();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MoreScreenNavigationProp>();

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
          {t('moreTitle')}
        </Text>

        <View style={{ gap: spacing.sm }}>
          <ListRow
            title={t('moreAsk')}
            onPress={() => navigation.navigate('Ask')}
            trailing={
              <Text style={[typography.body, { color: colors.textMuted }]}>›</Text>
            }
          />
          <ListRow
            title={t('moreSettings')}
            onPress={() => navigation.navigate('Settings')}
            trailing={
              <Text style={[typography.body, { color: colors.textMuted }]}>›</Text>
            }
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
