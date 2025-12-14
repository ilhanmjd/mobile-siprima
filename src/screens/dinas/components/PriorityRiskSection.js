// src/dinas/components/PriorityRiskSection.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import colors from '../../../theme/colors';
import spacing from '../../../theme/spacing';

const screenWidth = Dimensions.get('window').width;

const PriorityRiskSection = ({ data }) => {
  const hasData = data && data.length > 0;

  const labels = hasData
    ? data.map(i =>
        (i.label || 'Risk').length > 12
          ? i.label.slice(0, 12) + '…'
          : i.label,
      )
    : ['-'];

  const values = hasData ? data.map(i => i.value || 0) : [0];

  const chartData = {
    labels,
    datasets: [{ data: values }],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(123, 97, 255, ${opacity})`, // ungu muda
    labelColor: () => '#B0B0C3',
    propsForBackgroundLines: {
      strokeWidth: 0, // HAPUS garis grid
    },
  };

  return (
    <View style={styles.container}>
      <BarChart
        data={chartData}
        width={screenWidth - spacing.lg * 2}
        height={170}
        chartConfig={chartConfig}
        fromZero
        withInnerLines={false}   // tidak ada garis dalam
        withHorizontalLabels
        showValuesOnTopOfBars
        style={styles.chart}
        verticalLabelRotation={-20}
      />
      {!hasData && (
        <Text style={styles.emptyText}>Belum ada risiko prioritas.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.sm,
  },
  chart: {
    borderRadius: 16,
  },
  emptyText: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
    color: '#B0B0C3',
  },
});

export default PriorityRiskSection;
