import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

const StatCard = ({ label, value, accentColor = colors.primary, children }) => (
  <View style={[styles.card, { borderColor: accentColor }]}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, { color: accentColor }]}>{value}</Text>
    {children ? <View style={styles.extra}>{children}</View> : null}
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 24,
    padding: spacing.lg,
    backgroundColor: '#fff',
    gap: spacing.sm,
  },
  label: {
    fontSize: typography.small,
    color: colors.textMuted,
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
  },
  extra: {
    marginTop: spacing.sm,
  },
});

export default StatCard;
