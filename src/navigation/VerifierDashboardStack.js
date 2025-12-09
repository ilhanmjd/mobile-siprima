import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VerifierDashboardScreen from '../screens/verifikator/VerifierDashboardScreen';
import VerifierRiskReviewScreen from '../screens/verifikator/VerifierRiskReviewScreen';

const Stack = createNativeStackNavigator();

export default function VerifierDashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VerifierDashboard" component={VerifierDashboardScreen} />
      <Stack.Screen name="RiskReview" component={VerifierRiskReviewScreen} />
    </Stack.Navigator>
  );
}
