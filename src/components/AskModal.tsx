import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/theme';
import { useI18n } from '../i18n/i18n';

interface AskModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AskModal({ visible, onClose }: AskModalProps) {
  const { colors, spacing, typography } = useTheme();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const [inputValue, setInputValue] = useState('');

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.bg }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
              paddingTop: insets.top + spacing.md,
              paddingHorizontal: spacing.lg,
              paddingBottom: spacing.md,
            },
          ]}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerTitles}>
              <Text style={[typography.title, { color: colors.text }]}>
                {t('askTitle')}
              </Text>
              <Text style={[typography.caption, { color: colors.textMuted, marginTop: spacing.xs }]}>
                {t('askSubtitleDemo')}
              </Text>
            </View>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.closeButton,
                {
                  backgroundColor: colors.surface2,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Ionicons name="close" size={20} color={colors.text} />
            </Pressable>
          </View>
        </View>

        {/* Chat area */}
        <ScrollView
          style={styles.chatArea}
          contentContainerStyle={{
            padding: spacing.lg,
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* AI response bubble */}
          <View
            style={[
              styles.bubble,
              styles.aiBubble,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                padding: spacing.md,
                maxWidth: '85%',
              },
            ]}
          >
            <View style={styles.bubbleHeader}>
              <View
                style={[
                  styles.aiIcon,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Ionicons name="sparkles" size={14} color={colors.textOnPrimary} />
              </View>
              <Text style={[typography.caption, { color: colors.textMuted, marginLeft: spacing.sm }]}>
                AI
              </Text>
            </View>
            <Text style={[typography.body, { color: colors.text, marginTop: spacing.sm }]}>
              {t('mockAiAnswer')}
            </Text>
          </View>
        </ScrollView>

        {/* Input area */}
        <View
          style={[
            styles.inputArea,
            {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
              paddingHorizontal: spacing.lg,
              paddingTop: spacing.md,
              paddingBottom: insets.bottom + spacing.md,
            },
          ]}
        >
          <View style={styles.inputRow}>
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
              placeholder={t('askPlaceholder')}
              placeholderTextColor={colors.textMuted}
              value={inputValue}
              onChangeText={setInputValue}
              multiline
              maxLength={500}
            />
            <Pressable
              style={({ pressed }) => [
                styles.sendButton,
                {
                  backgroundColor: colors.border,
                  marginLeft: spacing.sm,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              disabled
            >
              <Ionicons name="send" size={18} color={colors.textMuted} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerTitles: {
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatArea: {
    flex: 1,
  },
  bubble: {
    borderRadius: 16,
    borderWidth: 1,
  },
  aiBubble: {
    alignSelf: 'flex-start',
  },
  bubbleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputArea: {
    borderTopWidth: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
