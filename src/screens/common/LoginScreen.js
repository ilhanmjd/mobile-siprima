import React, { useState } from 'react';
import { Text, ImageBackground, StyleSheet, Alert } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import FormField from '../../components/FormField';
import ActionButton from '../../components/ActionButton';
import { colors } from '../../theme';
// import api from '../../utils/axios'; // removed karena pakai dummy
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// Komponen layar login
const LoginScreen = () => {
  const navigation = useNavigation(); // akses navigator untuk redirect setelah login
  const [email, setEmail] = useState(''); // simpan nilai email input
  const [password, setPassword] = useState(''); // simpan nilai password input
  const [passwordVisible, setPasswordVisible] = useState(false); // toggle visibilitas password

  // Fungsi dipanggil saat tombol Login ditekan
  const handleLogin = async () => {
    // TANPA VALIDASI: langsung pakai dummy response untuk preview UI
    try {
      // Dummy response: ubah role/name/token jika perlu untuk cek routing/tampilan berbeda
      const res = {
        data: {
          token: 'dummy-token-123456',
          user: {
            name: 'Demo User',
            role: 'auditor', // coba ganti ke 'verifikator_dinas' | 'diskominfo' | 'auditor'
          },
        },
      };

      // Simulasi delay singkat (opsional, untuk lihat loading jika Anda tambahkan)
      await new Promise((r) => setTimeout(r, 300));

      // Simpan token & role di AsyncStorage seperti perilaku nyata
      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('role', res.data.user.role);

      // Notifikasi sukses
      Alert.alert('Sukses', `Selamat datang, ${res.data.user?.name}`);

      // Redirect berdasarkan role (sama seperti implementasi nyata)
      switch (res.data.user.role) {
        case 'user_dinas':
          navigation.replace('DinasTabs');
          break;
        case 'verifikator_dinas':
          navigation.replace('VerifierTabs');
          break;
        case 'diskominfo':
          navigation.replace('DiskominfoTabs');
          break;
        case 'auditor':
          navigation.replace('AuditorTabs');
          break;
        default:
          Alert.alert('Error', 'Role tidak dikenali');
      }
    } catch (error) {
      console.log('DUMMY LOGIN ERROR:', error);
      Alert.alert('Login gagal', 'Terjadi kesalahan saat proses login dummy');
    }
  };

  return (
    <Screen>
      {/* Header dengan background image */}
      <ImageBackground
        source={require('../../../assets/login-bg.png')}
        style={styles.header}
        resizeMode="cover"
        imageStyle={{ borderRadius: 32 }}
      >
        <Text style={styles.logo}>SIPRIMA</Text>
      </ImageBackground>

      <SectionCard title="Login">
        {/* Field email */}
        <FormField
          label="E-mail Address"
          placeholder="test@123.com"
          value={email}
          onChangeText={setEmail}
        />

        {/* Field password */}
        <FormField
          label="Password"
          placeholder="******"
          value={password}
          onChangeText={setPassword}
          inputProps={{ secureTextEntry: true }}
        />

        {/* Tombol login -> memicu handleLogin (tanpa validasi, pakai dummy) */}
        <ActionButton label="Login" onPress={handleLogin} />
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
