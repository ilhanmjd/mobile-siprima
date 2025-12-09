import React from 'react';
import { View, StyleSheet, Modal, Text } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import StepIndicator from '../../components/StepIndicator';
import FormField from '../../components/FormField';
import FormPicker from '../../components/FormPicker';
import DateField from '../../components/DateField';
import LampiranField from '../../components/LampiranField';
import ActionButton from '../../components/ActionButton';
import spacing from '../../theme/spacing';
import Icon from 'react-native-vector-icons/Feather';
import { wizardSteps } from '../../data/mockData';

const RiskTreatmentWizardScreen = ({ navigation, route }) => {
  const steps = wizardSteps.riskTreatment || ['Rencana', 'Residual']; // kalau belum ada di mockData
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isReview, setIsReview] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const initialData = route?.params?.initialData || {};

  const [form, setForm] = React.useState({
    idRisiko: initialData.idRisiko || '',
    strategi: initialData.strategi || '',
    pengendalian: initialData.pengendalian || '',
    penanggungJawab: initialData.penanggungJawab || '',
    targetTanggal: initialData.targetTanggal || '',
    biaya: initialData.biaya || '',
    probabilitasAkhir: initialData.probabilitasAkhir || '',
    dampakAkhir: initialData.dampakAkhir || '',
    levelResidual: initialData.levelResidual || '',
    lampiran: initialData.lampiran || null,
  });

  const hitungLevelResidual = (probStr, impactStr) => {
    const prob = Number(probStr) || 0;
    const impact = Number(impactStr) || 0;
    const level = prob * impact;
    return level ? String(level) : '';
  };

  const handleProbChange = val => {
    setForm(f => ({
      ...f,
      probabilitasAkhir: val,
      levelResidual: hitungLevelResidual(val, f.dampakAkhir),
    }));
  };

  const handleImpactChange = val => {
    setForm(f => ({
      ...f,
      dampakAkhir: val,
      levelResidual: hitungLevelResidual(f.probabilitasAkhir, val),
    }));
  };

  const goNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
  };

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const isLastStep = currentStep === steps.length - 1;

  // ====== HALAMAN REVIEW ======
  if (isReview) {
    return (
      <Screen>
        <SectionCard title="Konfirmasi Risk Treatment">
          <View style={styles.reviewGrid}>
            <FormField label="ID Risiko" value={form.idRisiko} editable={false} />
            <FormField label="Strategi" value={form.strategi} editable={false} />
            <FormField label="Pengendalian" value={form.pengendalian} editable={false} />
            <FormField label="Penanggung Jawab" value={form.penanggungJawab} editable={false} />
            <FormField label="Target Tanggal" value={form.targetTanggal} editable={false} />
            <FormField label="Biaya" value={form.biaya} editable={false} />
            <FormField label="Probabilitas Akhir" value={form.probabilitasAkhir} editable={false} />
            <FormField label="Dampak Akhir" value={form.dampakAkhir} editable={false} />
            <FormField label="Level Residual" value={form.levelResidual} editable={false} />
            <LampiranField
              label="Lampiran"
              value={form.lampiran}
              onChange={() => {}}
              disabled
            />
          </View>

          <View style={styles.reviewActions}>
            <ActionButton
              label="Batal"
              variant="outline"
              onPress={() => setIsReview(false)}
            />
            <ActionButton
              label="Konfirmasi"
              onPress={() => setShowSuccess(true)}
            />
          </View>
        </SectionCard>

        <Modal
          visible={showSuccess}
          transparent
          animationType="fade"
          onRequestClose={() => setShowSuccess(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={styles.iconWrapper}>
                <Icon name="check-circle" size={96} color="#4D8DFF" />
              </View>
              <Text style={styles.modalTitle}>Risk treatment has been submitted</Text>
              <Text style={styles.modalSubtitle}>Successfully.</Text>

              <View style={styles.modalActions}>
                <ActionButton
                  label="Home"
                  variant="outline"
                  onPress={() => {
                    setShowSuccess(false);
                    navigation.navigate('Dashboard', { screen: 'DinasMain' });
                  }}
                />
                <ActionButton
                  label="Next"
                  onPress={() => {
                    setShowSuccess(false);
                    navigation.navigate('Notifications');
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </Screen>
    );
  }

  // ====== STEP FORM ======
  return (
    <Screen>
      <SectionCard title="Input Risk Treatment" subtitle="Dua langkah sesuai referensi">
        <View style={styles.stepBlock}>
          <StepIndicator steps={steps} activeIndex={currentStep} />

          <View style={styles.form}>
            {currentStep === 0 && (
              <>
                <FormField
                  label="ID Risiko"
                  placeholder="contoh: RSK-001"
                  value={form.idRisiko}
                  onChangeText={val =>
                    setForm(f => ({ ...f, idRisiko: val }))
                  }
                />
                <FormPicker
                  label="Strategi"
                  selectedValue={form.strategi}
                  options={['Avoid', 'Mitigate', 'Transfer', 'Accept']}
                  onValueChange={val =>
                    setForm(f => ({ ...f, strategi: val }))
                  }
                />
                <FormField
                  label="Pengendalian"
                  placeholder="Deskripsikan kontrol / aksi"
                  value={form.pengendalian}
                  onChangeText={val =>
                    setForm(f => ({ ...f, pengendalian: val }))
                  }
                />
                <FormPicker
                  label="Penanggung Jawab"
                  selectedValue={form.penanggungJawab}
                  options={['Davin', 'Riani', 'Sakti']}
                  onValueChange={val =>
                    setForm(f => ({ ...f, penanggungJawab: val }))
                  }
                />
                <DateField
                  label="Target Tanggal"
                  value={form.targetTanggal}
                  onChange={val =>
                    setForm(f => ({ ...f, targetTanggal: val }))
                  }
                />
                <FormField
                  label="Biaya"
                  placeholder="contoh: Rp 5.000.000"
                  value={form.biaya}
                  onChangeText={val =>
                    setForm(f => ({ ...f, biaya: val }))
                  }
                />
              </>
            )}

            {currentStep === 1 && (
              <>
                <FormPicker
                  label="Probabilitas Akhir (1-5)"
                  selectedValue={form.probabilitasAkhir}
                  options={['1', '2', '3', '4', '5']}
                  onValueChange={handleProbChange}
                />
                <FormPicker
                  label="Dampak Akhir (1-5)"
                  selectedValue={form.dampakAkhir}
                  options={['1', '2', '3', '4', '5']}
                  onValueChange={handleImpactChange}
                />
                <FormField
                  label="Level Residual (Prob x Dampak)"
                  value={form.levelResidual}
                  editable={false}
                />
                <LampiranField
                  label="Lampiran Bukti"
                  value={form.lampiran}
                  onChange={file =>
                    setForm(f => ({ ...f, lampiran: file }))
                  }
                />
              </>
            )}

            <View style={styles.stepActions}>
              <ActionButton
                label={currentStep === 0 ? 'Batal' : 'Kembali'}
                variant="outline"
                onPress={
                  currentStep === 0
                    ? () =>
                        navigation.navigate('Asset', {
                          screen: 'AssetHub',
                        })
                    : goBack
                }
              />
              <ActionButton
                label={isLastStep ? 'Konfirmasi' : 'Lanjut'}
                onPress={isLastStep ? () => setIsReview(true) : goNext}
              />
            </View>
          </View>
        </View>
      </SectionCard>
    </Screen>
  );
};

const styles = StyleSheet.create({
  stepBlock: {
    gap: spacing.md,
  },
  form: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
  stepActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  reviewGrid: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  reviewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    elevation: 8,
  },
  iconWrapper: {
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default RiskTreatmentWizardScreen;
