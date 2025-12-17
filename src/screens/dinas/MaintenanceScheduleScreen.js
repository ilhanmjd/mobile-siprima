import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import dayjs from 'dayjs';
import { getMaintenances } from '../../api/siprima';

const statusLabel = status => {
  const normalized = String(status || '')
    .trim()
    .toLowerCase();
  if (['accepted', 'selesai', 'done', 'diterima'].includes(normalized)) {
    return 'Selesai';
  }
  if (
    ['rejected', 'ditolak', 'declined'].includes(normalized)
  ) {
    return 'Ditolak';
  }
  if (['penanganan', 'in_progress'].includes(normalized)) {
    return 'Penanganan';
  }
  return 'Due';
};

const MaintenanceScheduleScreen = () => {
  const navigation = useNavigation();
  const [schedule, setSchedule] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const res = await getMaintenances();
      const data = res?.data?.data || [];
      setSchedule(data);
    } catch (err) {
      console.log('LOAD MAINTENANCE SCHEDULE ERROR:', err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSchedule();
  }, []);

  const formatRow = item => {
    const asset = item?.asset;
    const risk = item?.risk;
    const jadwal =
      item?.jadwal_pemeliharaan ||
      item?.target_tanggal ||
      item?.created_at;
    return {
      id: asset?.kode_bmd || asset?.id || item?.asset_id || `MT-${item.id}`,
      nama: asset?.nama || `Asset ${item.asset_id || item.id}`,
      risiko: risk?.judul || item?.alasan_pemeliharaan || '-',
      level: risk?.kriteria || risk?.level_risiko || '-',
      jadwal: jadwal ? dayjs(jadwal).format('DD MMM YYYY') : '-',
      status: statusLabel(item?.status_review || item?.status),
    };
  };

  return (
    <Screen>
      <SectionCard style={styles.card}>
        {/* Header title + filter + tombol laporan */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Jadwal Pemeliharaan</Text>

          <View style={styles.headerRight}>
            <Pressable style={styles.iconButton} onPress={fetchSchedule}>
              {loading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Icon name="refresh-ccw" size={18} color="#000" />
              )}
            </Pressable>
            <Pressable
              style={styles.reportButton}
              onPress={() => navigation.navigate('Dashboard', { screen: 'Laporan' })}
            >
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
          {(schedule || []).map(item => {
            const row = formatRow(item);
            return (
              <View key={`${item.id}-${row.id}`} style={styles.row}>
                <View style={[styles.cell, { flex: 2 }]}>
                  <Text style={styles.boldText}>{row.id}</Text>
                  <Text style={styles.normalText}>{row.nama}</Text>
                </View>
                <View style={[styles.cell, { flex: 2 }]}>
                  <Text style={styles.normalText}>{row.risiko}</Text>
                </View>
                <View style={[styles.cell, { flex: 1 }]}>
                  <Text style={styles.boldText}>{row.level}</Text>
                </View>
                <View style={[styles.cell, { flex: 1 }]}>
                  <Text style={styles.boldText}>{row.jadwal}</Text>
                </View>
                <View style={[styles.cell, { flex: 1 }]}>
                  <Text style={styles.normalText}>{row.status}</Text>
                </View>
              </View>
            );
          })}
          {!loading && !schedule.length && (
            <Text style={styles.emptyText}>Belum ada jadwal pemeliharaan.</Text>
          )}
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
  emptyText: {
    textAlign: 'center',
    color: colors.textMuted,
    marginTop: spacing.md,
  },
});

export default MaintenanceScheduleScreen;
