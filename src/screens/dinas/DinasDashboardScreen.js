import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import { spacing } from '../../theme';
import TopActions from './components/TopActions';
import VerificationChartSection from './components/VerificationChartSection';
import ResidualRiskSection from './components/ResidualRiskSection';
import RiskHandlingSection from './components/RiskHandlingSection';
import PriorityRiskSection from './components/PriorityRiskSection';
import { getDinasAssets, getDinasRisks, getRiskTreatments, getMaintenances } from '../../api/siprima';

const DinasDashboardScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  const [verificationChart, setVerificationChart] = useState(null);
  const [residualRisk, setResidualRisk] = useState(null);
  const [riskHandling, setRiskHandling] = useState([]);
  const [priorityRisks, setPriorityRisks] = useState([]);

  const buildVerificationChart = (assets, risks) => {
    const assetVerified = assets.filter(a => a.status === 'diterima').length;
    const riskVerified = risks.filter(r => r.status === 'accepted').length;

    return {
      labels: ['Verified'],
      datasets: [
        {
          label: 'Asset Verified',
          color: '#7B61FF',
          data: [assetVerified],
        },
        {
          label: 'Risk Verified',
          color: '#FFD86F',
          data: [riskVerified],
        },
      ],
    };
  };

  const buildResidualRisk = (risks) => {
    const high = risks.filter(r =>
      (r.priority || r.level || '').toLowerCase() === 'high',
    ).length;
    const lowMedium = risks.length - high;

    return [
      { label: 'Low / Medium', value: lowMedium, color: '#4CAF50' },
      { label: 'High', value: high, color: '#F44336' },
    ];
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [assetsRes, risksRes, treatmentsRes] = await Promise.all([
          getDinasAssets(),      // GET /api/assets
          getDinasRisks(),       // GET /api/risks
          getRiskTreatments(),   // GET /api/risk-treatments
        ]);

        const assets = assetsRes?.data?.data || [];
        const risks = risksRes?.data?.data || [];
        const treatments = treatmentsRes?.data?.data || [];

        setVerificationChart(buildVerificationChart(assets, risks));
        setResidualRisk(buildResidualRisk(risks));

        setRiskHandling(
          treatments.map(t => ({
            id: t.id,
            asset_name: t.asset_name || t.asset?.name || 'Asset',
            status: t.status,
          })),
        );

        const highRisks = risks.filter(r =>
          (r.prioritas || r.priority || r.level || '').toLowerCase() === 'high',
        );

        setPriorityRisks(
          highRisks.slice(0, 5).map(r => ({
            id: r.id,
            label: r.judul || r.asset_name || r.name || 'Risk',
            value: r.level_risiko || 0,
          })),
        );
      } catch (err) {
        console.log('DINAS DASHBOARD ERROR:', err?.response?.data || err.message);
        Alert.alert('Error', 'Gagal memuat data dashboard dinas');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Screen>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <TopActions navigation={navigation} />

        {verificationChart && (
          <SectionCard title="Verification Asset And Risk">
            <VerificationChartSection data={verificationChart} />
          </SectionCard>
        )}

        {residualRisk && (
          <SectionCard title="Residual Risk">
            <ResidualRiskSection data={residualRisk} />
          </SectionCard>
        )}

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DinasDashboardScreen;
