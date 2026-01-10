import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
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
import { formatTimeRange, formatRelativeDate, isPast } from '../utils/date';

export function TodayScreen() {
  const { colors, spacing, typography } = useTheme();
  const { t, language } = useI18n();

  const now = new Date();

  const { nextLesson, laterLessons } = useMemo(() => {
    const upcoming = todayLessons
      .filter((lesson) => new Date(lesson.end) > now && lesson.status !== 'cancelled')
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

  const getLessonStatusBadge = (lesson: Lesson) => {
    if (lesson.status === 'changed') {
      return <Badge label={t('lessonChanged')} variant="warning" />;
    }
    if (lesson.status === 'cancelled') {
      return <Badge label={t('lessonCancelled')} variant="danger" />;
    }
    return null;
  };

  const getAssignmentBadge = (assignment: Assignment) => {
    if (assignment.status === 'overdue') {
      return <Badge label={t('statusOverdue')} variant="danger" />;
    }
    return null;
  };

  const renderLaterLesson = ({ item }: { item: Lesson }) => (
    <View style={{ marginBottom: spacing.sm }}>
      <ListRow
        title={item.title}
        subtitle={`${formatTimeRange(item.start, item.end)}${item.location ? ` · ${item.location}` : ''}`}
        trailing={getLessonStatusBadge(item)}
      />
    </View>
  );

  const renderAssignment = ({ item }: { item: Assignment }) => (
    <View style={{ marginBottom: spacing.sm }}>
      <ListRow
        title={item.title}
        subtitle={`${item.course || ''} · ${t('duePrefix')} ${formatRelativeDate(item.dueAt, language)}`}
        trailing={getAssignmentBadge(item)}
      />
    </View>
  );

  return (
    <Screen scroll>
      <Text style={[typography.title, { color: colors.text, marginBottom: spacing.xl }]}>
        {t('todayTitle')}
      </Text>

      {/* Next up hero */}
      <SectionHeader title={t('nextUp')} />
      {nextLesson ? (
        <Card variant="hero" style={{ marginBottom: spacing.xl }}>
          <View style={styles.heroContent}>
            {nextLesson.status === 'changed' && (
              <Badge label={t('lessonChanged')} variant="warning" />
            )}
            <Text style={[typography.title, styles.heroTitle]}>
              {nextLesson.title}
            </Text>
            <Text style={[typography.body, styles.heroSubtitle]}>
              {formatTimeRange(nextLesson.start, nextLesson.end)}
            </Text>
            {nextLesson.location && (
              <Text style={[typography.caption, styles.heroMeta]}>
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

      {/* Later today */}
      <SectionHeader title={t('laterToday')} />
      {laterLessons.length > 0 ? (
        <FlatList
          data={laterLessons}
          renderItem={renderLaterLesson}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          style={{ marginBottom: spacing.lg }}
        />
      ) : (
        <View style={{ marginBottom: spacing.xl }}>
          <EmptyState message={t('noLessonsToday')} />
        </View>
      )}

      {/* Due soon */}
      <SectionHeader title={t('dueSoon')} />
      {dueSoonAssignments.length > 0 ? (
        <FlatList
          data={dueSoonAssignments}
          renderItem={renderAssignment}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      ) : (
        <EmptyState message={t('noUpcomingAssignments')} />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroContent: {
    gap: 4,
  },
  heroTitle: {
    color: '#FFFFFF',
    marginTop: 4,
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  heroMeta: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
