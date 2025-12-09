import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';

const maintenanceData = [
  { id: 1, nama: 'Asset laptop', status: 'Ditangani' },
  { id: 2, nama: 'Asset Komputer', status: 'Proses' },
  { id: 3, nama: 'Data Cloud', status: 'Proses' },
  { id: 4, nama: 'Router', status: 'Ditangani' },
  { id: 5, nama: 'Microsoft Office', status: 'Ditangani' },
];

const verificationData = [
  { id: 1, assetId: 'R14A - LAPTOP ASUS', date: '10-10-2025', pic: '1579' },
  { id: 2, assetId: 'D4VIN - PRINT EPSON', date: '15-06-2025', pic: '1506' },
  { id: 3, assetId: 'R12K4 - ROUTER', date: '11-07-2025', pic: '0411' },
  { id: 4, assetId: '1L4H - DATA CLOUD', date: '26-01-2025', pic: '0705' },
];

const filterChips = ['Asset Aktif', 'Maintenance', 'End of Life', 'Aset Bermasalah'];

const VerifierDashboardScreen = ({ navigation }) => {
  const [activeChip, setActiveChip] = React.useState('Asset Aktif');

  const handleTopButton = (type) => {
    if (type === 'ASET') {
      navigation.navigate('Verification'); // sesuaikan dengan stack kamu
    } else if (type === 'RISIKO') {
      navigation.navigate('Verification'); // sesuaikan dengan stack kamu
    }
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        {/* TOP ACTIONS */}
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.topCard}
            onPress={() => handleTopButton('ASET')}
          >
            <Text style={styles.topCardLabel}>ASET</Text>
            <Text style={styles.topCardButton}>Verifikasi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.topCard}
            onPress={() => handleTopButton('RISIKO')}
          >
            <Text style={styles.topCardLabel}>RISIKO</Text>
            <Text style={styles.topCardButton}>Verifikasi</Text>
          </TouchableOpacity>
        </View>

        {/* FILTER CHIPS */}
        <View style={styles.chipRow}>
          {filterChips.map((chip) => (
            <TouchableOpacity
              key={chip}
              style={[
                styles.chip,
                chip === activeChip && styles.chipActive,
              ]}
              onPress={() => setActiveChip(chip)}
            >
              <Text
                style={[
                  styles.chipText,
                  chip === activeChip && styles.chipTextActive,
                ]}
              >
                {chip}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* JADWAL PEMELIHARAAN */}
        <SectionCard>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Jadwal Pemeliharaan</Text>
          </View>

          {maintenanceData.map((item) => (
            <View key={item.id} style={styles.maintenanceRow}>
              <View style={styles.maintenanceInfo}>
                <View style={styles.calendarIcon} />
                <Text style={styles.maintenanceName}>{item.nama}</Text>
              </View>
              <View
                style={[
                  styles.statusPill,
                  item.status === 'Ditangani'
                    ? styles.statusHandled
                    : styles.statusProcess,
                ]}
              >
                <Text style={styles.statusPillText}>{item.status}</Text>
              </View>
            </View>
          ))}
        </SectionCard>

        {/* VERIFIKASI ASET */}
        <SectionCard>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Verifikasi Asset</Text>
          </View>

          <View style={styles.verifHeaderRow}>
            <Text style={[styles.verifHeaderText, { flex: 2 }]}>ID - NAME ASSET</Text>
            <Text style={[styles.verifHeaderText, { flex: 1 }]}>VERIFICATION DATE</Text>
            <Text style={[styles.verifHeaderText, { flex: 0.7 }]}>PIC</Text>
          </View>

          {verificationData.map((row) => (
            <View key={row.id} style={styles.verifRow}>
              <Text style={[styles.verifCellText, { flex: 2 }]}>{row.assetId}</Text>
              <Text style={[styles.verifCellText, { flex: 1 }]}>{row.date}</Text>
              <Text style={[styles.verifCellText, { flex: 0.7 }]}>{row.pic}</Text>
            </View>
          ))}
        </SectionCard>

        {/* CHART PLACEHOLDER */}
        <SectionCard>
          <Text style={styles.sectionTitle}>Verification Asset And Risk</Text>
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FFE9A9' }]} />
              <Text style={styles.legendText}>Dataset 1</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#C5C3FF' }]} />
              <Text style={styles.legendText}>Dataset 2</Text>
            </View>
          </View>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>[Chart here]</Text>
          </View>
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  topCard: {
    flex: 1,
    backgroundColor: '#1D3D8F',
    borderRadius: 16,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  topCardLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
    marginBottom: 6,
  },
  topCardButton: {
    backgroundColor: '#FFD86F',
    color: '#1D3D8F',
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: 999,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 999,
    elevation: 1,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.text,
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  sectionHeader: {
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  maintenanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: spacing.sm,
    borderRadius: 10,
    backgroundColor: '#E6F0FF',
    marginBottom: 6,
  },
  maintenanceInfo: {
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
  statusPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusHandled: {
    backgroundColor: '#FFC93C',
  },
  statusProcess: {
    backgroundColor: '#FFD86F',
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '600',
  },
  verifHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#E6F0FF',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: spacing.sm,
    marginBottom: 4,
  },
  verifHeaderText: {
    fontSize: 11,
    fontWeight: '600',
  },
  verifRow: {
    flexDirection: 'row',
    backgroundColor: '#F3F6FF',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: spacing.sm,
    marginBottom: 4,
  },
  verifCellText: {
    fontSize: 11,
  },
  chartLegend: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 11,
  },
  chartPlaceholder: {
    height: 220,
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
});

export default VerifierDashboardScreen;
