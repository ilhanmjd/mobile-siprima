import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';
import dayjs from 'dayjs';

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
    mode = 'ASSET',          // 'ASSET' | 'RISK' | 'RISK_TREATMENT'
    riskId = null,
    assetData = null,
    riskData = null,
    riskTreatmentData = null,
  } = route?.params || {};

  const assetSource =
    assetData ||
    riskTreatmentData?.risiko?.asset ||
    riskTreatmentData?.risk?.asset ||
    riskData?.asset ||
    null;
  const displayName = assetSource?.nama || asset;
  const displayCategory = assetSource?.kategori?.nama || kategori;
  const displayCode =
    assetSource?.kode ||
    assetSource?.asset_code ||
    code;
  const displayPIC =
    assetSource?.penanggungjawab?.nama ||
    assetSource?.penanggungjawab?.name ||
    pic;
  const displayCondition = assetSource?.kondisi || condition;
  const displayDescription = assetSource?.deskripsi || description;
  const displayDate = (() => {
    const raw =
      assetSource?.updated_at ||
      assetSource?.created_at ||
      dateTime;
    if (!raw) {
      return dateTime;
    }
    try {
      return dayjs(raw).format('DD/MM/YYYY - HH:mm:ss');
    } catch {
      return raw;
    }
  })();

  const handlePrimaryAction = () => {
    if (mode === 'RISK') {
      // Re-input Risiko
      navigation.navigate('Asset', {
        screen: 'RiskWizard',
        params: {
          fromRejected: true,
          riskId,
          initialData: {
            idAset:
              (riskData?.asset_id || riskData?.asset?.id || assetSource?.id)
                ? String(
                    riskData?.asset_id ||
                      riskData?.asset?.id ||
                      assetSource?.id,
                  )
                : '',
            judulRisiko: riskData?.judul || displayName,
            deskripsi: riskData?.deskripsi || displayDescription,
            // tambah field lain kalau mau prefill
          },
        },
      });
    } else if (mode === 'RISK_TREATMENT') {
      navigation.navigate('Asset', {
        screen: 'RiskTreatmentWizard',
        params: {
          riskId: riskTreatmentData?.risiko_id,
          initialData: {
            idRisiko:
              riskTreatmentData?.risiko_id ||
              riskTreatmentData?.risiko?.id ||
              riskTreatmentData?.risk?.id ||
              assetSource?.id ||
              '',
            strategi: riskTreatmentData?.strategi,
            pengendalian: riskTreatmentData?.pengendalian,
            penanggungJawab:
              riskTreatmentData?.penanggung_jawab_id ||
              riskTreatmentData?.penanggung_jawab?.id ||
              riskTreatmentData?.penanggung_jawab?.nama ||
              '',
            targetTanggal: riskTreatmentData?.target_tanggal,
            biaya: String(riskTreatmentData?.biaya || ''),
            probabilitasAkhir: String(riskTreatmentData?.probabilitas_akhir || ''),
            dampakAkhir: String(riskTreatmentData?.dampak_akhir || ''),
            levelResidual: String(riskTreatmentData?.level_residual || ''),
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
            kategori: displayCategory,
            subKategori: '',
            nama: displayName,
            deskripsi: displayDescription,
            tanggalPerolehan:
              assetSource?.tgl_perolehan || assetSource?.tanggal_perolehan || '',
            nilaiPerolehan: '',
            kondisi: displayCondition,
            lampiran: null,
            penanggungJawab:
              assetSource?.penanggungjawab?.id ||
              assetSource?.penanggungjawab?.nama ||
              displayPIC,
            lokasi: assetSource?.lokasi?.nama || '',
            status: 'Active',
          },
        },
      });
    }
  };

  const buttonLabel =
    mode === 'RISK'
      ? 'Input Risiko'
      : mode === 'RISK_TREATMENT'
      ? 'Risk Treatment'
      : 'Input Aset';

  return (
    <Screen>
      <SectionCard>
        <ScrollView contentContainerStyle={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{displayName}</Text>
            <Text style={styles.headerSubtitle}>{displayDate}</Text>
          </View>

          {/* BODY */}
          <View style={styles.body}>
            <Text style={styles.row}>Kategori         : {displayCategory}</Text>
            <Text style={styles.row}>Nama Asset       : {displayName}</Text>
            <Text style={styles.row}>Kode Asset       : {displayCode}</Text>
            <Text style={styles.row}>Person in Charge : {displayPIC}</Text>
            <Text style={[styles.row, styles.rowRed]}>
              Status Pengajuan : DITOLAK
            </Text>
            <Text style={styles.row}>Kondisi Asset    : {displayCondition}</Text>
            <Text style={styles.row}>Deskripsi Asset  : {displayDescription}</Text>

            {mode === 'RISK' && riskData ? (
              <>
                <Text style={[styles.row, styles.sectionLabel]}>Detail Risiko</Text>
                <Text style={styles.row}>Judul Risiko : {riskData.judul || displayName}</Text>
                <Text style={styles.row}>Penyebab     : {riskData.penyebab || '-'}</Text>
                <Text style={styles.row}>Dampak       : {riskData.dampak || '-'}</Text>
                <Text style={styles.row}>Status       : {riskData.status || 'ditolak'}</Text>
              </>
            ) : null}

            {mode === 'RISK_TREATMENT' && riskTreatmentData ? (
              <>
                <Text style={[styles.row, styles.sectionLabel]}>
                  Detail Risk Treatment
                </Text>
                <Text style={styles.row}>
                  Strategi : {riskTreatmentData.strategi || '-'}
                </Text>
                <Text style={styles.row}>
                  Pengendalian : {riskTreatmentData.pengendalian || '-'}
                </Text>
                <Text style={styles.row}>
                  Penanggung Jawab :{' '}
                  {riskTreatmentData.penanggung_jawab?.nama ||
                    riskTreatmentData.penanggung_jawab_id ||
                    '-'}
                </Text>
                <Text style={styles.row}>
                  Target Tanggal :{' '}
                  {riskTreatmentData.target_tanggal
                    ? dayjs(riskTreatmentData.target_tanggal).format('DD/MM/YYYY')
                    : '-'}
                </Text>
                <Text style={styles.row}>
                  Biaya : {riskTreatmentData.biaya ?? 0}
                </Text>
                <Text style={styles.row}>
                  Probabilitas Akhir : {riskTreatmentData.probabilitas_akhir ?? '-'}
                </Text>
                <Text style={styles.row}>
                  Dampak Akhir : {riskTreatmentData.dampak_akhir ?? '-'}
                </Text>
                <Text style={styles.row}>
                  Level Residual : {riskTreatmentData.level_residual ?? '-'}
                </Text>
                <Text style={styles.row}>
                  Status : {riskTreatmentData.status || 'ditolak'}
                </Text>
              </>
            ) : null}
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
  sectionLabel: {
    marginTop: spacing.lg,
    fontWeight: '700',
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
