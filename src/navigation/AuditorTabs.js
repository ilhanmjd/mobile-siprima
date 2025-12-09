import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme';

// TODO: Import screen real nanti
import RiskReportScreen from '../screens/dinas/RiskReportScreen';

const Tab = createBottomTabNavigator();

export default function AuditorTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight
      }}
    >
      <Tab.Screen
        name="Audit Report"
        component={RiskReportScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="file-text" size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}
