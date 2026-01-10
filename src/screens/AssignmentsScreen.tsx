import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Screen } from '../components/Screen';
import { Chip } from '../components/Chip';
import { ListRow } from '../components/ListRow';
import { Badge } from '../components/Badge';
import { EmptyState } from '../components/EmptyState';
import { useTheme } from '../theme/theme';
import { useI18n } from '../i18n/i18n';
import { assignments } from '../data/mock';
import { Assignment, AssignmentStatus } from '../data/types';
import { formatRelativeDate } from '../utils/date';
import { StringKey } from '../i18n/strings';

type FilterType = 'all' | AssignmentStatus;

interface FilterOption {
  key: FilterType;
  labelKey: StringKey;
}

const FILTERS: FilterOption[] = [
  { key: 'all', labelKey: 'filterAll' },
  { key: 'open', labelKey: 'filterOpen' },
  { key: 'overdue', labelKey: 'filterOverdue' },
  { key: 'completed', labelKey: 'filterCompleted' },
];

export function AssignmentsScreen() {
  const { colors, spacing, typography } = useTheme();
  const { t, language } = useI18n();

  const [filter, setFilter] = useState<FilterType>('all');

  const filteredAssignments = useMemo(() => {
    const sorted = [...assignments].sort(
      (a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime()
    );

    if (filter === 'all') {
      return sorted;
    }

    return sorted.filter((a) => a.status === filter);
  }, [filter]);

  const getStatusBadge = (assignment: Assignment) => {
    switch (assignment.status) {
      case 'overdue':
        return <Badge label={t('statusOverdue')} variant="danger" />;
      case 'completed':
        return <Badge label={t('statusCompleted')} variant="success" />;
      case 'open':
        return <Badge label={t('statusOpen')} variant="default" />;
      default:
        return null;
    }
  };

  const renderAssignment = ({ item }: { item: Assignment }) => (
    <View style={{ marginBottom: spacing.sm }}>
      <ListRow
        title={item.title}
        subtitle={`${item.course || ''} · ${t('duePrefix')} ${formatRelativeDate(item.dueAt, language)}`}
        trailing={getStatusBadge(item)}
      />
    </View>
  );

  return (
    <Screen>
      <Text style={[typography.title, { color: colors.text, marginBottom: spacing.xl }]}>
        {t('assignmentsTitle')}
      </Text>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: spacing.lg, flexGrow: 0 }}
        contentContainerStyle={styles.chipContainer}
      >
        {FILTERS.map((filterOption) => (
          <View key={filterOption.key} style={{ marginRight: spacing.sm }}>
            <Chip
              label={t(filterOption.labelKey)}
              selected={filter === filterOption.key}
              onPress={() => setFilter(filterOption.key)}
            />
          </View>
        ))}
      </ScrollView>

      {/* Assignments list */}
      {filteredAssignments.length > 0 ? (
        <FlatList
          data={filteredAssignments}
          renderItem={renderAssignment}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState message={t('noAssignments')} />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    paddingRight: 16,
  },
});
