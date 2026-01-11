import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Screen } from '../components/Screen';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { Badge } from '../components/Badge';
import { EmptyState } from '../components/EmptyState';
import { useTheme } from '../theme/theme';
import { useI18n } from '../i18n/i18n';
import { assignments } from '../data/mock';
import { Comment, Assignment } from '../data/types';
import { formatDeadline, formatCommentTime } from '../utils/date';
import { AssignmentsStackParamList } from '../navigation/AssignmentsStack';

type AssignmentDetailRouteProp = RouteProp<AssignmentsStackParamList, 'AssignmentDetail'>;

interface CommentItemProps {
  comment: Comment;
}

function CommentItem({ comment }: CommentItemProps) {
  const { colors, spacing, typography } = useTheme();
  const { language } = useI18n();

  const isTeacher = comment.authorType === 'teacher';
  const initials = comment.authorName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View
      style={[
        styles.commentItem,
        {
          backgroundColor: isTeacher ? colors.surface2 : colors.surface,
          borderColor: colors.border,
          padding: spacing.md,
          marginBottom: spacing.sm,
        },
      ]}
    >
      <View style={styles.commentHeader}>
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: isTeacher ? colors.primary : colors.textMuted,
            },
          ]}
        >
          <Text style={[styles.avatarText, { color: colors.textOnPrimary }]}>
            {initials}
          </Text>
        </View>
        <View style={styles.commentMeta}>
          <Text style={[typography.bodyBold, { color: colors.text }]}>
            {comment.authorName}
          </Text>
          <Text style={[typography.caption, { color: colors.textMuted }]}>
            {formatCommentTime(comment.createdAt, language)}
          </Text>
        </View>
      </View>
      <Text style={[typography.body, { color: colors.text, marginTop: spacing.sm }]}>
        {comment.message}
      </Text>
    </View>
  );
}

export function AssignmentDetailScreen() {
  const { colors, spacing, typography } = useTheme();
  const { t, language } = useI18n();
  const insets = useSafeAreaInsets();
  const route = useRoute<AssignmentDetailRouteProp>();

  const { assignmentId } = route.params;

  const assignment = useMemo(
    () => assignments.find((a) => a.id === assignmentId),
    [assignmentId]
  );

  const [comments, setComments] = useState<Comment[]>(assignment?.comments || []);
  const [newComment, setNewComment] = useState('');

  const handleSendComment = useCallback(() => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `c-new-${Date.now()}`,
      authorType: 'student',
      authorName: t('you'),
      message: newComment.trim(),
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [...prev, comment]);
    setNewComment('');
  }, [newComment, t]);

  const getStatusBadge = useCallback((a: Assignment) => {
    switch (a.status) {
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

  if (!assignment) {
    return (
      <Screen>
        <EmptyState message={t('error')} />
      </Screen>
    );
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.top}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: spacing.lg,
            paddingBottom: spacing.xl,
          }}
        >
          {/* Summary card */}
          <Card style={{ marginBottom: spacing.xl }}>
            <View style={styles.summaryHeader}>
              {getStatusBadge(assignment)}
            </View>
            <Text style={[typography.title, { color: colors.text, marginTop: spacing.sm }]}>
              {assignment.title}
            </Text>
            {assignment.course && (
              <Text style={[typography.body, { color: colors.textMuted, marginTop: spacing.xs }]}>
                {assignment.course}
              </Text>
            )}
            <View style={[styles.deadlineRow, { marginTop: spacing.md }]}>
              <Text style={[typography.bodyBold, { color: colors.text }]}>
                {t('deadline')}
              </Text>
              <Text style={[typography.body, { color: colors.textMuted, marginLeft: spacing.sm }]}>
                {formatDeadline(assignment.dueAt, language)}
              </Text>
            </View>
          </Card>

          {/* Instructions section */}
          <SectionHeader title={t('instructions')} />
          <Card style={{ marginBottom: spacing.xl }}>
            <Text style={[typography.body, { color: colors.text }]}>
              {assignment.instructions}
            </Text>
          </Card>

          {/* Comments section */}
          <SectionHeader title={t('comments')} />
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          ) : (
            <View style={{ marginBottom: spacing.md }}>
              <EmptyState message={t('noComments')} />
            </View>
          )}
        </ScrollView>

        {/* Comment composer */}
        <View
          style={[
            styles.composer,
            {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
              paddingHorizontal: spacing.md,
              paddingTop: spacing.md,
              paddingBottom: insets.bottom + spacing.md,
            },
          ]}
        >
          <TextInput
            style={[
              styles.input,
              typography.body,
              {
                backgroundColor: colors.bg,
                borderColor: colors.border,
                color: colors.text,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,
              },
            ]}
            placeholder={t('writeCommentPlaceholder')}
            placeholderTextColor={colors.textMuted}
            value={newComment}
            onChangeText={setNewComment}
            multiline
            maxLength={500}
          />
          <Pressable
            onPress={handleSendComment}
            disabled={!newComment.trim()}
            style={({ pressed }) => [
              styles.sendButton,
              {
                backgroundColor: newComment.trim() ? colors.primary : colors.border,
                marginLeft: spacing.sm,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text
              style={[
                typography.bodyBold,
                { color: newComment.trim() ? colors.textOnPrimary : colors.textMuted },
              ]}
            >
              {t('send')}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  summaryHeader: {
    flexDirection: 'row',
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentItem: {
    borderRadius: 12,
    borderWidth: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '600',
  },
  commentMeta: {
    marginLeft: 12,
    flex: 1,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    maxHeight: 100,
  },
  sendButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
