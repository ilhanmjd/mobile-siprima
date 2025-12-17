import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';

const DiskominfoDashboardScreen = () => {
  const navigation = useNavigation();
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        {/* KARTU RINGKASAN ATAS */}
        <SectionCard style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryLabel}>Total Seluruh Asset</Text>
              <Text style={styles.summaryValue}>176</Text>
            </View>
            <View>
              <Text style={styles.summaryLabel}>Risiko Teridentifikasi</Text>
              <View style={styles.riskLegendRow}>
                <View style={[styles.dot, { backgroundColor: '#FF4D4F' }]} />
                <Text style={styles.legendText}>High 45</Text>
              </View>
              <View style={styles.riskLegendRow}>
                <View style={[styles.dot, { backgroundColor: '#FFC53D' }]} />
                <Text style={styles.legendText}>Medium 56</Text>
              </View>
              <View style={styles.riskLegendRow}>
                <View style={[styles.dot, { backgroundColor: '#40A9FF' }]} />
                <Text style={styles.legendText}>Low 32</Text>
              </View>
            </View>
          </View>
        </SectionCard>

        {/* JADWAL PEMELIHARAAN */}
        <SectionCard>
          <Text style={styles.sectionTitle}>Jadwal Pemeliharaan</Text>
          {['Asset laptop', 'Asset Komputer', 'Data Cloud', 'Router', 'Microsoft Office']
            .map((nama, idx) => (
              <View key={idx} style={styles.maintenanceRow}>
                <View style={styles.maintenanceLeft}>
                  <View style={styles.calendarIcon} />
                  <Text style={styles.maintenanceName}>{nama}</Text>
                </View>
                <TouchableOpacity style={styles.maintenanceButton}>
                  <Text style={styles.maintenanceButtonText}>Siapkan</Text>
                </TouchableOpacity>
              </View>
            ))}
        </SectionCard>

        {/* PENURUNAN RISIKO */}
        <SectionCard>
          <Text style={styles.sectionTitle}>Penurunan Risiko setelah Mitigasi</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>[Bar Chart]</Text>
          </View>
        </SectionCard>

        {/* HEATMAP RISIKO */}
        <SectionCard>
          <Text style={styles.sectionTitle}>Heatmap Risiko (Matrix P×D)</Text>
          <View style={styles.heatmapGrid}>
            {Array.from({ length: 25 }).map((_, i) => (
              <View key={i} style={styles.heatCell} />
            ))}
          </View>
        </SectionCard>

        {/* VERIFIKASI DINAS */}
        <SectionCard>
          <Text style={styles.sectionTitle}>Verifikasi Dinas</Text>
          {[
            'Dinas PU/PR belum update data aset',
            'Data integrasi Dinas Kesehatan belum diverifikasi',
            'Asset kritis di Dinas Pendidikan masuk',
            'Data aset raw belum tervalidasi kembali',
          ].map((txt, idx) => (
            <View key={idx} style={styles.progressRow}>
              <Text style={styles.progressText}>{txt}</Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${60 + idx * 10}%` }]} />
              </View>
              <Text style={styles.progressPercent}>{60 + idx * 10}%</Text>
            </View>
          ))}
        </SectionCard>

        {/* NOTIFIKASI VERIFIKASI */}
        <SectionCard>
          <Text style={styles.sectionTitle}>Notifikasi Verifikasi</Text>
          {['Dinas Kesehatan', 'Dinas Pendidikan', 'Dinas PU/PR'].map((d, idx) => (
            <View key={idx} style={styles.notifRow}>
              <View style={styles.notifDot} />
              <Text style={styles.notifText}>{d}</Text>
              <Text style={styles.badge}>Baru</Text>
            </View>
          ))}
        </SectionCard>

        {/* PENGHAPUSAN ASET */}
        <SectionCard>
          <Text style={styles.sectionTitle}>Penghapusan Aset</Text>
          {['Laptop Asus', 'Printer Epson', 'Router Core'].map((a, idx) => (
            <View key={idx} style={styles.notifRow}>
              <View style={[styles.notifDot, { backgroundColor: '#FF4D4F' }]} />
              <Text style={styles.notifText}>{a}</Text>
              <TouchableOpacity
    onPress={() => navigation.navigate('DiskominfoAssetDeletionVerification')} >
    <Text style={styles.linkText}>Verifikasi</Text>
  </TouchableOpacity>
            </View>
          ))}
        </SectionCard>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  summaryCard: {
    backgroundColor: '#F5FAFF',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  riskLegendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 11,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  chartPlaceholder: {
    height: 180,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPlaceholderText: {
    fontSize: 12,
    color: '#999',
  },
  maintenanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F0FF',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: spacing.sm,
    marginBottom: 6,
  },
  maintenanceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  calendarIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#1D3D8F',
  },
  maintenanceName: {
    fontSize: 12,
    fontWeight: '500',
  },
  maintenanceButton: {
    backgroundColor: '#0052CC',
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  maintenanceButtonText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
  },
  heatmapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: spacing.sm,
  },
  heatCell: {
    width: '18%',
    aspectRatio: 1,
    backgroundColor: '#FFE9A9',
    borderRadius: 4,
  },
  progressRow: {
    marginBottom: spacing.sm,
  },
  progressText: {
    fontSize: 11,
    marginBottom: 4,
  },
  progressBarBg: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#4CAF50',
  },
  progressPercent: {
    fontSize: 10,
    marginTop: 2,
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: 6,
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#40A9FF',
  },
  notifText: {
    flex: 1,
    fontSize: 12,
  },
  badge: {
    fontSize: 10,
    color: '#FF4D4F',
    fontWeight: '700',
  },
  linkText: {
    fontSize: 11,
    color: '#0052CC',
    fontWeight: '600',
  },
});

export default DiskominfoDashboardScreen;
