import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors, spacing, typography } from '../theme';

const SectionCard = ({ title, subtitle, children, footer }) => (
  <View style={styles.card}>
    {title ? (
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    ) : null}
    <View style={styles.body}>{children}</View>
    {footer ? <View style={styles.footer}>{footer}</View> : null}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.lg,
    gap: spacing.md,
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  header: {
    gap: spacing.xs,
  },
  title: {
    fontSize: typography.heading3,
    color: colors.text,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: typography.small,
    color: colors.textMuted,
  },
  body: {
    gap: spacing.sm,
  },
  footer: {
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});

export default SectionCard;
