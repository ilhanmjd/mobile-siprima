import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import { spacing } from '../../theme';
import TopActions from './components/TopActions';
import VerificationChartSection from './components/VerificationChartSection';
import ResidualRiskSection from './components/ResidualRiskSection';
import RiskHandlingSection from './components/RiskHandlingSection';
import PriorityRiskSection from './components/PriorityRiskSection';
import {
  dashboardStats,
  verificationChart,
  residualRisk,
  riskHandling,
  priorityRisks,
} from '../../data/dashboardDinasMock';

const DinasDashboardScreen = ({ navigation }) => {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <TopActions navigation={navigation} />

        <SectionCard title="Verification Asset And Risk">
          <VerificationChartSection data={verificationChart} />
        </SectionCard>

        <SectionCard title="Residual Risk">
          <ResidualRiskSection data={residualRisk} />
        </SectionCard>

        <SectionCard title="Penanganan Risiko">
          <RiskHandlingSection data={riskHandling} />
        </SectionCard>

        <SectionCard title="Risiko Prioritas">
          <PriorityRiskSection data={priorityRisks} />
        </SectionCard>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
});

export default DinasDashboardScreen;
