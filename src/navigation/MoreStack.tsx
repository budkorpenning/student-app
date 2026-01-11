import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MoreScreen } from '../screens/MoreScreen';
import { AskScreen } from '../screens/AskScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

export type MoreStackParamList = {
  MoreHome: undefined;
  Ask: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<MoreStackParamList>();

export function MoreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MoreHome" component={MoreScreen} />
      <Stack.Screen name="Ask" component={AskScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
