import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
import { AssignmentsStackParamList } from '../navigation/AssignmentsStack';

type AssignmentsScreenNavigationProp = NativeStackNavigationProp<
  AssignmentsStackParamList,
  'AssignmentsList'
>;

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
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<AssignmentsScreenNavigationProp>();

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

  const getStatusBadge = useCallback((assignment: Assignment) => {
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
  }, [t]);

  const handleAssignmentPress = useCallback(
    (assignmentId: string) => {
      navigation.navigate('AssignmentDetail', { assignmentId });
    },
    [navigation]
  );

  const renderAssignment = useCallback(
    ({ item }: { item: Assignment }) => (
      <View style={{ marginBottom: spacing.sm }}>
        <ListRow
          title={item.title}
          subtitle={`${item.course || ''} · ${t('duePrefix')} ${formatRelativeDate(item.dueAt, language)}`}
          trailing={getStatusBadge(item)}
          onPress={() => handleAssignmentPress(item.id)}
        />
      </View>
    ),
    [spacing.sm, t, language, getStatusBadge, handleAssignmentPress]
  );

  const ListHeader = useMemo(
    () => (
      <View style={{ paddingTop: spacing.lg }}>
        <Text style={[typography.title, { color: colors.text, marginBottom: spacing.xl }]}>
          {t('assignmentsTitle')}
        </Text>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: spacing.lg }}
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
      </View>
    ),
    [colors, spacing, typography, t, filter]
  );

  const ListEmpty = useMemo(() => <EmptyState message={t('noAssignments')} />, [t]);

  return (
    <Screen>
      <FlatList
        data={filteredAssignments}
        renderItem={renderAssignment}
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
