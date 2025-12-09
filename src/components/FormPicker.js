import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

const FormPicker = ({ label, selectedValue, options, onValueChange }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.pickerWrapper}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        <Picker.Item label={`Pilih ${label}`} value="" />
        {options.map((opt) => (
          <Picker.Item label={opt} value={opt} key={opt} />
        ))}
      </Picker>
    </View>
  </View>
);

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
