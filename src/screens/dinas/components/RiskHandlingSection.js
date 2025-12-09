// src/screens/dinas/components/RiskHandlingSection.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing } from '../../../theme';

const RiskHandlingSection = ({ data }) => {
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <View key={item.id} style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.icon}>📅</Text>
            <Text style={styles.asset}>{item.asset_name}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.statusButton,
              item.status === 'Ditangani' ? styles.statusDone : styles.statusProcess,
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EDF4FF',
    borderRadius: 12,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  icon: {
    fontSize: 16,
  },
  asset: {
    fontSize: 13,
    color: colors.text,
  },
  statusButton: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  statusDone: {
    backgroundColor: '#FFD86F',
  },
  statusProcess: {
    backgroundColor: '#FFB74D',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1D3D8F',
  },
});

export default RiskHandlingSection;
