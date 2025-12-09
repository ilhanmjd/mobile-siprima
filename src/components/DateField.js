import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

const DateField = ({ label, value, onChange }) => {
  const handlePress = () => {
    onChange('10/10/2025'); // dummy
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.input} onPress={handlePress}>
        <Text style={value ? styles.valueText : styles.placeholderText}>
          {value || 'Pilih tanggal'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: spacing.sm },
  label: {
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface,
  },
  placeholderText: {
    color: colors.textMuted,
  },
  valueText: {
    color: colors.text,
  },
});

export default DateField;
