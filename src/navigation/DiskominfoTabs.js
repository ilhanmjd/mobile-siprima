import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme';

// TODO: Import screen real nanti
import VerifierDashboardScreen from '../screens/verifikator/VerifierDashboardScreen';

const Tab = createBottomTabNavigator();

export default function DiskominfoTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.textLight
      }}
    >
      <Tab.Screen
        name="Monitoring"
        component={VerifierDashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="activity" size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}
