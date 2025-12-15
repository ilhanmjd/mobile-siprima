import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

// Screens
import AuthLoadingScreen from '../screens/common/AuthLoadingScreen';
import LoginScreen from '../screens/common/LoginScreen';

// DINAS Screens
import DinasDashboardScreen from '../screens/dinas/DinasDashboardScreen';
import NotificationsScreen from '../screens/dinas/NotificationsScreen';
import FaqScreen from '../screens/dinas/FaqScreen';
import ProfileScreen from '../screens/dinas/ProfileScreen';
import MaintenanceScheduleScreen from '../screens/dinas/MaintenanceScheduleScreen';
import AssetWizardScreen from '../screens/dinas/AssetWizardScreen';
import MaintenanceInputScreen from '../screens/dinas/MaintenanceInputScreen';
import AssetDeletionScreen from '../screens/dinas/AssetDeletionScreen';
import RiskWizardScreen from '../screens/dinas/RiskWizardScreen';
import RiskTreatmentWizardScreen from '../screens/dinas/RiskTreatmentWizardScreen';
import AssetNotesScreen from '../screens/dinas/AssetNotesScreen';
import RiskReportScreen from '../screens/dinas/RiskReportScreen';
import AssetHubScreen from '../screens/dinas/AssetHubScreen';
import NotificationDetailScreen from '../screens/dinas/NotificationDetailScreen';
import NotificationRejectedScreen from '../screens/dinas/NotificationRejectedScreen';
import LaporanScreen from '../screens/dinas/LaporanScreen';
import QrScannerScreen from '../screens/dinas/QrScannerScreen';
import RequestScreen from '../screens/dinas/RequestScreen';
// VERIFIKATOR Screens
import VerifierDashboardStack from './VerifierDashboardStack';
import VerifierVerificationScreen from '../screens/verifikator/VerifierVerificationScreen';
import VerifierNotificationsScreen from '../screens/verifikator/VerifierNotificationsScreen';
import VerifierProfileScreen from '../screens/verifikator/VerifierProfileScreen';
import VerifierSubmissionDetailScreen from '../screens/verifikator/VerifierSubmissionDetailScreen';
// DISKOMINFO Screens
import DiskominfoDashboardScreen from '../screens/diskominfo/DiskominfoDashboardScreen';
import DiskominfoProfileScreen from '../screens/diskominfo/DiskominfoProfileScreen';
// AUDITOR Screens
import AuditorDashboardScreen from '../screens/auditor/AuditorDashboardScreen';
import AuditorProfileScreen from '../screens/auditor/AuditorProfileScreen';
// Tema
import { colors } from '../theme';

const RootStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* ========= DINAS DASHBOARD STACK ========= */
const DinasDashboardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DinasMain" component={DinasDashboardScreen} />
    <Stack.Screen name="MaintenanceSchedule" component={MaintenanceScheduleScreen} />
    <Stack.Screen name="AssetWizard" component={AssetWizardScreen} />
    <Stack.Screen name="MaintenanceInput" component={MaintenanceInputScreen} />
    <Stack.Screen name="AssetDeletion" component={AssetDeletionScreen} />
    <Stack.Screen name="AssetNotes" component={AssetNotesScreen} />
    <Stack.Screen name="RiskReport" component={RiskReportScreen} />
    <Stack.Screen name="Laporan" component={LaporanScreen} />
    <Stack.Screen name="QrScanner" component={QrScannerScreen} />
    <Stack.Screen name="Request" component={RequestScreen} />
  </Stack.Navigator>
);

/* ========= DINAS ASSET STACK ========= */
const DinasAssetStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AssetHub" component={AssetHubScreen} />
    <Stack.Screen name="AssetWizard" component={AssetWizardScreen} />
    <Stack.Screen name="RiskWizard" component={RiskWizardScreen} />
    <Stack.Screen name="RiskTreatmentWizard" component={RiskTreatmentWizardScreen} />
    <Stack.Screen name="MaintenanceInput" component={MaintenanceInputScreen} />
    <Stack.Screen name="AssetDeletion" component={AssetDeletionScreen} />
    <Stack.Screen name="AssetNotes" component={AssetNotesScreen} />
    <Stack.Screen name="MaintenanceSchedule" component={MaintenanceScheduleScreen} />
    <Stack.Screen name="RiskReport" component={RiskReportScreen} />
  </Stack.Navigator>
);

/* ========= DINAS NOTIFICATIONS STACK ========= */
const DinasNotificationsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="NotificationsMain" component={NotificationsScreen} />
    <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} />
    <Stack.Screen name="NotificationRejected" component={NotificationRejectedScreen}/>
  </Stack.Navigator>
);

