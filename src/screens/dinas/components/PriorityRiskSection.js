import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import colors from '../../../theme/colors';
import spacing from '../../../theme/spacing';

const PriorityRiskSection = ({ data }) => {
  const screenWidth = Dimensions.get('window').width - spacing.md * 2;

  // Siapkan data untuk BarChart
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
      },
    ],
  };

  return (
  <View style={styles.container}>
    <BarChart
      data={chartData}
      width={screenWidth * 0.9}   // bukan full lebar
      height={180}
      fromZero
      showValuesOnTopOfBars
      yAxisLabel=""
      chartConfig={{
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        fillShadowGradient: colors.secondary,
        fillShadowGradientOpacity: 1,
        decimalPlaces: 0,
        color: () => colors.secondary,
        labelColor: () => colors.text,
      }}
      style={styles.chart}
      withInnerLines={false}
      withHorizontalLabels
      flatColor
    />
  </View>
);
};

const styles = StyleSheet.create({
  chart: {
    borderRadius: 10,
  },
});

export default PriorityRiskSection;
