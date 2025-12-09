import React from 'react';
import { View, StyleSheet, Modal, Text } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import StepIndicator from '../../components/StepIndicator';
import FormField from '../../components/FormField';
import ActionButton from '../../components/ActionButton';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import { wizardSteps } from '../../data/mockData';
import FormPicker from '../../components/FormPicker';
import DateField from '../../components/DateField';
import LampiranField from '../../components/LampiranField';
import Icon from 'react-native-vector-icons/Feather';

const AssetWizardScreen = ({ navigation, route }) => {
  const steps = wizardSteps.asset;
  const [currentStep, setCurrentStep] = React.useState(0);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [isReview, setIsReview] = React.useState(false);

  // data awal jika datang dari NotificationRejected
  const initialData = route?.params?.initialData || {};

  const [form, setForm] = React.useState({
    kategori: initialData.kategori || '',
    subKategori: initialData.subKategori || '',
    nama: initialData.nama || '',
    deskripsi: initialData.deskripsi || '',
    tanggalPerolehan: initialData.tanggalPerolehan || '',
    nilaiPerolehan: initialData.nilaiPerolehan || '',
    kondisi: initialData.kondisi || '',
    lampiran: initialData.lampiran || null,
    penanggungJawab: initialData.penanggungJawab || '',
    lokasi: initialData.lokasi || '',
    status: initialData.status || '',
  });

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

  const isLastStep = currentStep === steps.length - 1;

  // ================== HALAMAN REVIEW ==================
  if (isReview) {
    return (
      <Screen>
        <SectionCard title="Konfirmasi data aset">
          <View style={styles.reviewGrid}>
            <View style={styles.reviewRow}>
              <View style={styles.reviewItem}>
                <FormField
                  label="Kategori Asset"
                  value={form.kategori}
                  editable={false}
                />
              </View>
              <View style={styles.reviewItem}>
                <FormField
                  label="Nama Asset"
                  value={form.nama}
                  editable={false}
                />
              </View>
            </View>

            <View style={styles.reviewRow}>
              <View style={styles.reviewItem}>
                <FormField
                  label="Sub Kategori"
                  value={form.subKategori}
                  editable={false}
                />
              </View>
              <View style={styles.reviewItem}>
                <FormField
                  label="Kondisi Asset"
                  value={form.kondisi}
                  editable={false}
                />
              </View>
            </View>

            <View style={styles.reviewRow}>
              <View style={styles.reviewItem}>
                <FormField
                  label="Tanggal Perolehan Asset"
                  value={form.tanggalPerolehan}
                  editable={false}
                />
              </View>
              <View style={styles.reviewItem}>
                <FormField
                  label="Lokasi"
                  value={form.lokasi}
                  editable={false}
                />
              </View>
            </View>

            <View style={styles.reviewRow}>
              <View style={styles.reviewItem}>
                <FormField
                  label="Nilai Perolehan Asset"
                  value={form.nilaiPerolehan}
                  editable={false}
                />
              </View>
              <View style={styles.reviewItem}>
                <LampiranField
                  label="Lampiran"
                  value={form.lampiran}
                  onChange={() => {}}
                  disabled
                />
              </View>
            </View>
          </View>

          <FormField
            label="Deskripsi Asset"
            value={form.deskripsi}
            editable={false}
          />
          <FormField
            label="Status"
            value={form.status}
            editable={false}
          />
          <FormField
            label="Penanggung Jawab"
            value={form.penanggungJawab}
            editable={false}
          />

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

              <Text style={styles.modalTitle}>Your request has been sent</Text>
              <Text style={styles.modalSubtitle}>Successfully.</Text>

              <View style={styles.modalActions}>
                <ActionButton
                  label="Home"
                  variant="outline"
                  onPress={() => {
                    setShowSuccess(false);
                    // ke tab Dashboard -> screen DinasMain
                    navigation.navigate('Dashboard', {
                      screen: 'DinasMain',
                    });
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

  // ================== WIZARD STEP ==================
  return (
    <Screen>
      <SectionCard title="Input Asset" subtitle="Tiga langkah sesuai referensi">
        <View style={styles.stepBlock}>
          <StepIndicator steps={steps} activeIndex={currentStep} />

          <View style={styles.form}>
            {currentStep === 0 && (
              <>
                <FormPicker
                  label="Kategori Asset"
                  selectedValue={form.kategori}
                  options={['Aset TI', 'Aset Fisik']}
                  onValueChange={val =>
                    setForm(f => ({ ...f, kategori: val }))
                  }
                />
                <FormPicker
                  label="Sub Kategori"
                  selectedValue={form.subKategori}
                  options={['Laptop', 'Server', 'Router']}
                  onValueChange={val =>
                    setForm(f => ({ ...f, subKategori: val }))
                  }
                />
                <FormField
                  label="Nama Asset"
                  placeholder="Asus Expertbook"
                  value={form.nama}
                  onChangeText={val =>
                    setForm(f => ({ ...f, nama: val }))
                  }
                />
                <FormField
                  label="Deskripsi Asset"
                  placeholder="Unit pengadaan 2025"
                  value={form.deskripsi}
                  onChangeText={val =>
                    setForm(f => ({ ...f, deskripsi: val }))
                  }
                />
              </>
            )}

            {currentStep === 1 && (
              <>
                <DateField
                  label="Tanggal Perolehan Asset"
                  value={form.tanggalPerolehan}
                  onChange={val =>
                    setForm(f => ({ ...f, tanggalPerolehan: val }))
                  }
                />
                <FormField
                  label="Nilai Perolehan Asset"
                  placeholder="Rp 15.000.000"
                  value={form.nilaiPerolehan}
                  onChangeText={val =>
                    setForm(f => ({ ...f, nilaiPerolehan: val }))
                  }
                />
                <FormPicker
                  label="Kondisi Asset"
                  selectedValue={form.kondisi}
                  options={['Baik', 'Rusak Ringan', 'Rusak Berat']}
                  onValueChange={val =>
                    setForm(f => ({ ...f, kondisi: val }))
                  }
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

            {currentStep === 2 && (
              <>
                <FormPicker
                  label="Penanggung Jawab"
                  selectedValue={form.penanggungJawab}
                  options={['Davin', 'Riani', 'Sakti']}
                  onValueChange={val =>
                    setForm(f => ({ ...f, penanggungJawab: val }))
                  }
                />
                <FormPicker
                  label="Lokasi"
                  selectedValue={form.lokasi}
                  options={['DC Utama', 'Lab 1', 'Gedung A']}
                  onValueChange={val =>
                    setForm(f => ({ ...f, lokasi: val }))
                  }
                />
                <FormPicker
                  label="Status"
                  selectedValue={form.status}
                  options={['Active', 'Inactive']}
                  onValueChange={val =>
                    setForm(f => ({ ...f, status: val }))
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
  reviewRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  reviewItem: {
    flex: 1,
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

export default AssetWizardScreen;