/* ========= TAB DINAS ========= */
const DinasTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textLight,
      tabBarStyle: { height: 70, paddingBottom: 10, paddingTop: 10 },
      tabBarIcon: ({ color, size }) => {
        const icons = {
          Dashboard: 'home',
          Notifications: 'bell',
          Asset: 'calendar',
          FAQ: 'help-circle',
          Profile: 'user',
        };
        return <Feather name={icons[route.name]} size={size} color={color} />;
      },
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color, fontWeight: focused ? '600' : '400', fontSize: 12 }}>
          {route.name}
        </Text>
      ),
    })}
  >
    <Tab.Screen name="Dashboard" component={DinasDashboardStack} />
    <Tab.Screen name="Notifications" component={DinasNotificationsStack} />
    <Tab.Screen name="Asset" component={DinasAssetStack} />
    <Tab.Screen name="FAQ" component={FaqScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

/* ========= TAB VERIFIKATOR ========= */
const VerifierVerificationStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="VerifierVerificationMain"
      component={VerifierVerificationScreen}
    />
    <Stack.Screen
      name="VerifierSubmissionDetail"
      component={VerifierSubmissionDetailScreen}
    />
  </Stack.Navigator>
);

const VerifierTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.secondary,
      tabBarInactiveTintColor: colors.textLight,
      tabBarStyle: { height: 70, paddingBottom: 10, paddingTop: 10 },
      tabBarIcon: ({ color, size }) => {
        const iconMap = {
          Beranda: 'activity',
          Verification: 'check-circle',
          Notifikasi: 'bell',
          Profil: 'user',
        };
        return <Feather name={iconMap[route.name]} size={size} color={color} />;
      },
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color, fontWeight: focused ? '600' : '400', fontSize: 12 }}>
          {route.name}
        </Text>
      ),
    })}
  >
    <Tab.Screen name="Beranda" component={VerifierDashboardStack} />
    <Tab.Screen
      name="Verification"
      component={VerifierVerificationStack}
    />
    <Tab.Screen name="Notifikasi" component={VerifierNotificationsScreen} />
    <Tab.Screen name="Profil" component={VerifierProfileScreen} />
  </Tab.Navigator>
);

/* ======== TAB DISKOMINFO ========= */
const DiskominfoStack = createNativeStackNavigator();

const DiskominfoDashboardStack = () => (
  <DiskominfoStack.Navigator screenOptions={{ headerShown: false }}>
    <DiskominfoStack.Screen
      name="DiskominfoDashboardMain"
      component={DiskominfoDashboardScreen}
    />
    {/* nanti: DiskominfoAssetDeletionVerificationScreen, dll */}
  </DiskominfoStack.Navigator>
);

const DiskominfoTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textLight,
      tabBarStyle: { height: 70, paddingBottom: 10, paddingTop: 10 },
      tabBarIcon: ({ color, size }) => {
        const iconMap = {
          DiskominfoDashboard: 'home',
          Profil: 'user',
        };
        return <Feather name={iconMap[route.name]} size={size} color={color} />;
      },
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color, fontWeight: focused ? '600' : '400', fontSize: 12 }}>
          {route.name}
        </Text>
      ),
    })}
  >
    <Tab.Screen name="DiskominfoDashboard" component={DiskominfoDashboardStack}/>
    <Tab.Screen name="Profil" component={DiskominfoProfileScreen} />
  </Tab.Navigator>
);

/* ======== TAB AUDITOR ========= */
const AuditorStack = createNativeStackNavigator();

const AuditorDashboardStack = () => (
  <AuditorStack.Navigator screenOptions={{ headerShown: false }}>
    <AuditorStack.Screen
      name="AuditorDashboardMain"
      component={AuditorDashboardScreen}
    />
    {/* nanti: AuditorDetailScreen, dll */}
  </AuditorStack.Navigator>
);

const AuditorTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textLight,
      tabBarStyle: { height: 70, paddingBottom: 10, paddingTop: 10 },
      tabBarIcon: ({ color, size }) => {
        const iconMap = {
          AuditorDashboard: 'home',
          Profil: 'user',
        };
        return <Feather name={iconMap[route.name]} size={size} color={color} />;
},
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color, fontWeight: focused ? '600' : '400', fontSize: 12 }}>
          {route.name}
        </Text>
      ),
    })}
  >
    <Tab.Screen name="AuditorDashboard" component={AuditorDashboardStack}/>
    <Tab.Screen name="Profil" component={AuditorProfileScreen} />
  </Tab.Navigator>
);
/* ========= ROOT ========= */
const AppNavigator = () => (
  <NavigationContainer>
    <RootStack.Navigator initialRouteName="AuthLoading" screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="AuthLoading" component={AuthLoadingScreen} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="DinasTabs" component={DinasTabs} />
      <RootStack.Screen name="VerifierTabs" component={VerifierTabs} />
      <RootStack.Screen name="DiskominfoTabs" component={DiskominfoTabs} />
      <RootStack.Screen name="AuditorTabs" component={AuditorTabs} />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
