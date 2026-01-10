import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TodayScreen } from '../screens/TodayScreen';
import { WeekScreen } from '../screens/WeekScreen';
import { AssignmentsScreen } from '../screens/AssignmentsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { useTheme } from '../theme/theme';
import { useI18n } from '../i18n/i18n';

const Tab = createBottomTabNavigator();

interface TabIconProps {
  icon: string;
  focused: boolean;
  color: string;
}

function TabIcon({ icon, focused, color }: TabIconProps) {
  return (
    <View style={styles.iconContainer}>
      <Text style={[styles.icon, { color }]}>{icon}</Text>
    </View>
  );
}

export function RootTabs() {
  const { colors, spacing } = useTheme();
  const { t } = useI18n();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBarBg,
          borderTopColor: colors.tabBarBorder,
          borderTopWidth: 1,
          paddingTop: spacing.xs,
          height: 84,
        },
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Today"
        component={TodayScreen}
        options={{
          tabBarLabel: t('tabToday'),
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon="☀" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Week"
        component={WeekScreen}
        options={{
          tabBarLabel: t('tabWeek'),
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon="📅" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Assignments"
        component={AssignmentsScreen}
        options={{
          tabBarLabel: t('tabAssignments'),
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon="📝" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: t('tabSettings'),
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon="⚙" focused={focused} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
});
