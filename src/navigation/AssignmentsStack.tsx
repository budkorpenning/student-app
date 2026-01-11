import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AssignmentsScreen } from '../screens/AssignmentsScreen';
import { AssignmentDetailScreen } from '../screens/AssignmentDetailScreen';

export type AssignmentsStackParamList = {
  AssignmentsList: undefined;
  AssignmentDetail: { assignmentId: string };
};

const Stack = createNativeStackNavigator<AssignmentsStackParamList>();

export function AssignmentsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AssignmentsList" component={AssignmentsScreen} />
      <Stack.Screen name="AssignmentDetail" component={AssignmentDetailScreen} />
    </Stack.Navigator>
  );
}
