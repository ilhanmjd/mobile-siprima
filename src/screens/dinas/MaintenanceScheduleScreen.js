import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const dummyData = [
  { id: 'r14a', nama: 'Laptop', risiko: 'LCD Pecah', level: 'Sedang', jadwal: '20 Okt 2025', status: 'Due' },
  { id: 'd45k', nama: 'Komputer', risiko: 'Komputer Tidak Berfungsi', level: 'Sedang', jadwal: '17 Okt 2025', status: 'Due' },
  { id: 'c12d', nama: 'Data Cloud', risiko: 'Kebocoran Data', level: 'Tinggi', jadwal: '10 Okt 2025', status: 'Due' },
  { id: 'v52m', nama: 'Microsoft Word', risiko: 'File Word mengandung malware', level: 'Tinggi', jadwal: '7 Okt 2025', status: 'Due' },
  { id: 'k99o', nama: 'Server', risiko: 'Downtime', level: 'Sedang', jadwal: '4 Okt 2025', status: 'Done' },
  { id: 'p171', nama: 'Printer', risiko: 'Overheating', level: 'Sedang', jadwal: '30 Sept 2025', status: 'Due' },
  { id: 'f82j', nama: 'Printer', risiko: 'Kerusakan Hardware', level: 'Tinggi', jadwal: '26 Sept 2025', status: 'Due' },
];

const MaintenanceScheduleScreen = () => {
  const navigation = useNavigation();

  return (
    <Screen>
      <SectionCard style={styles.card}>
        {/* Header title + filter + tombol laporan */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Jadwal Pemeliharaan</Text>

          <View style={styles.headerRight}>
            <Pressable style={styles.iconButton} onPress={() => { /* nanti untuk filter */ }}>
              <Icon name="filter" size={18} color="#000" />
            </Pressable>
            <Pressable style={styles.reportButton} onPress={() => { /* nanti ke laporan */ }}>
              <Text style={styles.reportText}>Laporan</Text>
              <Icon name="chevron-down" size={16} color="#fff" />
            </Pressable>
          </View>
        </View>

        {/* Header kolom */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 2 }]}>Id - Nama Aset</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Risiko</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Level</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Jadwal</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Status</Text>
        </View>

        {/* List */}
        <ScrollView contentContainerStyle={styles.list}>
          {dummyData.map(item => (
            <View key={item.id} style={styles.row}>
              <View style={[styles.cell, { flex: 2 }]}>
                <Text style={styles.boldText}>{item.id}</Text>
                <Text style={styles.normalText}>{item.nama}</Text>
              </View>
              <View style={[styles.cell, { flex: 2 }]}>
                <Text style={styles.normalText}>{item.risiko}</Text>
              </View>
              <View style={[styles.cell, { flex: 1 }]}>
                <Text style={styles.boldText}>{item.level}</Text>
              </View>
              <View style={[styles.cell, { flex: 1 }]}>
                <Text style={styles.boldText}>{item.jadwal}</Text>
              </View>
              <View style={[styles.cell, { flex: 1 }]}>
                <Text style={styles.normalText}>{item.status}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </SectionCard>
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingBottom: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1D9A6C',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 6,
  },
  reportText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F4F6FA',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  headerCell: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
  },
  list: {
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  cell: {
    justifyContent: 'center',
    paddingRight: 4,
  },
  boldText: {
    fontSize: 11,
    fontWeight: '600',
  },
  normalText: {
    fontSize: 11,
  },
});

export default MaintenanceScheduleScreen;
