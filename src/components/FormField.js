import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

const FormField = ({
  label,
  placeholder,
  value,
  onChangeText,
  inputProps = {},
  rightContent,
  multiline = false,
  style,
  editable = true,
}) => (
  <View style={[styles.wrapper, style]}>
    {label ? <Text style={styles.label}>{label}</Text> : null}
    
    <View style={styles.inputWrapper}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        style={[
          styles.input,
          multiline && styles.multiline,
          !editable && styles.readonly,
        ]}
        multiline={multiline}
        editable={editable}
        {...inputProps}
      />
      {rightContent ? <View style={styles.right}>{rightContent}</View> : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  label: {
    fontSize: typography.small,
    color: colors.text,
    fontWeight: '500',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    backgroundColor: '#fff',
    fontSize: typography.body,
    color: colors.text,
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
  right: {
    position: 'absolute',
    right: spacing.md,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  readonly: {
    backgroundColor: '#F6F7FB',
    color: colors.textMuted,
  },
});

export default FormField;
