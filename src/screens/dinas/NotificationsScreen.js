import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import { useFocusEffect } from '@react-navigation/native';
import {
  getDinasAssets,
  getDinasRisks,
  getRiskTreatments,
  getMaintenances,
  getAssetDeletions,
} from '../../api/siprima';

const NotificationsScreen = ({ navigation, route }) => {
  const [filter, setFilter] = React.useState(
    route?.params?.initialFilter || 'Asset',
  );
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [assetItems, setAssetItems] = React.useState([]);
  const [riskItems, setRiskItems] = React.useState([]);
  const [riskTreatmentItems, setRiskTreatmentItems] = React.useState([]);
  const [loadingAssets, setLoadingAssets] = React.useState(false);
  const [loadingRisks, setLoadingRisks] = React.useState(false);
  const [loadingRiskTreatments, setLoadingRiskTreatments] = React.useState(false);
  const [maintenanceItems, setMaintenanceItems] = React.useState([]);
  const [loadingMaintenances, setLoadingMaintenances] = React.useState(false);
  const [assetDeletionItems, setAssetDeletionItems] = React.useState([]);
  const [loadingAssetDeletions, setLoadingAssetDeletions] = React.useState(false);

  const filterOptions = ['Asset', 'Risk', 'Risk Treatment', 'Maintenance', 'Asset Delete'];

  const STATUS_META = {
    pending: { label: 'Under Review', color: '#8E8E93' },
    'under review': { label: 'Under Review', color: '#8E8E93' },
    under_review: { label: 'Under Review', color: '#8E8E93' },
    menunggu: { label: 'Under Review', color: '#8E8E93' },
    review: { label: 'Under Review', color: '#8E8E93' },

    approved: { label: 'Accepted', color: colors.primary },
    accepted: { label: 'Accepted', color: colors.primary },
    diterima: { label: 'Accepted', color: colors.primary },
    disetujui: { label: 'Accepted', color: colors.primary },

    rejected: { label: 'Rejected', color: '#FF3B30' },
    declined: { label: 'Rejected', color: '#FF3B30' },
    ditolak: { label: 'Rejected', color: '#FF3B30' },

    default: { label: 'Under Review', color: '#8E8E93' },
  };

  const FALLBACK_ASSET_ITEMS = [
    { name: 'ASUS Vivobook', status: 'Under Review', type: 'Asset', color: '#8E8E93' },
    { name: 'Komputer', status: 'Accepted', type: 'Asset', color: colors.primary },
    { name: 'Cloud Storage', status: 'Rejected', type: 'Asset', color: '#FF3B30' },
  ];

  const FALLBACK_RISK_ITEMS = [
    { name: 'Aset Hilang', status: 'Under Review', type: 'Risk', color: '#8E8E93' },
    { name: 'Virus', status: 'Accepted', type: 'Risk', color: colors.primary },
    { name: 'Pencurian Data', status: 'Rejected', type: 'Risk', color: '#FF3B30' },
  ];

  const FALLBACK_RISK_TREATMENTS = [
    { name: 'Pemasangan Firewall', status: 'Under Review', type: 'Risk Treatment', color: '#8E8E93' },
    { name: 'Pengadaan Lemari Keamanan', status: 'Accepted', type: 'Risk Treatment', color: colors.primary },
    { name: 'Rekrut Saptam', status: 'Rejected', type: 'Risk Treatment', color: '#FF3B30' },
  ];
  const FALLBACK_MAINTENANCE_ITEMS = [
    { name: 'Maintenance Printer Canon iR 2006N', status: 'Under Review', type: 'Maintenance', color: '#8E8E93' },
    { name: 'Maintenance Laptop Dell Latitude 5420', status: 'Under Review', type: 'Maintenance', color: '#8E8E93' },
  ];
  const FALLBACK_ASSET_DELETION_ITEMS = [
    { name: 'Lenovo Legion', status: 'Under Review', type: 'Asset Delete', color: '#8E8E93' },
    { name: 'SSD Acer', status: 'Accepted', type: 'Asset Delete', color: colors.primary },
    { name: 'Website Kominfo', status: 'Rejected', type: 'Asset Delete', color: '#FF3B30' },
  ];

  const staticItems = [
    // Risk Treatment fallback inserted separately
    { name: 'ASUS RoG', status: 'Under Review', type: 'Maintenance', color: '#8E8E93' },
    { name: 'Honda Beat', status: 'Accepted', type: 'Maintenance', color: colors.primary },
    { name: 'Printer', status: 'Rejected', type: 'Maintenance', color: '#FF3B30' },
  ];

  const fetchAssets = React.useCallback(async () => {
    try {
      setLoadingAssets(true);
      const res = await getDinasAssets();
      const data = res?.data?.data || [];
      const mapped = data.map(asset => {
        const statusKey = String(asset.status || '').trim().toLowerCase();
        const statusMeta = STATUS_META[statusKey] || STATUS_META.default;
        return {
          id: asset.id,
          name: asset.nama || 'Asset',
          status: statusMeta.label,
          type: 'Asset',
          color: statusMeta.color,
          originalStatus: asset.status,
          assetData: asset,
        };
      });
      setAssetItems(mapped);
    } catch (err) {
      console.log('LOAD ASSET NOTIFS ERROR:', err?.response?.data || err.message);
    } finally {
      setLoadingAssets(false);
    }
  }, []);

  const fetchRisks = React.useCallback(async () => {
    try {
      setLoadingRisks(true);
      const res = await getDinasRisks();
      const data = res?.data?.data || [];
      const mapped = data.map(risk => {
        const statusKey = String(risk.status || '').trim().toLowerCase();
        const statusMeta = STATUS_META[statusKey] || STATUS_META.default;
        return {
          id: risk.id,
          name: risk.judul || risk.asset?.nama || 'Risiko',
          status: statusMeta.label,
          type: 'Risk',
          color: statusMeta.color,
          originalStatus: risk.status,
          riskData: risk,
        };
      });
      setRiskItems(mapped);
    } catch (err) {
      console.log('LOAD RISKS ERROR:', err?.response?.data || err.message);
    } finally {
      setLoadingRisks(false);
    }
  }, []);

  const fetchRiskTreatments = React.useCallback(async () => {
    try {
      setLoadingRiskTreatments(true);
      const res = await getRiskTreatments();
      const data = res?.data?.data || [];
      const mapped = data.map(rt => {
        const statusKey = String(rt.status || '').trim().toLowerCase();
        const statusMeta = STATUS_META[statusKey] || STATUS_META.default;
        const assetLabel =
          rt.risk?.asset?.nama ||
          rt.asset?.nama ||
          rt.asset_name ||
          '';
        return {
          id: rt.id,
          name: assetLabel
            ? `Risk Treatment Asset ${assetLabel}`
            : rt.strategi || `Risk Treatment ${rt.id}`,
          status: statusMeta.label,
          type: 'Risk Treatment',
          color: statusMeta.color,
          originalStatus: rt.status,
          riskTreatmentData: rt,
        };
      });
      setRiskTreatmentItems(mapped);
    } catch (err) {
      console.log('LOAD RISK TREATS ERROR:', err?.response?.data || err.message);
    } finally {
      setLoadingRiskTreatments(false);
    }
  }, []);

  const fetchMaintenances = React.useCallback(async () => {
    try {
      setLoadingMaintenances(true);
      const res = await getMaintenances();
      const data = res?.data?.data || [];
      const mapped = data.map(mt => {
        const statusKey = String(
          mt.status_review || mt.status || '',
        )
          .trim()
          .toLowerCase();
        const statusMeta = STATUS_META[statusKey] || STATUS_META.default;
        return {
          id: mt.id,
          name: mt.alasan_pemeliharaan || mt.asset?.nama || `Maintenance ${mt.id}`,
          status: statusMeta.label,
          type: 'Maintenance',
          color: statusMeta.color,
          originalStatus: mt.status_review || mt.status,
          maintenanceData: mt,
        };
      });
      setMaintenanceItems(mapped);
    } catch (err) {
      console.log('LOAD MAINTENANCE ERROR:', err?.response?.data || err.message);
    } finally {
      setLoadingMaintenances(false);
    }
  }, []);

  const fetchAssetDeletions = React.useCallback(async () => {
    try {
      setLoadingAssetDeletions(true);
      const res = await getAssetDeletions();
      const data = res?.data?.data || [];
      const mapped = data.map(item => {
        const statusKey = String(item.status || '').trim().toLowerCase();
        const statusMeta = STATUS_META[statusKey] || STATUS_META.default;
        return {
          id: item.id,
          name: item.asset?.nama || `Penghapusan Aset ${item.id}`,
          status: statusMeta.label,
          type: 'Asset Delete',
          color: statusMeta.color,
          originalStatus: item.status,
          assetDeletionData: item,
        };
      });
      setAssetDeletionItems(mapped);
    } catch (err) {
      console.log('LOAD ASSET DELETION ERROR:', err?.response?.data || err.message);
    } finally {
      setLoadingAssetDeletions(false);
    }
  }, []);

  const fetchAll = React.useCallback(() => {
    fetchAssets();
    fetchRisks();
    fetchRiskTreatments();
    fetchMaintenances();
    fetchAssetDeletions();
  }, [
    fetchAssets,
    fetchRisks,
    fetchRiskTreatments,
    fetchMaintenances,
    fetchAssetDeletions,
  ]);

  React.useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useFocusEffect(
    React.useCallback(() => {
      fetchAll();
    }, [fetchAll]),
  );

  React.useEffect(() => {
    if (!route?.params?.initialFilter) {
      return;
    }
    setFilter(route.params.initialFilter);
    navigation.setParams({ initialFilter: undefined });
  }, [route?.params?.initialFilter, navigation]);

  const getItemsForFilter = () => {
    if (filter === 'Asset') {
      return assetItems.length ? assetItems : FALLBACK_ASSET_ITEMS;
    }
    if (filter === 'Risk') {
      return riskItems.length ? riskItems : FALLBACK_RISK_ITEMS;
    }
    if (filter === 'Risk Treatment') {
      return riskTreatmentItems.length
        ? riskTreatmentItems
        : FALLBACK_RISK_TREATMENTS;
    }
    if (filter === 'Maintenance') {
      if (maintenanceItems.length) {
        return maintenanceItems.map(item => ({
          ...item,
          name: item.maintenanceData?.asset?.nama
            ? `Maintenance ${item.maintenanceData.asset.nama}`
            : item.name,
        }));
      }
      return FALLBACK_MAINTENANCE_ITEMS;
    }
    if (filter === 'Asset Delete') {
      return assetDeletionItems.length
        ? assetDeletionItems
        : FALLBACK_ASSET_DELETION_ITEMS;
    }
    return staticItems.filter(item => item.type === filter);
  };

  const items = getItemsForFilter();

  const handleStatusPress = (item) => {
    // khusus FILTER = Risk
    if (filter === 'Risk') {
      if (item.status === 'Accepted') {
        navigation.navigate('NotificationDetail', {
          asset: item.name,
          mode: 'RISK_TREATMENT',   // biar footer-nya: Risk Treatment
          riskId: item.id,
          riskData: item.riskData,
        });
        return;
      }
      if (item.status === 'Rejected') {
        navigation.navigate('NotificationRejected', {
          asset: item.name,
          mode: 'RISK',     // biar footer-nya: Input Risiko
          riskId: item.id,
          riskData: item.riskData,
        });
        return;
      }
      return; // Under Review: nggak kemana-mana
    }

    if (filter === 'Risk Treatment') {
      if (item.status === 'Accepted') {
        navigation.navigate('NotificationDetail', {
          asset: item.name,
          mode: 'RISK_TREATMENT',
          riskId:
            item.riskTreatmentData?.risiko_id ??
            item.riskTreatmentData?.risk_id ??
            item.riskTreatmentData?.risk?.id,
          riskTreatmentData: item.riskTreatmentData,
          riskData: item.riskTreatmentData?.risk,
        });
        return;
      }
      if (item.status === 'Rejected') {
        navigation.navigate('NotificationRejected', {
          asset: item.name,
          mode: 'RISK_TREATMENT',
          riskId:
            item.riskTreatmentData?.risiko_id ??
            item.riskTreatmentData?.risk_id ??
            item.riskTreatmentData?.risk?.id,
          riskTreatmentData: item.riskTreatmentData,
          riskData: item.riskTreatmentData?.risk,
        });
        return;
      }
      return;
    }

    if (filter === 'Maintenance') {
      if (item.status === 'Accepted') {
        navigation.navigate('NotificationDetail', {
          asset: item.name,
          mode: 'MAINTENANCE',
          maintenanceData: item.maintenanceData,
        });
        return;
      }
      if (item.status === 'Rejected') {
        navigation.navigate('NotificationRejected', {
          asset: item.name,
          mode: 'MAINTENANCE',
          maintenanceData: item.maintenanceData,
        });
        return;
      }
      return;
    }

    // behaviour lama utk filter lain
    if (item.status === 'Accepted') {
      navigation.navigate('NotificationDetail', {
        asset: item.name,
        assetId: item.id,
        assetData: item.assetData,
      });
    } else if (item.status === 'Rejected') {
      navigation.navigate('NotificationRejected', {
        asset: item.name,
        assetData: item.assetData,
      });
    }
  };

  return (
    <Screen>
      <SectionCard style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Notifikasi Verifikasi</Text>
          <Pressable style={styles.refreshButton} onPress={fetchAll}>
            <Text style={styles.refreshText}>Refresh</Text>
          </Pressable>
        </View>

        {/* Filter dropdown */}
        <View style={styles.filterWrapper}>
          <Pressable
            style={styles.filterBox}
            onPress={() => setIsFilterOpen(true)}
          >
            <Text style={styles.filterPlaceholder}>
              {filter || 'Pilih kategori'}
            </Text>
            <Text style={styles.filterIcon}>⌄</Text>
          </Pressable>
        </View>

        {/* List notifikasi */}
        {filter === 'Asset' && loadingAssets ? (
          <View style={styles.loaderWrapper}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.loadingText}>Memuat notifikasi asset...</Text>
          </View>
        ) : filter === 'Risk' && loadingRisks ? (
          <View style={styles.loaderWrapper}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.loadingText}>Memuat notifikasi risiko...</Text>
          </View>
        ) : filter === 'Risk Treatment' && loadingRiskTreatments ? (
          <View style={styles.loaderWrapper}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.loadingText}>Memuat risk treatment...</Text>
          </View>
        ) : filter === 'Maintenance' && loadingMaintenances ? (
          <View style={styles.loaderWrapper}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.loadingText}>Memuat maintenance...</Text>
          </View>
        ) : filter === 'Asset Delete' && loadingAssetDeletions ? (
          <View style={styles.loaderWrapper}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.loadingText}>Memuat penghapusan aset...</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.list}>
            {items.map((item, index) => (
              <View key={`${item.type}-${item.id || index}`} style={styles.row}>
                <View style={styles.assetPill}>
                  <Text style={styles.assetText}>{item.name}</Text>
                </View>

                {item.status === 'Under Review' ? (
                  <View style={[styles.statusPill, { backgroundColor: item.color }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                ) : (
                  <Pressable
                    style={[styles.statusPill, { backgroundColor: item.color }]}
                    onPress={() => handleStatusPress(item)}
                  >
                    <Text style={styles.statusText}>{item.status}</Text>
                  </Pressable>
                )}
              </View>
            ))}
          </ScrollView>
        )}

        {/* Popup filter */}
        {isFilterOpen && (
          <Pressable
            style={styles.overlay}
            onPress={() => setIsFilterOpen(false)}
          >
            <View style={styles.popupContainer}>
              {filterOptions.map((option, index) => (
                <Pressable
                  key={option}
                  style={[
                    styles.dropdownItem,
                    index !== filterOptions.length - 1 && styles.dropdownDivider,
                  ]}
                  onPress={() => {
                    setFilter(option);
                    setIsFilterOpen(false);
                  }}
                >
                  <Text style={styles.dropdownText}>{option}</Text>
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
  card: { position: 'relative' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  refreshButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  refreshText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  filterWrapper: {
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
    zIndex: 1,
  },
  filterBox: {
    width: 180,
    height: 36,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  filterPlaceholder: {
    fontSize: 12,
    color: '#555555',
  },
  filterIcon: {
    fontSize: 12,
  },
  list: {
    gap: spacing.md,
    zIndex: 1,
  },
  loaderWrapper: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.lg,
  },
  loadingText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  assetPill: {
    flex: 1,
    backgroundColor: '#E5F0FF',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  assetText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusPill: {
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    zIndex: 10,
  },
  popupContainer: {
    marginTop: 78,
    marginLeft: 16,
    width: 180,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    elevation: 10,
    zIndex: 11,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  dropdownItem: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  dropdownDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  dropdownText: {
    fontSize: 12,
  },
});

export default NotificationsScreen;
