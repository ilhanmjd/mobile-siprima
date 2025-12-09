import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

const paletteMap = {
  success: { backgroundColor: '#E6F7EE', textColor: colors.success },
  warning: { backgroundColor: '#FFF7E6', textColor: colors.warning },
  danger: { backgroundColor: '#FFE7E7', textColor: colors.danger },
  info: { backgroundColor: '#E7F0FF', textColor: colors.info },
  neutral: { backgroundColor: colors.surfaceAlt, textColor: colors.text },
};

const StatusPill = ({ label, tone = 'info', style, textStyle }) => {
  const palette = paletteMap[tone] || paletteMap.info;
  return (
    <View style={[styles.base, { backgroundColor: palette.backgroundColor }, style]}>
      <Text style={[styles.label, { color: palette.textColor }, textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 999,
  },
  label: {
    fontSize: typography.small,
    fontWeight: '600',
  },
});

export default StatusPill;
