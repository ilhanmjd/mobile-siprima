import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors, spacing } from '../../../theme';

const VerificationChartSection = ({ data }) => {
  const screenWidth = Dimensions.get('window').width - spacing.md * 4; // padding kiri/kanan

  return (
    <View style={styles.container}>
      <Text style={styles.legendTitle}>{data.datasets[0]?.label || 'Asset Verified'}</Text>
      <LineChart
        data={{
          labels: data.labels,
          datasets: data.datasets.map((ds) => ({
            data: ds.data,
            color: () => ds.color, // pake warna dataset
          })),
        }}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(123, 97, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(60,60,60,${opacity})`,
        }}
        bezier
        style={styles.chartStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  legendTitle: { fontSize: 13, fontWeight: '600', color: colors.text },
  chartStyle: { borderRadius: 12
   },
});

export default VerificationChartSection;
