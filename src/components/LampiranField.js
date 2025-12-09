import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

const LampiranField = ({ label, value, onChange, disabled }) => {
  const handlePick = async () => {
    if (disabled) return;

    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*'],
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const file = result.assets[0];
    onChange(file);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePick}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>
          {value ? value.name : 'Pilih file (PDF / Foto)'}
        </Text>
      </TouchableOpacity>

      {value && (
        <View style={styles.fileRow}>
          <Text style={styles.helper}>
            {value.mimeType} • {(value.size / 1024).toFixed(1)} KB
          </Text>
          {!disabled && (
            <TouchableOpacity onPress={() => onChange(null)}>
              <Text style={styles.delete}>Hapus</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 4,
  },
  delete: {
    color: colors.danger,
    fontWeight: '700',
    marginLeft: spacing.sm,
    fontSize: 12,
  },

  container: {
    marginBottom: spacing.sm,
  },
  label: {
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  button: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface,
  },
  buttonText: {
    color: colors.info,
  },
  helper: {
    marginTop: 4,
    fontSize: 11,
    color: colors.textMuted,
  },
});

export default LampiranField;
