import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Screen from '../../components/Screen';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';

const FILTERS = ['Asset', 'Risk', 'Risk Treatment', 'Maintenance', 'Asset Deletion'];

const allItems = [
  { id: 1, label: 'Input Aset', type: 'Asset' },
  { id: 2, label: 'Input Risiko', type: 'Risk' },
  { id: 3, label: 'Input Risk Treatment', type: 'Risk Treatment' },
  { id: 4, label: 'Input Maintenance', type: 'Maintenance' },
  { id: 5, label: 'Penghapusan Aset', type: 'Asset Deletion' },
];

const VerifierVerificationScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = React.useState('Asset');

  const items = allItems.filter(i => i.type === activeFilter);

  const handleNext = (item) => {
    // nanti disini arahkan ke detail verifikasi sesuai type & data dari backend
    // contoh:
    // navigation.navigate('VerifierNotifications', { type: item.type })
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Verification</Text>

        {/* FILTER ROW */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterChip,
                activeFilter === f && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === f && styles.filterTextActive,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* LIST DARI FORM USER DINAS (Sementara dummy allItems) */}
        <ScrollView contentContainerStyle={styles.list}>
          {items.map(item => (
            <View key={item.id} style={styles.row}>
              <Text style={styles.rowLabel}>{item.label}</Text>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => handleNext(item)}
              >
                <Text style={styles.nextText}>NEXT</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  filterRow: {
    paddingVertical: 4,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#F2F4F7',
    marginRight: spacing.sm,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 11,
    color: colors.text,
  },
  filterTextActive: {
    color: '#FFF',
    fontWeight: '700',
  },
  list: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7F0FF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  rowLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#0052CC',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  nextText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default VerifierVerificationScreen;
