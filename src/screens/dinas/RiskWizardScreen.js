import React from 'react';
import { View, StyleSheet, Modal, Text, Alert } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import StepIndicator from '../../components/StepIndicator';
import FormField from '../../components/FormField';
import FormPicker from '../../components/FormPicker';
import ActionButton from '../../components/ActionButton';
import DateField from '../../components/DateField';
import LampiranField from '../../components/LampiranField';
import spacing from '../../theme/spacing';
import { wizardSteps } from '../../data/mockData';
import Icon from 'react-native-vector-icons/Feather';
import { createRisk } from '../../api/siprima';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RiskWizardScreen = ({ navigation, route }) => {
  const steps = wizardSteps.risk; // pastikan ada di mockData
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isReview, setIsReview] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const initialData = route?.params?.initialData || {};

  const [form, setForm] = React.useState({
    idAset: initialData.idAset || '',
    judulRisiko: initialData.judulRisiko || '',
    deskripsi: initialData.deskripsi || '',
    penyebab: initialData.penyebab || '',
    dampak: initialData.dampak || '',
    probabilitas: '',
    nilaiDampak: '',
    levelRisiko: '',
    kriteria: '',
    prioritas: initialData.prioritas || '',
    status: 'Baru',
    lampiran: initialData.lampiran || null,
  });

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const raw = await AsyncStorage.getItem('user');
        if (raw) {
          setUser(JSON.parse(raw));
        }
      } catch (err) {
        console.log('LOAD USER FAILED:', err?.message);
      }
    };

    loadUser();
  }, []);

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  const hitungLevelDanKriteria = (probStr, impactStr) => {
  const prob = Number(probStr) || 0;
  const impact = Number(impactStr) || 0;
  const level = prob * impact;

  let kriteria = '';
  if (level >= 1 && level <= 6) kriteria = 'Low';
  else if (level >= 7 && level <= 14) kriteria = 'Medium';
  else if (level >= 15 && level <= 25) kriteria = 'High';

  return { levelRisiko: level ? String(level) : '', kriteria };
};

  const handleProbChange = val => {
  setForm(f => {
    const { levelRisiko, kriteria } = hitungLevelDanKriteria(val, f.nilaiDampak);
    return { ...f, probabilitas: val, levelRisiko, kriteria };
  });
};

