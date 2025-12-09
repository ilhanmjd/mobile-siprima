import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import ActionButton from '../../components/ActionButton';
import { useNavigation } from '@react-navigation/native';

const NotificationDetailScreen = ({ route }) => {
  const navigation = useNavigation();

  const {
    asset = 'Asset',
    category = 'Aset TI',
    code = '5000',
    pic = 'Davin',
    condition = 'Baik',
    description = 'Aset Pengadaan 2025',
    dateTime = '10/10/2025 - 17:03:34 PM',
    mode = 'DEFAULT',      // 'RISK_TREATMENT' | 'REINPUT_RISK' | 'DEFAULT'
    riskId = null,         // kalau nanti mau kirim id risk
  } = route?.params || {};

  // Tentukan judul footer & label tombol berdasarkan mode
  let buttonLabel = 'Buka Form';
  let onPressPrimary = () => {};

  if (mode === 'RISK_TREATMENT') {
    buttonLabel = 'Risk Treatment';
    onPressPrimary = () => {
      navigation.navigate('Asset', {
        screen: 'RiskTreatmentWizard',
        params: { riskId },
      });
    };
  } else if (mode === 'REINPUT_RISK') {
    buttonLabel = 'Input Risiko';
    onPressPrimary = () => {
      navigation.navigate('Asset', {
        screen: 'RiskWizard',
        params: {
          initialData: {
            judulRisiko: asset,
            deskripsi: description,
            // tambahkan field lain kalau perlu prefill
          },
        },
      });
    };
  } else {
    // behaviour default lama
    buttonLabel = 'Risiko';
    onPressPrimary = () => {
      navigation.navigate('Asset', {
        screen: 'RiskWizard',
      });
    };
  }

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
            <Text style={styles.row}>Kategori         : {category}</Text>
            <Text style={styles.row}>Nama Asset       : {asset}</Text>
            <Text style={styles.row}>Kode Asset       : {code}</Text>
            <Text style={styles.row}>Person in Charge : {pic}</Text>
            <Text style={[styles.row, styles.rowRed]}>ID asset r14a</Text>
            <Text style={styles.row}>Kondisi Asset    : {condition}</Text>
            <Text style={styles.row}>Deskripsi Asset  : {description}</Text>
          </View>

          {/* FOOTER BUTTON */}
          <View style={styles.footer}>
            <ActionButton
              label={buttonLabel}
              onPress={onPressPrimary}
              style={styles.riskButton}
            />
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
    gap: spacing.sm,
  },
  footerTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  riskButton: {
    color: '#aa1515ff',
    alignSelf: 'center',
    paddingHorizontal: 40,
  },
});

export default NotificationDetailScreen;
