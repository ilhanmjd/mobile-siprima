import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { VerifierSubmissionsProvider } from './src/context/VerifierSubmissionsContext';

export default function App() {
  return (
    <VerifierSubmissionsProvider>
      <StatusBar style="dark" />
      <AppNavigator />
    </VerifierSubmissionsProvider>
  );
}
