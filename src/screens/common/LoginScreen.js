import React, { useState } from 'react';
import { Text, ImageBackground, StyleSheet, Alert } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import FormField from '../../components/FormField';
import ActionButton from '../../components/ActionButton';
import { colors } from '../../theme';
import api from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../config/api';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // mapping role backend -> navigator app
  const mapBackendRoleToAppRoute = (backendRole) => {
    switch (backendRole) {
      case 'staff':
        return 'DinasTabs';
      case 'kepala_seksi':
        return 'VerifierTabs';
      case 'admin_kota':
        return 'DiskominfoTabs';
      case 'auditor_kota':
        return 'AuditorTabs';
      default:
        return null;
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validasi', 'Email dan password wajib diisi');
      return;
    }

    try {
      setLoading(true);
      console.log('LOGIN REQ:', BASE_URL);

      const res = await api.post('/api/login', {
        email,
        password,
      });

      const success = res?.data?.success;
      const data = res?.data?.data;
      const token = data?.access_token;
      const user = data?.user;

      console.log('user RES:', data);

      if (!success || !token || !user) {
        throw new Error('Respon login tidak lengkap');
      }

      // simpan token & user
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('role', user?.role?.name || '');

      const targetRoute = mapBackendRoleToAppRoute(user?.role?.name);

      if (!targetRoute) {
        Alert.alert('Error', `Role tidak dikenali: ${user?.role?.name}`);
        return;
      }

      Alert.alert('Sukses', `Selamat datang, ${user.name}`);

      navigation.replace(targetRoute);
    } catch (err) {
      console.log('LOGIN ERROR:', err?.response?.data || err.message);
      const msg =
        err?.response?.data?.message ||
        'Email / password salah atau server bermasalah';
      Alert.alert('Login gagal', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <ImageBackground
        source={require('../../../assets/login-bg.png')}
        style={styles.header}
        resizeMode="cover"
        imageStyle={{ borderRadius: 32 }}
      >
        <Text style={styles.logo}>SIPRIMA</Text>
      </ImageBackground>

      <SectionCard title="Login">
        <FormField
          label="E-mail Address"
          placeholder="test@123.com"
          value={email}
          onChangeText={setEmail}
        />

        <FormField
          label="Password"
          placeholder="******"
          value={password}
          onChangeText={setPassword}
          inputProps={{ secureTextEntry: true }}
        />

        <ActionButton
          label={loading ? 'Loading...' : 'Login'}
          onPress={handleLogin}
          disabled={loading}
        />
      </SectionCard>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 220,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  logo: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
  },
});

export default LoginScreen;
