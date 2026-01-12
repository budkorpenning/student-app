import React, { useMemo, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { ListRow } from '../components/ListRow';
import { Badge } from '../components/Badge';
import { EmptyState } from '../components/EmptyState';
import { useTheme } from '../theme/theme';
import { useI18n } from '../i18n/i18n';
import { todayLessons, assignments } from '../data/mock';
import { Lesson, Assignment } from '../data/types';
import { formatTimeRange, formatRelativeDate } from '../utils/date';

export function TodayScreen() {
  const { colors, spacing, typography } = useTheme();
  const { t, language } = useI18n();
  const insets = useSafeAreaInsets();

  const now = new Date();

  const { nextLesson, laterLessons } = useMemo(() => {
    const upcoming = todayLessons
      .filter((lesson) => new Date(lesson.end) > now)
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

    return {
      nextLesson: upcoming[0] || null,
      laterLessons: upcoming.slice(1),
    };
  }, []);

  const dueSoonAssignments = useMemo(() => {
    return assignments
      .filter((a) => a.status !== 'completed')
      .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())
      .slice(0, 3);
  }, []);

  const getAssignmentBadge = useCallback((assignment: Assignment) => {
    if (assignment.status === 'overdue') {
      return <Badge label={t('statusOverdue')} variant="danger" />;
    }
    return null;
  }, [t]);

  const renderLaterLesson = useCallback(({ item }: { item: Lesson }) => (
    <View style={{ marginBottom: spacing.sm }}>
      <ListRow
        title={item.title}
        subtitle={`${formatTimeRange(item.start, item.end)}${item.location ? ` · ${item.location}` : ''}`}
      />
    </View>
  ), [spacing.sm]);

  const ListHeader = useMemo(() => (
    <View style={{ paddingTop: spacing.lg }}>
      {/* Screen title */}
      <Text style={[typography.title, { color: colors.text, marginBottom: spacing.xl }]}>
        {t('todayTitle')}
      </Text>

      {/* Next up hero */}
      <SectionHeader title={t('nextUp')} />
      {nextLesson ? (
        <Card variant="hero" style={{ marginBottom: spacing.xl }}>
          <View style={styles.heroContent}>
            <Text style={[typography.title, { color: colors.textOnPrimary, marginTop: 4 }]}>
              {nextLesson.title}
            </Text>
            <Text style={[typography.body, { color: colors.textOnPrimaryMuted }]}>
              {formatTimeRange(nextLesson.start, nextLesson.end)}
            </Text>
            {nextLesson.location && (
              <Text style={[typography.caption, { color: colors.textOnPrimaryDim }]}>
                {nextLesson.location}
                {nextLesson.teacher && ` · ${nextLesson.teacher}`}
              </Text>
            )}
          </View>
        </Card>
      ) : (
        <Card style={{ marginBottom: spacing.xl }}>
          <EmptyState message={t('allDoneForToday')} />
        </Card>
      )}

      {/* Later today section header */}
      <SectionHeader title={t('laterToday')} />
      {laterLessons.length === 0 && (
        <View style={{ marginBottom: spacing.xl }}>
          <EmptyState message={t('noLessonsToday')} />
        </View>
      )}
    </View>
  ), [colors, spacing, typography, t, nextLesson, laterLessons.length]);

  const ListFooter = useMemo(() => (
    <View style={{ paddingBottom: insets.bottom + spacing.xl }}>
      {/* Spacer if there were lessons */}
      {laterLessons.length > 0 && <View style={{ height: spacing.lg }} />}

      {/* Due soon section */}
      <SectionHeader title={t('dueSoon')} />
      {dueSoonAssignments.length > 0 ? (
        dueSoonAssignments.map((assignment) => (
          <View key={assignment.id} style={{ marginBottom: spacing.sm }}>
            <ListRow
              title={assignment.title}
              subtitle={`${assignment.course || ''} · ${t('duePrefix')} ${formatRelativeDate(assignment.dueAt, language)}`}
              trailing={getAssignmentBadge(assignment)}
            />
          </View>
        ))
      ) : (
        <EmptyState message={t('noUpcomingAssignments')} />
      )}
    </View>
  ), [spacing, insets.bottom, t, language, dueSoonAssignments, laterLessons.length, getAssignmentBadge]);

  return (
    <Screen>
      <FlatList
        data={laterLessons}
        renderItem={renderLaterLesson}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroContent: {
    gap: 4,
  },
});
