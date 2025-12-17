import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import ActionButton from '../../components/ActionButton';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

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
    assetId = null,
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
  const isRiskTreatmentAccepted =
    mode === 'RISK_TREATMENT' &&
    (riskTreatmentData?.status || '').toLowerCase() === 'accepted';
  const resolvedRiskId =
    riskId ??
    riskTreatmentData?.risiko_id ??
    riskTreatmentData?.risk_id ??
    riskTreatmentData?.risk?.id ??
    riskData?.id ??
    null;
  const headerTitle = assetSource?.nama || asset;
  const displayCategory = assetSource?.kategori?.nama || category;
  const displayCode =
    assetSource?.kode || assetSource?.asset_code || code;
  const displayPIC =
    assetSource?.penanggungjawab?.nama ||
    assetSource?.penanggungjawab?.name ||
    pic;
  const displayCondition = assetSource?.kondisi || condition;
  const displayDescription = assetSource?.deskripsi || description;
  const displayAssetId = assetSource?.id || assetId;
  const displayDate = (() => {
    const rawDate =
      assetSource?.updated_at ||
      assetSource?.created_at ||
      assetSource?.tgl_perolehan ||
      assetSource?.tanggal_perolehan ||
      dateTime;
    if (!rawDate) {
      return dateTime;
    }
    try {
      return dayjs(rawDate).format('DD/MM/YYYY - HH:mm:ss');
    } catch {
      return rawDate;
    }
  })();

  // Tentukan judul footer & label tombol berdasarkan mode
  let buttonLabel = 'Buka Form';
  let onPressPrimary = () => {};

  if (mode === 'RISK_TREATMENT') {
    if (isRiskTreatmentAccepted) {
      buttonLabel = 'Input Maintenance';
      onPressPrimary = () => {
        navigation.navigate('Asset', {
          screen: 'MaintenanceInput',
          params: {
            initialData: {
              idAset: displayAssetId ? String(displayAssetId) : '',
              alasan: `Maintenance untuk ${headerTitle}`,
            },
            riskTreatmentData,
          },
        });
      };
    } else {
      buttonLabel = 'Risk Treatment';
      onPressPrimary = () => {
        navigation.navigate('Asset', {
          screen: 'RiskTreatmentWizard',
          params: {
            riskId: resolvedRiskId,
            initialData: {
              idRisiko:
                resolvedRiskId !== null && resolvedRiskId !== undefined
                  ? String(resolvedRiskId)
                  : '',
              strategi: riskTreatmentData?.strategi || '',
              pengendalian: riskTreatmentData?.pengendalian || '',
              penanggungJawab:
                riskTreatmentData?.penanggung_jawab?.id ||
                riskTreatmentData?.penanggung_jawab_id ||
                '',
              targetTanggal: riskTreatmentData?.target_tanggal || '',
              biaya: riskTreatmentData?.biaya
                ? String(riskTreatmentData.biaya)
                : '',
              probabilitasAkhir: riskTreatmentData?.probabilitas_akhir
                ? String(riskTreatmentData.probabilitas_akhir)
                : '',
              dampakAkhir: riskTreatmentData?.dampak_akhir
                ? String(riskTreatmentData.dampak_akhir)
                : '',
              levelResidual: riskTreatmentData?.level_residual
                ? String(riskTreatmentData.level_residual)
                : '',
            },
          },
        });
      };
    }
  } else if (mode === 'REINPUT_RISK') {
    buttonLabel = 'Input Risiko';
    onPressPrimary = () => {
      navigation.navigate('Asset', {
        screen: 'RiskWizard',
        params: {
          initialData: {
            idAset: assetId ? String(assetId) : '',
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
        params: {
          initialData: {
            idAset: assetId ? String(assetId) : assetData?.asset_id ? String(assetData.asset_id) : '',
            judulRisiko: asset,
            deskripsi: description,
          },
        },
      });
    };
  }

  return (
    <Screen>
      <SectionCard>
        <ScrollView contentContainerStyle={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
            <Text style={styles.headerSubtitle}>{displayDate}</Text>
          </View>

          {/* BODY */}
          <View style={styles.body}>
            <Text style={styles.row}>Kategori         : {displayCategory}</Text>
            <Text style={styles.row}>Nama Asset       : {headerTitle}</Text>
            <Text style={styles.row}>Kode Asset       : {displayCode}</Text>
            <Text style={styles.row}>Person in Charge : {displayPIC}</Text>
            {displayAssetId ? (
              <Text style={[styles.row, styles.rowRed]}>
                ID Asset : {displayAssetId}
              </Text>
            ) : null}
            <Text style={styles.row}>Kondisi Asset    : {displayCondition}</Text>
            <Text style={styles.row}>Deskripsi Asset  : {displayDescription}</Text>

            {mode === 'RISK_TREATMENT' && riskData ? (
              <>
                <Text style={styles.sectionLabel}>Detail Risiko</Text>
                <Text style={styles.row}>
                  ID Risiko       : {resolvedRiskId ?? '-'}
                </Text>
                <Text style={styles.row}>Judul Risiko     : {riskData.judul || headerTitle}</Text>
                <Text style={styles.row}>Penyebab         : {riskData.penyebab || '-'}</Text>
                <Text style={styles.row}>Dampak           : {riskData.dampak || '-'}</Text>
                <Text style={styles.row}>Probabilitas     : {riskData.probabilitas ?? '-'}</Text>
                <Text style={styles.row}>Nilai Dampak     : {riskData.nilai_dampak ?? '-'}</Text>
                <Text style={styles.row}>Level Risiko     : {riskData.level_risiko ?? '-'}</Text>
                <Text style={styles.row}>Status           : {riskData.status || '-'}</Text>
              </>
            ) : null}

            {riskTreatmentData ? (
              <>
                <Text style={styles.sectionLabel}>Detail Risk Treatment</Text>
                <Text style={styles.row}>Strategi          : {riskTreatmentData.strategi || '-'}</Text>
                <Text style={styles.row}>Pengendalian      : {riskTreatmentData.pengendalian || '-'}</Text>
                <Text style={styles.row}>Penanggung Jawab  : {riskTreatmentData.penanggung_jawab?.nama || riskTreatmentData.penanggung_jawab_id || '-'}</Text>
                <Text style={styles.row}>
                  Target Tanggal  :{' '}
                  {riskTreatmentData.target_tanggal
                    ? dayjs(riskTreatmentData.target_tanggal).format('DD/MM/YYYY')
                    : '-'}
                </Text>
                <Text style={styles.row}>Biaya             : {riskTreatmentData.biaya ?? 0}</Text>
                <Text style={styles.row}>Probabilitas Akhir: {riskTreatmentData.probabilitas_akhir ?? '-'}</Text>
                <Text style={styles.row}>Dampak Akhir      : {riskTreatmentData.dampak_akhir ?? '-'}</Text>
                <Text style={styles.row}>Level Residual    : {riskTreatmentData.level_residual ?? '-'}</Text>
                <Text style={styles.row}>Status            : {riskTreatmentData.status || '-'}</Text>
              </>
            ) : null}
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
  sectionLabel: {
    marginTop: spacing.lg,
    fontSize: 14,
    fontWeight: '700',
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
