import React from 'react';
import { View, StyleSheet, Modal, Text, Alert } from 'react-native';
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
import { createRiskTreatment } from '../../api/siprima';
import dayjs from 'dayjs';

const RiskTreatmentWizardScreen = ({ navigation, route }) => {
  const steps = wizardSteps.riskTreatment || ['Rencana', 'Residual']; // kalau belum ada di mockData
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isReview, setIsReview] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const initialData = route?.params?.initialData || {};
  const riskIdFromRoute = route?.params?.riskId;

  const PIC_OPTIONS = [
    { label: 'Davin', value: 1 },
    { label: 'Riani', value: 2 },
    { label: 'Sakti', value: 3 },
  ];

  const [form, setForm] = React.useState({
    idRisiko:
      initialData.idRisiko ||
      (riskIdFromRoute ? String(riskIdFromRoute) : ''),
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

  React.useEffect(() => {
    if (riskIdFromRoute) {
      setForm(f => {
        if (f.idRisiko) {
          return f;
        }
        return { ...f, idRisiko: String(riskIdFromRoute) };
      });
    }
  }, [riskIdFromRoute]);

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

  const toNumberOrNull = value => {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  };

  const parseCurrency = val =>
    Number(String(val || '0').replace(/[^0-9]/g, '')) || 0;

  const handleConfirmSubmit = async () => {
    try {
      setSubmitting(true);
      const payload = {
        risiko_id: toNumberOrNull(form.idRisiko),
        strategi: form.strategi,
        pengendalian: form.pengendalian,
        penanggung_jawab_id: toNumberOrNull(form.penanggungJawab),
        target_tanggal: form.targetTanggal
          ? dayjs(form.targetTanggal).format('YYYY-MM-DD')
          : null,
        biaya: parseCurrency(form.biaya),
        probabilitas_akhir: toNumberOrNull(form.probabilitasAkhir),
        dampak_akhir: toNumberOrNull(form.dampakAkhir),
        level_residual: toNumberOrNull(form.levelResidual),
      };

      await createRiskTreatment(payload);
      setShowSuccess(true);
    } catch (err) {
      const errResp = err?.response?.data;
      console.log('CREATE RISK TREATMENT ERROR:', errResp || err.message);
      const msg =
        errResp?.message ||
        (errResp?.errors ? JSON.stringify(errResp.errors) : null) ||
        'Gagal mengirim risk treatment';
      Alert.alert('Error', msg);
    } finally {
      setSubmitting(false);
    }
  };

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
              label={submitting ? 'Mengirim...' : 'Konfirmasi'}
              onPress={handleConfirmSubmit}
              disabled={submitting}
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
                  options={PIC_OPTIONS}
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
