import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

const FormPicker = ({
  label,
  selectedValue,
  options = [],
  onValueChange,
}) => {
  const normalizedOptions = options.map((opt, idx) => {
    if (typeof opt === 'string') {
      return { label: opt, value: opt, key: opt };
    }

    if (typeof opt === 'object' && opt !== null) {
      const labelText =
        typeof opt.label === 'string'
          ? opt.label
          : String(opt.label ?? opt.value ?? idx);
      const value = opt.value ?? opt.label ?? idx;
      return { label: labelText, value, key: opt.value ?? idx };
    }

    const fallback = String(opt ?? idx);
    return { label: fallback, value: fallback, key: fallback };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
        >
          <Picker.Item label={`Pilih ${label}`} value="" />
          {normalizedOptions.map(opt => (
            <Picker.Item
              label={opt.label}
              value={opt.value}
              key={opt.key}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },
  label: {
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  picker: {
    backgroundColor: "#FFF",
  }
});

export default FormPicker;
