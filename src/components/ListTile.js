import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';
import StatusPill from './StatusPill';

const ListTile = ({ title, subtitle, status, statusTone = 'info', icon }) => (
  <View style={styles.row}>
    <View style={styles.details}>
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
    {status ? <StatusPill label={status} tone={statusTone} /> : null}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: typography.small,
    color: colors.textMuted,
    marginTop: 2,
  },
});

export default ListTile;
