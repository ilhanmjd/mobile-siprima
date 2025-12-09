import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Screen from '../../components/Screen';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';

const REQUEST_LINK = 'https://servicedesk.kemenlhk.go.id'; // ganti dengan link aslinya

const RequestScreen = () => {
  const handleOpenLink = async () => {
    const supported = await Linking.canOpenURL(REQUEST_LINK);
    if (supported) {
      await Linking.openURL(REQUEST_LINK);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        {/* Logo & title app sederhana */}
        <View style={styles.header}>
          <View style={styles.logoBox} />
          <Text style={styles.appName}>SIPRIMA</Text>
        </View>

        <Text style={styles.title}>Asset and Risk</Text>
        <Text style={styles.subtitle}>
          Your service request link has been generated
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleOpenLink}>
          <Text style={styles.buttonText}>Generate Link</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9ED3FF', // biru muda seperti figma
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#00C4A7', // placeholder logo hijau
    marginRight: spacing.sm,
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#222',
    marginBottom: spacing.xl * 2,
  },
  button: {
    alignSelf: 'center',
    marginTop: spacing.xl,
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7FB0FF',
  },
});

export default RequestScreen;
