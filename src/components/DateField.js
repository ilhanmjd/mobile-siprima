import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

const DateField = ({ label, value, onChange }) => {
  const [show, setShow] = useState(false);

  const handleChange = (_, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      onChange(selectedDate); // kirim Date ke parent (AssetWizardScreen)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable onPress={() => setShow(true)} style={styles.input}>
        <Text>
          {value ? dayjs(value).format('DD/MM/YYYY') : 'Pilih tanggal'}
        </Text>
      </Pressable>
      {show && (
        <DateTimePicker
          mode="date"
          value={value || new Date()}
          onChange={handleChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 4 },
  label: { fontSize: 12 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
});

export default DateField;