// saat user ubah dampak
  const handleImpactChange = val => {
  setForm(f => {
    const { levelRisiko, kriteria } = hitungLevelDanKriteria(f.probabilitas, val);
    return { ...f, nilaiDampak: val, levelRisiko, kriteria };
  });
};

  const isLastStep = currentStep === steps.length - 1;

  const toNumberOrNull = value => {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  };

  const handleConfirmSubmit = async () => {
    try {
      setSubmitting(true);
      const payload = {
        dinas_id:
          user?.dinas_id ||
          user?.dinasId ||
          user?.dinas?.id ||
          null,
        asset_id: toNumberOrNull(form.idAset),
        judul: form.judulRisiko,
        deskripsi: form.deskripsi,
        penyebab: form.penyebab,
        dampak: form.dampak,
        probabilitas: toNumberOrNull(form.probabilitas),
        nilai_dampak: toNumberOrNull(form.nilaiDampak),
        level_risiko: toNumberOrNull(form.levelRisiko),
        kriteria: form.kriteria,
        prioritas: form.prioritas,
      };

      await createRisk(payload);
      setShowSuccess(true);
    } catch (err) {
      const errResp = err?.response?.data;
      console.log('CREATE RISK ERROR:', errResp || err.message);
      const message =
        errResp?.message ||
        (errResp?.errors ? JSON.stringify(errResp.errors) : null) ||
        'Gagal mengirim data risiko';
      Alert.alert('Error', message);
    } finally {
      setSubmitting(false);
    }
  };

  // ============ HALAMAN KONFIRMASI ============
  if (isReview) {
    return (
      <Screen>
        <SectionCard title="Konfirmasi data risiko">
          <View style={styles.reviewGrid}>
            <FormField
              label="ID Asset"
              value={form.idAset}
              editable={false}
            />
            <FormField
              label="Judul Risiko"
              value={form.judulRisiko}
              editable={false}
            />
            <FormField
              label="Deskripsi Risiko"
              value={form.deskripsi}
              editable={false}
            />
            <FormField
              label="Penyebab"
              value={form.penyebab}
              editable={false}
            />
            <FormField
              label="Dampak"
              value={form.dampak}
              editable={false}
            />
            <FormField
              label="Probabilitas"
              value={form.probabilitas}
              editable={false}
            />
            <FormField
              label="Nilai Dampak"
              value={form.nilaiDampak}
              editable={false}
            />
            <FormField
              label="Level Risiko"
              value={form.levelRisiko}
              editable={false}
            />
            <FormField
              label="Kriteria"
              value={form.kriteria}
              editable={false}
            />
            <FormField
              label="Prioritas"
              value={form.prioritas}
              editable={false}
            />
            <FormField
              label="Status"
              value={form.status}
              editable={false}
            />
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

              <Text style={styles.modalTitle}>Your request has been sent</Text>
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
                    navigation.navigate('Notifications', {
                      screen: 'NotificationsMain',
                      params: { initialFilter: 'Risk' },
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </Screen>
    );
  }

  // ============ STEP FORM ============
  return (
    <Screen>
      <SectionCard title="Input Risiko" subtitle="Dua langkah sesuai referensi">
        <View style={styles.stepBlock}>
          <StepIndicator steps={steps} activeIndex={currentStep} />

          <View style={styles.form}>
            {currentStep === 0 && (
              <>
                <FormField
                  label="ID Asset"
                  placeholder="contoh: AS-001"
                  value={form.idAset}
                  onChangeText={val =>
                    setForm(f => ({ ...f, idAset: val }))
                  }
                />
                <FormField
                  label="Judul Risiko"
                  placeholder="contoh: Pencurian Data"
                  value={form.judulRisiko}
                  onChangeText={val =>
                    setForm(f => ({ ...f, judulRisiko: val }))
                  }
                />
                <FormField
                  label="Deskripsi Risiko"
                  placeholder="Jelaskan risiko secara singkat"
                  value={form.deskripsi}
                  onChangeText={val =>
                    setForm(f => ({ ...f, deskripsi: val }))
                  }
                />
                <FormField
                  label="Penyebab"
                  placeholder="Apa penyebab risiko ini?"
                  value={form.penyebab}
                  onChangeText={val =>
                    setForm(f => ({ ...f, penyebab: val }))
                  }
                />
                <FormField
                  label="Dampak"
                  placeholder="Apa dampak jika terjadi?"
                  value={form.dampak}
                  onChangeText={val =>
                    setForm(f => ({ ...f, dampak: val }))
                  }
                />
              </>
            )}

            {currentStep === 1 && (
              <>
                <FormPicker
                  label="Probabilitas"
                  selectedValue={form.probabilitas}
                  options={['1', '2', '3', '4', '5']}
                  onValueChange={handleProbChange}
                />
                <FormPicker
                  label="Nilai Dampak"
                  selectedValue={form.nilaiDampak}
                  options={['1', '2', '3', '4', '5']}
                  onValueChange={handleImpactChange}
                />
                <FormField
                   label="Level Risiko"
                   value={form.levelRisiko}
                   editable={false}
                />
                <FormField
                   label="Kriteria"
                   value={form.kriteria}
                   editable={false}
                />
                <FormPicker
                  label="Prioritas"
                  selectedValue={form.prioritas}
                  options={['Low', 'Medium', 'High']}
                  onValueChange={val =>
                    setForm(f => ({ ...f, prioritas: val }))
                  }
                />
                <FormField
                 label="Status"
                 value={form.status}
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
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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

export default RiskWizardScreen;
