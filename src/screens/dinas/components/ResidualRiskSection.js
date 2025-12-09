import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import colors from '../../../theme/colors';
import spacing from '../../../theme/spacing';

const ResidualRiskSection = ({ data }) => {
  const screenWidth = Dimensions.get('window').width;

  const chartData = data.map((item) => ({
    name: item.label,
    population: item.value,
    color: item.color,
    legendFontColor: colors.text,
    legendFontSize: 12,
  }));

  return (
  <View style={styles.container}>
    <View style={styles.pieContainer}>
      <PieChart
        data={chartData}
        width={100}
        height={120}
        chartConfig={{
          color: () => colors.primary,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="25"
        hasLegend={false}
      />
    </View>
    <View style={styles.legend}>
      {data.map((item) => (
        <View key={item.label} style={styles.legendRow}>
          <View style={[styles.dot, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>{`${item.value}% - ${item.label}`}</Text>
        </View>
      ))}
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  pieContainer: {
    width: 100,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  legend: {
    alignItems: 'flex-start',
    flex: 1,
    gap: spacing.xs,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: colors.text,
  },
});

export default ResidualRiskSection;
