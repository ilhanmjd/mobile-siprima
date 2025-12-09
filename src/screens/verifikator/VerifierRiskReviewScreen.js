import React from 'react';
import { View, StyleSheet } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import StepIndicator from '../../components/StepIndicator';
import FormField from '../../components/FormField';
import ActionButton from '../../components/ActionButton';
import { wizardSteps } from '../../data/mockData';
import { spacing } from '../../theme';

const VerifierRiskReviewScreen = () => (
  <Screen>
    <SectionCard title="Rencana Perlakuan" subtitle="Form verifikasi penanganan risiko.">
      <StepIndicator steps={wizardSteps.risk} activeIndex={1} />
      <View style={styles.form}>
        <FormField label="ID Risiko" placeholder="r10235" />
        <FormField label="Strategi" placeholder="Mitigate" />
        <FormField label="Pengendalian" placeholder="Ganti perangkat" />
        <FormField label="Penanggung Jawab" placeholder="PIC Service Desk" />
        <FormField label="Target Tanggal" placeholder="20 Okt 2025" />
        <FormField label="Biaya" placeholder="Rp 7.500.000" />
        <View style={styles.actions}>
          <ActionButton label="Reject" variant="danger" style={{ flex: 1 }} />
          <ActionButton label="Verifikasi" variant="success" style={{ flex: 1 }} />
        </View>
      </View>
    </SectionCard>

    <SectionCard title="Residual Risk">
      <StepIndicator steps={['Rencana Perlakuan', 'Residual Risiko']} activeIndex={1} />
      <FormField label="Probabilitas Akhir" placeholder="Rendah" />
      <FormField label="Dampak Akhir" placeholder="Sedang" />
      <FormField label="Level Residual" placeholder="Low" />
      <View style={styles.actions}>
        <ActionButton label="Reject" variant="outline" style={{ flex: 1 }} />
        <ActionButton label="Verifikasi" variant="secondary" style={{ flex: 1 }} />
      </View>
    </SectionCard>
  </Screen>
);

const styles = StyleSheet.create({
  form: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
});

export default VerifierRiskReviewScreen;
