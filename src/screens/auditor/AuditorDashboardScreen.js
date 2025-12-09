import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';

const AuditorDashboardScreen = () => {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Status Mitigasi */}
        <SectionCard style={styles.card}>
          <Text style={styles.title}>Status Mitigasi</Text>
          {[
            ['Baru', '80'],
            ['Dalam Penanganan', '50'],
            ['Selesai', '90'],
            ['Diterima', '70'],
          ].map(([label, value]) => (
            <View key={label} style={styles.statusRow}>
              <Text style={styles.statusLabel}>{label}</Text>
              <Text style={styles.statusValue}>{value}</Text>
            </View>
          ))}
        </SectionCard>

        {/* Kondisi Aset */}
        <SectionCard style={styles.card}>
          <Text style={styles.title}>Kondisi Aset</Text>
          <View style={styles.pieWrapper}>
            <View style={styles.pieCircle}>
              <Text style={styles.pieText}>[Pie]</Text>
            </View>
          </View>
          <View style={styles.legend}>
            <View style={styles.legendRow}>
              <View style={[styles.dot, { backgroundColor: '#40A9FF' }]} />
              <Text style={styles.legendText}>20% BAIK</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.dot, { backgroundColor: '#FFC53D' }]} />
              <Text style={styles.legendText}>20% RUSAK RINGAN</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.dot, { backgroundColor: '#FF4D4F' }]} />
              <Text style={styles.legendText}>20% RUSAK BERAT</Text>
            </View>
          </View>
        </SectionCard>

        {/* Pemantauan Dinas */}
        <SectionCard style={styles.card}>
          <Text style={styles.title}>Pemantauan Dinas</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, { flex: 2 }]}>Dinas</Text>
            <Text style={[styles.th, { flex: 1 }]}>Aset Aktif</Text>
            <Text style={[styles.th, { flex: 1 }]}>Risiko Aktif</Text>
            <Text style={[styles.th, { flex: 1 }]}>Jadwal</Text>
          </View>
          {[
            ['Dinas Pendidikan', '650', '50', '3 hari'],
            ['Dinas Kesehatan', '700', '20', '4 hari'],
            ['Dinas PUPR', '550', '70', '10 hari'],
            ['Dinas Perhubungan', '400', '30', '6 hari'],
          ].map(([d, aset, risk, jadwal]) => (
            <View key={d} style={styles.tableRow}>
              <Text style={[styles.tdName, { flex: 2 }]}>{d}</Text>
              <Text style={[styles.td, { flex: 1 }]}>{aset}</Text>
              <Text style={[styles.td, { flex: 1 }]}>{risk}</Text>
              <Text style={[styles.td, { flex: 1 }]}>{jadwal}</Text>
            </View>
          ))}
        </SectionCard>

        {/* Risiko Teridentifikasi */}
        <SectionCard style={styles.card}>
          <Text style={styles.title}>RISIKO Teridentifikasi</Text>
          {[
            ['Low', '70'],
            ['Dalam Penanganan', '40'],
            ['Selesai', '55'],
            ['Diterima', '120'],
          ].map(([label, value]) => (
            <View key={label} style={styles.statusRow}>
              <Text style={styles.statusLabel}>{label}</Text>
              <Text style={styles.statusValue}>{value}</Text>
            </View>
          ))}
        </SectionCard>

        {/* Total Aset */}
        <SectionCard style={styles.card}>
          <Text style={styles.title}>Total Aset</Text>
          <Text style={styles.totalNumber}>4.000</Text>
          {[
            ['Aset Aktif', '1000'],
            ['Aset Non-Aktif', '1000'],
            ['Aset Terhapus', '1000'],
            ['Aset Rusak', '1000'],
          ].map(([label, value]) => (
            <View key={label} style={styles.totalRow}>
              <Text style={styles.td}>{label}</Text>
              <Text style={styles.td}>{value}</Text>
            </View>
          ))}
        </SectionCard>

        {/* Risiko Bulanan */}
        <SectionCard style={styles.card}>
          <Text style={styles.title}>RISIKO BULANAN</Text>
          <View style={styles.legendRow}>
            <View style={[styles.dot, { backgroundColor: '#FFE9A9' }]} />
            <Text style={styles.legendText}>Dataset 1</Text>
          </View>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>[Line Chart]</Text>
          </View>
        </SectionCard>

        {/* Notifikasi & Audit */}
        <SectionCard style={styles.card}>
          <Text style={styles.title}>Notifikasi & Audit</Text>
          {[
            'Audit Dinas Pendidikan 80% selesai',
            'Review risiko Dinas Kesehatan dijadwalkan 3 hari lagi',
            'Laporan penghapusan aset menunggu verifikasi',
          ].map((txt, idx) => (
            <View key={idx} style={styles.auditRow}>
              <View style={[styles.dot, { backgroundColor: '#40A9FF' }]} />
              <Text style={styles.auditText}>{txt}</Text>
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
  card: {
    borderRadius: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 12,
  },
  statusValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  pieWrapper: {
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  pieCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieText: {
    fontSize: 12,
    color: '#999',
  },
  legend: {
    gap: 4,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 11,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    marginBottom: 4,
  },
  th: {
    fontSize: 11,
    fontWeight: '700',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  tdName: {
    fontSize: 11,
    fontWeight: '500',
  },
  td: {
    fontSize: 11,
  },
  totalNumber: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chartPlaceholder: {
    height: 160,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  chartPlaceholderText: {
    fontSize: 12,
    color: '#999',
  },
  auditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: 6,
  },
  auditText: {
    fontSize: 12,
    flex: 1,
  },
});

export default AuditorDashboardScreen;
