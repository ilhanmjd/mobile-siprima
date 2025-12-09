import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import { useNavigation } from '@react-navigation/native';

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = React.useState('Asset');
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const filterOptions = ['Asset', 'Risk', 'Risk Treatment', 'Maintenance', 'Asset Delete'];

  const allItems = [
    { name: 'ASUS Vivobook', status: 'Under Review', type: 'Asset', color: '#8E8E93' },
    { name: 'Komputer', status: 'Accepted', type: 'Asset', color: colors.primary },
    { name: 'Cloud Storage', status: 'Rejected', type: 'Asset', color: '#FF3B30' },

    { name: 'Aset Hilang', status: 'Under Review', type: 'Risk', color: '#8E8E93' },
    { name: 'Virus', status: 'Accepted', type: 'Risk', color: colors.primary },
    { name: 'Pencurian Data', status: 'Rejected', type: 'Risk', color: '#FF3B30' },

    { name: 'Pemasangan Firewall', status: 'Under Review', type: 'Risk Treatment', color: '#8E8E93' },
    { name: 'Pengadaan Lemari Keamanan', status: 'Accepted', type: 'Risk Treatment', color: colors.primary },
    { name: 'Rekrut Saptam', status: 'Rejected', type: 'Risk Treatment', color: '#FF3B30' },

    { name: 'ASUS RoG', status: 'Under Review', type: 'Maintenance', color: '#8E8E93' },
    { name: 'Honda Beat', status: 'Accepted', type: 'Maintenance', color: colors.primary },
    { name: 'Printer', status: 'Rejected', type: 'Maintenance', color: '#FF3B30' },

    { name: 'Lenovo Legion', status: 'Under Review', type: 'Asset Delete', color: '#8E8E93' },
    { name: 'SSD Acer', status: 'Accepted', type: 'Asset Delete', color: colors.primary },
    { name: 'Website Kominfo', status: 'Rejected', type: 'Asset Delete', color: '#FF3B30' },
  ];

  const items = allItems.filter(item => item.type === filter);

  const handleStatusPress = (item) => {
    // khusus FILTER = Risk
    if (filter === 'Risk') {
      if (item.status === 'Accepted') {
        navigation.navigate('NotificationDetail', {
          asset: item.name,
          mode: 'RISK_TREATMENT',   // biar footer-nya: Risk Treatment
        });
        return;
      }
      if (item.status === 'Rejected') {
        navigation.navigate('NotificationRejected', {
          asset: item.name,
          mode: 'RISK',     // biar footer-nya: Input Risiko
        });
        return;
      }
      return; // Under Review: nggak kemana-mana
    }

    // behaviour lama utk filter lain
    if (item.status === 'Accepted') {
      navigation.navigate('NotificationDetail', { asset: item.name });
    } else if (item.status === 'Rejected') {
      navigation.navigate('NotificationRejected', { asset: item.name });
    }
  };

  return (
    <Screen>
      <SectionCard style={styles.card}>
        <Text style={styles.title}>Notifikasi Verifikasi</Text>

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
        <ScrollView contentContainerStyle={styles.list}>
          {items.map((item, index) => (
            <View key={`${item.type}-${index}`} style={styles.row}>
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
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.md,
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
