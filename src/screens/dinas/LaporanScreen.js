import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/Feather';
import dayjs from 'dayjs';
import { getMaintenances } from '../../api/siprima';

const formatStatusLabel = status => {
  const key = String(status || '')
    .trim()
    .toLowerCase();
  if (['accepted', 'selesai', 'finished'].includes(key)) {
    return { label: 'Selesai', color: '#4CAF50' };
  }
  if (['penanganan', 'in_progress'].includes(key)) {
    return { label: 'Penanganan', color: '#f6c343' };
  }
  if (['rejected', 'ditolak'].includes(key)) {
    return { label: 'Ditolak', color: '#FF3B30' };
  }
  if (['pending', 'under review', 'menunggu'].includes(key)) {
    return { label: 'Pending', color: '#8E8E93' };
  }
  return { label: status || '-', color: '#8E8E93' };
};

const getMonthLabel = value => {
  if (!value) {
    return '';
  }
  const d = dayjs(value);
  return d.isValid() ? d.format('MMMM YYYY') : '';
};

const formatDateValue = value => {
  if (!value) {
    return '-';
  }
  const d = dayjs(value);
  return d.isValid() ? d.format('DD MMM YYYY') : String(value);
};

const mapMaintenanceToRow = item => {
  const asset = item?.asset;
  const date = item?.jadwal_pemeliharaan || item?.target_tanggal || item?.created_at;
  const jenis = item?.jenis_pemeliharaan || item?.alasan_pemeliharaan || 'Pemeliharaan';
  const status = formatStatusLabel(item?.status_review || item?.status);
  return {
    key: item.id,
    assetId: asset?.kode_bmd || asset?.id || item.asset_id || `MT-${item.id}`,
    assetName: asset?.nama || `Asset ${item.asset_id || item.id}`,
    jenis,
    tanggal: date,
    statusMeta: status,
    raw: item,
  };
};

