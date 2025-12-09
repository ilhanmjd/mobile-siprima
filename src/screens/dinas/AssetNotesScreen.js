import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import { colors, spacing } from '../../theme';
import { activeAssets } from '../../data/mockData';
import StatusPill from '../../components/StatusPill';
import ActionButton from '../../components/ActionButton';

const detailMock = {
  category: 'Aset TI',
  subCategory: 'Laptop',
  code: '5060',
  pic: 'Davin',
  status: 'DITOLAK',
  note: 'Dokumen pendukung tidak lengkap / data tidak sesuai dengan standar inventarisasi.',
};

const AssetNotesScreen = () => {
  const [selected, setSelected] = useState(activeAssets[0]);

  return (
    <Screen>
      <SectionCard title="Daftar Aset Aktif">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillRow}>
          {activeAssets.map(item => (
            <Text
              key={item.id}
              style={[styles.pill, selected.id === item.id && styles.pillActive]}
              onPress={() => setSelected(item)}
            >
              {item.name}
            </Text>
          ))}
        </ScrollView>
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Asset {selected.name}</Text>
          <Text style={styles.detailMeta}>10/10/2025 - 17:03:34 PM</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Kategori :</Text>
            <Text style={styles.detailValue}>{detailMock.category}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Sub Kategori :</Text>
            <Text style={styles.detailValue}>{detailMock.subCategory}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Kode Asset :</Text>
            <Text style={styles.detailValue}>{detailMock.code}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Person in Charge :</Text>
            <Text style={styles.detailValue}>{detailMock.pic}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status Pengajuan :</Text>
            <StatusPill label={detailMock.status} tone="danger" />
          </View>
          <Text style={styles.note}>{detailMock.note}</Text>
          <ActionButton label="Input Aset" variant="danger" style={styles.inputButton} />
        </View>
      </SectionCard>
    </Screen>
  );
};

const styles = StyleSheet.create({
  pillRow: {
    flexGrow: 0,
    marginBottom: spacing.md,
  },
  pill: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    color: colors.text,
  },
  pillActive: {
    backgroundColor: '#DCE8FF',
    fontWeight: '700',
  },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  detailTitle: {
    fontWeight: '700',
    fontSize: 18,
  },
  detailMeta: {
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  detailLabel: {
    color: colors.textMuted,
  },
  detailValue: {
    color: colors.text,
    fontWeight: '600',
  },
  note: {
    color: colors.text,
    fontStyle: 'italic',
  },
  inputButton: {
    marginTop: spacing.md,
  },
});

export default AssetNotesScreen;
