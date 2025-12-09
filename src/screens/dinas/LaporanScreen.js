import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/Feather';

const assetRows = [
  { nama: 'Laptop Asus', dinas: 'Kesehatan', tanggal: '16/01/2020', status: 'Active' },
  { nama: 'Mobil Pajero', dinas: 'Pendidikan', tanggal: '01/12/2021', status: 'Inactive' },
  { nama: 'Motor Beat', dinas: 'Olahraga', tanggal: '30/03/2022', status: 'Maintenance' },
  { nama: 'SSD Acer', dinas: 'Kominfo', tanggal: '10/03/2023', status: 'Retired' },
  { nama: 'Website', dinas: 'Kominfo', tanggal: '29/05/2024', status: 'Active' },
  { nama: 'Ipad', dinas: 'Perhutani', tanggal: '20/06/2025', status: 'Active' },
];

const riskRows = [
  { nama: 'Laptop Asus', prioritas: 'Rp 9.000.000', status: 'Active', statusPerlakuan: 'Active', tanggal: '16/01/2020' },
  { nama: 'Mobil Pajero', prioritas: 'Rp 700.000.000', status: 'Inactive', statusPerlakuan: 'Inactive', tanggal: '01/12/2021' },
  { nama: 'Motor Beat', prioritas: 'Rp 5.000.000', status: 'Maintenance', statusPerlakuan: 'Maintenance', tanggal: '30/03/2022' },
  { nama: 'SSD Acer', prioritas: 'Rp 400.000', status: 'Retired', statusPerlakuan: 'Retired', tanggal: '10/03/2023' },
  { nama: 'Website', prioritas: 'Rp 10.000.000', status: 'Active', statusPerlakuan: 'Active', tanggal: '29/05/2024' },
  { nama: 'Ipad', prioritas: 'Rp 8.000.000', status: 'Active', statusPerlakuan: 'Active', tanggal: '20/06/2025' },
];

const kategoriOptions = ['Asset', 'Risiko'];

const LaporanScreen = ({ route }) => {
  const [kategori, setKategori] = React.useState('Asset');
  const [dateRange, setDateRange] = React.useState('dd/mm/yyyy - dd/mm/yyyy');
  const [showKategoriPopup, setShowKategoriPopup] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  // ambil hasil scan QR (optional)
  React.useEffect(() => {
    const searchId = route?.params?.searchId;
    if (route?.params?.fromQr && searchId) {
      setSearchText(searchId.toLowerCase());
      setKategori('Asset'); // misal QR untuk aset
    }
  }, [route?.params]);

  const isAsset = kategori === 'Asset';
  const baseRows = isAsset ? assetRows : riskRows;

  // filter sederhana: nama mengandung searchText
  const rows = baseRows.filter(row =>
    !searchText ? true : row.nama.toLowerCase().includes(searchText)
  );

  return (
    <Screen>
      <SectionCard>
        <Text style={styles.title}>Laporan</Text>

        {/* Filter bar */}
        <View style={styles.filterRow}>
          <Pressable
            style={styles.filterBox}
            onPress={() => setShowKategoriPopup(true)}
          >
            <Text style={styles.filterText}>{kategori}</Text>
            <Icon name="chevron-down" size={14} />
          </Pressable>

          <View style={[styles.filterBox, { flex: 2 }]}>
            <Text style={styles.filterText}>{dateRange}</Text>
          </View>

          <Pressable
            style={styles.searchButton}
            onPress={() => {
              // nanti bisa dipakai untuk trigger fetch API
            }}
          >
            <Icon name="search" size={18} color="#fff" />
          </Pressable>
        </View>

        {/* Header tabel */}
        {isAsset ? (
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 2 }]}>Nama Aset</Text>
            <Text style={[styles.headerCell, { flex: 2 }]}>Dinas</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>Tanggal</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>Status</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>Download</Text>
          </View>
        ) : (
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 2 }]}>Nama Risiko</Text>
            <Text style={[styles.headerCell, { flex: 2 }]}>Prioritas</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>Tanggal</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>Status</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>Status Perlakuan</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>Download</Text>
          </View>
        )}

        {/* Rows */}
        <ScrollView contentContainerStyle={styles.list}>
          {rows.map((row, idx) => (
            <View key={idx} style={styles.row}>
              {isAsset ? (
                <>
                  <Text style={[styles.cellText, { flex: 2 }]}>{row.nama}</Text>
                  <Text style={[styles.cellText, { flex: 2 }]}>{row.dinas}</Text>
                  <Text style={[styles.cellText, { flex: 1 }]}>{row.tanggal}</Text>
                  <Text style={[styles.cellText, { flex: 1 }]}>{row.status}</Text>
                  <Pressable style={styles.downloadPill}>
                    <Text style={styles.downloadText}>Download</Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <Text style={[styles.cellText, { flex: 2 }]}>{row.nama}</Text>
                  <Text style={[styles.cellText, { flex: 2 }]}>{row.prioritas}</Text>
                  <Text style={[styles.cellText, { flex: 1 }]}>{row.tanggal}</Text>
                  <Text style={[styles.cellText, { flex: 1 }]}>{row.status}</Text>
                  <Text style={[styles.cellText, { flex: 1 }]}>{row.statusPerlakuan}</Text>
                  <Pressable style={styles.downloadPill}>
                    <Text style={styles.downloadText}>Download</Text>
                  </Pressable>
                </>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Popup kategori */}
        {showKategoriPopup && (
          <Pressable
            style={styles.overlay}
            onPress={() => setShowKategoriPopup(false)}
          >
            <View style={styles.popup}>
              {kategoriOptions.map(opt => (
                <Pressable
                  key={opt}
                  style={styles.popupItem}
                  onPress={() => {
                    setKategori(opt);
                    setShowKategoriPopup(false);
                  }}
                >
                  <Text style={styles.popupText}>{opt}</Text>
                </Pressable>
              ))}
            </View>
          </Pressable>
        )}
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  cellText: {
    fontSize: 11,
  },
  downloadPill: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  downloadText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  popup: {
    marginTop: 90,
    marginLeft: 24,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  popupItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  popupText: {
    fontSize: 12,
  },
});

export default LaporanScreen;
