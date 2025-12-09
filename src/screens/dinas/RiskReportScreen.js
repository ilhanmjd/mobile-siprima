import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/Feather';

const dummyRows = [
  {
    id: '1038u103ilje01',
    nama: 'Komputer',
    jenis: 'Penggantian TI',
    tanggal: '14 Oktober 2023',
    status: 'Penanganan',
    pelaksana: 'Davin',
    deskripsi: 'Penggantian motherboard dan PSU.',
  },
  {
    id: '102u3198yz312',
    nama: 'Laptop',
    jenis: 'Servis Rutin',
    tanggal: '25 Oktober 2004',
    status: 'Selesai',
    pelaksana: 'Riani',
    deskripsi: 'Pembersihan internal dan update OS.',
  },
];

const RiskReportScreen = () => {
  const [bulan, setBulan] = React.useState('Oktober 2025');
  const [statusFilter, setStatusFilter] = React.useState('Semua Status');
  const [jenis, setJenis] = React.useState('Semua Jenis');
  const [selected, setSelected] = React.useState(null);

  const filtered = dummyRows; // nanti bisa ditambah logic filter

  return (
    <Screen>
      <SectionCard>
        <Text style={styles.title}>Laporan Pemeliharaan Aset</Text>

        {/* Filter bar */}
        <View style={styles.filterRow}>
          <View style={styles.filterBox}>
            <Text style={styles.filterText}>{bulan}</Text>
            <Icon name="chevron-down" size={14} />
          </View>
          <View style={styles.filterBox}>
            <Text style={styles.filterText}>{statusFilter}</Text>
            <Icon name="chevron-down" size={14} />
          </View>
          <View style={styles.filterBox}>
            <Text style={styles.filterText}>{jenis}</Text>
            <Icon name="chevron-down" size={14} />
          </View>
          <Pressable style={styles.searchButton}>
            <Icon name="search" size={16} color="#fff" />
          </Pressable>
        </View>

        {/* Header tabel */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 2 }]}>ID Aset</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Nama Aset</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Jenis Pemeliharaan</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Tanggal</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Status</Text>
        </View>

        {/* Rows */}
        <ScrollView contentContainerStyle={styles.list}>
          {filtered.map(row => (
            <View key={row.id} style={styles.row}>
              <Text style={[styles.cellText, { flex: 2 }]}>{row.id}</Text>
              <Text style={[styles.cellText, { flex: 2 }]}>{row.nama}</Text>
              <Text style={[styles.cellText, { flex: 2 }]}>{row.jenis}</Text>
              <Text style={[styles.cellText, { flex: 1 }]}>{row.tanggal}</Text>

              <Pressable
                style={[
                  styles.statusPill,
                  row.status === 'Selesai' ? styles.statusDone : styles.statusProcess,
                ]}
                onPress={() => setSelected(row)}
              >
                <Text style={styles.statusText}>{row.status}</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>

        {/* Detail */}
        <View style={styles.detailBox}>
          <Text style={styles.detailTitle}>Detail Pemeliharaan</Text>
          <Text style={styles.detailRow}>ID Aset   : {selected?.id || '-'}</Text>
          <Text style={styles.detailRow}>Nama      : {selected?.nama || '-'}</Text>
          <Text style={styles.detailRow}>Tanggal   : {selected?.tanggal || '-'}</Text>
          <Text style={styles.detailRow}>Jenis     : {selected?.jenis || '-'}</Text>
          <Text style={styles.detailRow}>Pelaksana : {selected?.pelaksana || '-'}</Text>
          <Text style={styles.detailRow}>Status    : {selected?.status || '-'}</Text>
          <Text style={styles.detailRow}>Deskripsi : {selected?.deskripsi || '-'}</Text>
        </View>
      </SectionCard>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  filterBox: {
    flex: 1,
    height: 36,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  filterText: {
    fontSize: 11,
  },
  searchButton: {
    width: 36,
    height: 36,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerCell: {
    fontSize: 11,
    fontWeight: '600',
  },
  list: {
    marginTop: 4,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  cellText: {
    fontSize: 11,
  },
  statusPill: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 999,
    alignItems: 'center',
  },
  statusProcess: {
    backgroundColor: '#F44336',
  },
  statusDone: {
    backgroundColor: '#4CAF50',
  },
  statusText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  detailBox: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  detailRow: {
    fontSize: 12,
    marginBottom: 2,
  },
});

export default RiskReportScreen;
