import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

const StepIndicator = ({ steps, activeIndex = 0 }) => (
  <View style={styles.container}>
    {steps.map((step, index) => {
      const isActive = index === activeIndex;
      const isCompleted = index < activeIndex;
      return (
        <View key={step} style={styles.stepWrapper}>
          <View
            style={[
              styles.circle,
              (isActive || isCompleted) && styles.circleActive,
              isCompleted && styles.circleCompleted,
            ]}
          >
            <Text style={[styles.circleLabel, (isActive || isCompleted) && styles.circleLabelActive]}>
              {index + 1}
            </Text>
          </View>
          <Text style={[styles.label, (isActive || isCompleted) && styles.labelActive]}>{step}</Text>
          {index < steps.length - 1 ? (
            <View
              style={[
                styles.connector,
                isCompleted ? styles.connectorActive : styles.connectorInactive,
              ]}
            />
          ) : null}
        </View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  circleActive: {
    borderColor: colors.primary,
  },
  circleCompleted: {
    backgroundColor: colors.primary,
  },
  circleLabel: {
    color: colors.textMuted,
    fontWeight: '600',
  },
  circleLabelActive: {
    color: '#fff',
  },
  label: {
    marginTop: spacing.xs,
    fontSize: typography.small,
    color: colors.textMuted,
    textAlign: 'center',
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  connector: {
    position: 'absolute',
    top: 18,
    left: '50%',
    right: '-50%',
    height: 2,
    backgroundColor: colors.border,
  },
  connectorActive: {
    backgroundColor: colors.primary,
  },
  connectorInactive: {
    backgroundColor: colors.border,
  },
});

export default StepIndicator;