const LaporanScreen = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedMonth, setSelectedMonth] = React.useState('Semua Bulan');
  const [selectedStatus, setSelectedStatus] = React.useState('Semua Status');
  const [selectedJenis, setSelectedJenis] = React.useState('Semua Jenis');
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [showMonthPopup, setShowMonthPopup] = React.useState(false);
  const [showStatusPopup, setShowStatusPopup] = React.useState(false);
  const [showJenisPopup, setShowJenisPopup] = React.useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getMaintenances();
      const payload = (res?.data?.data || []).map(mapMaintenanceToRow);
      setData(payload);
      setSelectedRow(payload[0] || null);
    } catch (err) {
      console.log('LOAD MAINTENANCE REPORT ERROR:', err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const monthOptions = React.useMemo(() => {
    const options = new Set();
    data.forEach(row => {
      const label = getMonthLabel(row.tanggal);
      if (label) {
        options.add(label);
      }
    });
    return ['Semua Bulan', ...Array.from(options)];
  }, [data]);

  const statusOptions = React.useMemo(() => {
    const options = new Set();
    data.forEach(row => {
      options.add(row.statusMeta.label);
    });
    return ['Semua Status', ...Array.from(options)];
  }, [data]);

  const jenisOptions = React.useMemo(() => {
    const options = new Set();
    data.forEach(row => {
      if (row.jenis) {
        options.add(row.jenis);
      }
    });
    return ['Semua Jenis', ...Array.from(options)];
  }, [data]);

  const filteredRows = data.filter(row => {
    const monthLabel = getMonthLabel(row.tanggal);
    const matchMonth =
      selectedMonth === 'Semua Bulan' || monthLabel === selectedMonth;
    const matchStatus =
      selectedStatus === 'Semua Status' ||
      row.statusMeta.label === selectedStatus;
    const matchJenis =
      selectedJenis === 'Semua Jenis' || row.jenis === selectedJenis;
    return matchMonth && matchStatus && matchJenis;
  });

  React.useEffect(() => {
    if (filteredRows.length) {
      const exists = filteredRows.some(r => r.key === selectedRow?.key);
      if (!exists) {
        setSelectedRow(filteredRows[0]);
      }
    } else {
      setSelectedRow(null);
    }
  }, [filteredRows, selectedRow?.key]);

  const renderPopup = (visible, options, onSelect) =>
    visible ? (
      <Pressable
        style={styles.overlay}
        onPress={() => onSelect(null)}
      >
        <View style={styles.popup}>
          {options.map(opt => (
            <Pressable
              key={opt}
              style={styles.popupItem}
              onPress={() => onSelect(opt)}
            >
              <Text style={styles.popupText}>{opt}</Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    ) : null;

  return (
    <Screen>
      <SectionCard>
        <Text style={styles.title}>Laporan Pemeliharaan Aset</Text>

        <View style={styles.filterRow}>
          <Pressable
            style={styles.filterBox}
            onPress={() => setShowMonthPopup(true)}
          >
            <Text style={styles.filterText}>{selectedMonth}</Text>
            <Icon name="chevron-down" size={14} />
          </Pressable>
          <Pressable
            style={styles.filterBox}
            onPress={() => setShowStatusPopup(true)}
          >
            <Text style={styles.filterText}>{selectedStatus}</Text>
            <Icon name="chevron-down" size={14} />
          </Pressable>
          <Pressable
            style={styles.filterBox}
            onPress={() => setShowJenisPopup(true)}
          >
            <Text style={styles.filterText}>{selectedJenis}</Text>
            <Icon name="chevron-down" size={14} />
          </Pressable>
          <Pressable style={styles.searchButton} onPress={fetchData}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Icon name="refresh-ccw" size={18} color="#fff" />
            )}
          </Pressable>
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 1 }]}>ID Aset</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Nama Aset</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Jenis Pemeliharaan</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Tanggal</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Status</Text>
        </View>

        <ScrollView contentContainerStyle={styles.list}>
          {filteredRows.map(row => (
            <Pressable
              key={row.key}
              style={[
                styles.row,
                selectedRow?.key === row.key && styles.rowActive,
              ]}
              onPress={() => setSelectedRow(row)}
            >
              <Text style={[styles.cellText, { flex: 1 }]}>{row.assetId}</Text>
              <Text style={[styles.cellText, { flex: 2 }]}>{row.assetName}</Text>
              <Text style={[styles.cellText, { flex: 2 }]}>{row.jenis}</Text>
              <Text style={[styles.cellText, { flex: 1 }]}>
                {formatDateValue(row.tanggal)}
              </Text>
              <View style={[styles.statusPill, { backgroundColor: row.statusMeta.color }]}>
                <Text style={styles.statusText}>{row.statusMeta.label}</Text>
              </View>
            </Pressable>
          ))}
          {!loading && !filteredRows.length && (
            <Text style={styles.emptyText}>Data pemeliharaan tidak ditemukan.</Text>
          )}
        </ScrollView>

        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Detail Pemeliharaan</Text>
          {selectedRow ? (
            <>
              <Text style={styles.detailRow}>
                <Text style={styles.detailLabel}>ID Aset :</Text> {selectedRow.assetId}
              </Text>
              <Text style={styles.detailRow}>
                <Text style={styles.detailLabel}>Nama :</Text> {selectedRow.assetName}
              </Text>
              <Text style={styles.detailRow}>
                <Text style={styles.detailLabel}>Tanggal :</Text>{' '}
                {formatDateValue(selectedRow.tanggal)}
              </Text>
              <Text style={styles.detailRow}>
                <Text style={styles.detailLabel}>Jenis :</Text> {selectedRow.jenis}
              </Text>
              <Text style={styles.detailRow}>
                <Text style={styles.detailLabel}>Status :</Text> {selectedRow.statusMeta.label}
              </Text>
              <Text style={styles.detailRow}>
                <Text style={styles.detailLabel}>Pelaksana :</Text>{' '}
                {selectedRow.raw?.penanggungjawab?.nama ||
                  selectedRow.raw?.penanggung_jawab?.nama ||
                  selectedRow.raw?.penanggungjawab_id ||
                  '-'}
              </Text>
              <Text style={styles.detailRow}>
                <Text style={styles.detailLabel}>Deskripsi :</Text>{' '}
                {selectedRow.raw?.alasan_pemeliharaan || '-'}
              </Text>
            </>
          ) : (
            <Text style={styles.emptyText}>Pilih salah satu data untuk melihat detail.</Text>
          )}
        </View>

        {renderPopup(showMonthPopup, monthOptions, opt => {
          if (opt) {
            setSelectedMonth(opt);
          }
          setShowMonthPopup(false);
        })}
        {renderPopup(showStatusPopup, statusOptions, opt => {
          if (opt) {
            setSelectedStatus(opt);
          }
          setShowStatusPopup(false);
        })}
        {renderPopup(showJenisPopup, jenisOptions, opt => {
          if (opt) {
            setSelectedJenis(opt);
          }
          setShowJenisPopup(false);
        })}
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
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E4E4E7',
    paddingHorizontal: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  filterText: {
    fontSize: 11,
    color: '#111827',
  },
  searchButton: {
    width: 38,
    height: 36,
    borderRadius: 6,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  headerCell: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
  },
  list: {
    marginTop: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  rowActive: {
    backgroundColor: '#F0F9FF',
    borderRadius: 6,
  },
  cellText: {
    fontSize: 11,
    color: '#111827',
  },
  statusPill: {
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 12,
    marginVertical: spacing.md,
  },
  detailCard: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  detailRow: {
    fontSize: 12,
    color: '#111827',
    marginBottom: spacing.xs,
  },
  detailLabel: {
    fontWeight: '600',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  popup: {
    marginTop: 90,
    marginLeft: 24,
    backgroundColor: colors.white,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  popupItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  popupText: {
    fontSize: 12,
    color: '#111827',
  },
});

export default LaporanScreen;
