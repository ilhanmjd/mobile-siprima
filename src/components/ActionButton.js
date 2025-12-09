import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, spacing, typography } from '../theme';

const variants = {
  primary: {
    backgroundColor: colors.primary,
    textColor: '#FFFFFF',
  },
  secondary: {
    backgroundColor: colors.secondary,
    textColor: '#FFFFFF',
  },
  success: {
    backgroundColor: colors.accent,
    textColor: '#FFFFFF',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
    textColor: colors.primary,
  },
  danger: {
    backgroundColor: colors.danger,
    textColor: '#FFFFFF',
  },
};

const ActionButton = ({
  label,
  variant = 'primary',
  style,
  textStyle,
  onPress,          // <-- tambahkan di sini
  ...props
}) => {
  const palette = variants[variant] || variants.primary;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: palette.backgroundColor },
        palette.borderColor && { borderWidth: 1, borderColor: palette.borderColor },
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}     // <-- JUSTRU DI SINI!
      {...props}
    >
      <Text style={[styles.label, { color: palette.textColor }, textStyle]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  label: {
    fontSize: typography.body,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.7,
  },
});

export default ActionButton;
