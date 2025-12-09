import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import ActionButton from '../../components/ActionButton';
import { colors, spacing } from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  // Pindahin ke DALAM sini, bukan DI LUAR
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('role');
    navigation.replace('Login');
  };

  return (
    <Screen>
      <SectionCard title="User Dinas">
        <View style={styles.header}>
          <Image source={require('../../../assets/avatar.png')} style={styles.avatar} />
          <View>
            <Text style={styles.name}>Rifqi Mahendra</Text>
            <Text style={styles.meta}>Dinas Kominfo</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>dinas@siprima.id</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>Administrator Aset</Text>
        </View>
        <ActionButton label="Keluar" variant="danger" onPress={handleLogout} />
      </SectionCard>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 24,
    backgroundColor: colors.surfaceAlt,
  },
  name: {
    fontWeight: '700',
    color: colors.text,
    fontSize: 18,
  },
  meta: {
    color: colors.textMuted,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  label: {
    color: colors.textMuted,
  },
  value: {
    color: colors.text,
    fontWeight: '600',
  },
});

export default ProfileScreen;
