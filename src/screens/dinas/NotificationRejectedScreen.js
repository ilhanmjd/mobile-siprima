import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';

const NotificationRejectedScreen = ({ route }) => {
  const navigation = useNavigation();

  const {
    asset = 'Asset',
    kategori = 'Aset TI',
    code = '5000',
    pic = 'Davin',
    condition = 'Baik',
    description = 'Aset Pengadaan 2025',
    dateTime = '10/10/2025 - 17:03:34 PM',
    mode = 'ASSET',          // 'ASSET' | 'RISK'
    riskId = null,
  } = route?.params || {};

  const handlePrimaryAction = () => {
    if (mode === 'RISK') {
      // Re-input Risiko
      navigation.navigate('Asset', {
        screen: 'RiskWizard',
        params: {
          fromRejected: true,
          riskId,
          initialData: {
            judulRisiko: asset,
            deskripsi: description,
            // tambah field lain kalau mau prefill
          },
        },
      });
    } else {
      // Default lama: re-input Asset
      navigation.navigate('Asset', {
        screen: 'AssetWizard',
        params: {
          fromRejected: true,
          initialData: {
            kategori,
            subKategori: '',
            nama: asset,
            deskripsi: description,
            tanggalPerolehan: '',
            nilaiPerolehan: '',
            kondisi: condition,
            lampiran: null,
            penanggungJawab: pic,
            lokasi: '',
            status: 'Active',
          },
        },
      });
    }
  };

  const buttonLabel = mode === 'RISK' ? 'Input Risiko' : 'Input Aset';

  return (
    <Screen>
      <SectionCard>
        <ScrollView contentContainerStyle={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{asset}</Text>
            <Text style={styles.headerSubtitle}>{dateTime}</Text>
          </View>

          {/* BODY */}
          <View style={styles.body}>
            <Text style={styles.row}>Kategori         : {kategori}</Text>
            <Text style={styles.row}>Nama Asset       : {asset}</Text>
            <Text style={styles.row}>Kode Asset       : {code}</Text>
            <Text style={styles.row}>Person in Charge : {pic}</Text>
            <Text style={[styles.row, styles.rowRed]}>
              Status Pengajuan : DITOLAK
            </Text>
            <Text style={styles.row}>Kondisi Asset    : {condition}</Text>
            <Text style={styles.row}>Deskripsi Asset  : {description}</Text>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Pressable style={styles.primaryButton} onPress={handlePrimaryAction}>
              <Text style={styles.primaryText}>{buttonLabel}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SectionCard>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.lg,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 8,
    backgroundColor: '#6F8FAF',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  body: {
    marginTop: spacing.lg,
  },
  row: {
    fontSize: 14,
    marginBottom: 4,
  },
  rowRed: {
    color: 'red',
    fontWeight: '700',
  },
  footer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#aa1515ff',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  primaryText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default NotificationRejectedScreen;
