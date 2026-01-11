import React, { useCallback, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { ListRow } from '../components/ListRow';
import { EmptyState } from '../components/EmptyState';
import { useTheme } from '../theme/theme';
import { useI18n } from '../i18n/i18n';
import { messages } from '../data/mock';
import { Message } from '../data/types';
import { formatRelativeDate } from '../utils/date';

export function MessagesScreen() {
  const { colors, spacing, typography } = useTheme();
  const { t, language } = useI18n();
  const insets = useSafeAreaInsets();

  const renderMessage = useCallback(
    ({ item }: { item: Message }) => (
      <View style={{ marginBottom: spacing.sm }}>
        <ListRow
          title={item.subject}
          subtitle={`${item.sender} · ${formatRelativeDate(item.timestamp, language)}`}
          trailing={
            item.unread ? (
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: colors.primary,
                }}
              />
            ) : null
          }
        />
      </View>
    ),
    [spacing.sm, colors.primary, language]
  );

  const ListHeader = useMemo(
    () => (
      <View style={{ paddingTop: spacing.lg }}>
        <Text style={[typography.title, { color: colors.text, marginBottom: spacing.xl }]}>
          {t('messagesTitle')}
        </Text>
      </View>
    ),
    [colors.text, spacing, typography, t]
  );

  const ListEmpty = useMemo(
    () => <EmptyState message={t('noMessages')} />,
    [t]
  );

  return (
    <Screen>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: insets.bottom + spacing.xl,
        }}
      />
    </Screen>
  );
}
