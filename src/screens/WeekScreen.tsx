import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { Chip } from '../components/Chip';
import { ListRow } from '../components/ListRow';
import { Badge } from '../components/Badge';
import { EmptyState } from '../components/EmptyState';
import { useTheme } from '../theme/theme';
import { useI18n } from '../i18n/i18n';
import { weekLessons } from '../data/mock';
import { Lesson } from '../data/types';
import { formatTimeRange, getDayOfWeek } from '../utils/date';
import { StringKey } from '../i18n/strings';

const DAY_KEYS: StringKey[] = ['mon', 'tue', 'wed', 'thu', 'fri'];

export function WeekScreen() {
  const { colors, spacing, typography } = useTheme();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();

  const today = getDayOfWeek(new Date());
  const initialDay = today >= 1 && today <= 5 ? today : 1;
  const [selectedDay, setSelectedDay] = useState(initialDay);

  const lessons = useMemo(() => {
    return weekLessons[selectedDay] || [];
  }, [selectedDay]);

  const getLessonStatusBadge = useCallback((lesson: Lesson) => {
    if (lesson.status === 'changed') {
      return <Badge label={t('lessonChanged')} variant="warning" />;
    }
    if (lesson.status === 'cancelled') {
      return <Badge label={t('lessonCancelled')} variant="danger" />;
    }
    return null;
  }, [t]);

  const renderLesson = useCallback(({ item }: { item: Lesson }) => (
    <View style={{ marginBottom: spacing.sm }}>
      <ListRow
        title={item.title}
        subtitle={`${formatTimeRange(item.start, item.end)}${item.location ? ` · ${item.location}` : ''}`}
        trailing={getLessonStatusBadge(item)}
      />
    </View>
  ), [spacing.sm, getLessonStatusBadge]);

  const ListHeader = useMemo(() => (
    <View style={{ paddingTop: spacing.lg }}>
      <Text style={[typography.title, { color: colors.text, marginBottom: spacing.xl }]}>
        {t('weekTitle')}
      </Text>

      {/* Day picker */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: spacing.lg }}
        contentContainerStyle={styles.chipContainer}
      >
        {DAY_KEYS.map((key, index) => {
          const dayNumber = index + 1;
          return (
            <View key={key} style={{ marginRight: spacing.sm }}>
              <Chip
                label={t(key)}
                selected={selectedDay === dayNumber}
                onPress={() => setSelectedDay(dayNumber)}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  ), [colors, spacing, typography, t, selectedDay]);

  const ListEmpty = useMemo(() => (
    <EmptyState message={t('noLessonsThisDay')} />
  ), [t]);

  return (
    <Screen>
      <FlatList
        data={lessons}
        renderItem={renderLesson}
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

const styles = StyleSheet.create({
  chipContainer: {
    paddingRight: 16,
  },
});
