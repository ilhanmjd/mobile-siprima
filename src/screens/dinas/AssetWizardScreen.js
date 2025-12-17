import React from 'react';
import { View, StyleSheet, Modal, Text, Alert } from 'react-native';
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
import { createAsset, getSubkategoriList } from '../../api/siprima';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PENANGGUNG_JAWAB_OPTIONS = [
  { label: 'Budi Santoso', value: 1 },
  { label: 'Siti Nurhaliza', value: 2 },
  { label: 'Ahmad Dahlan', value: 3 },
  { label: 'Rina Wijaya', value: 4 },
  { label: 'Dedi Mulyadi', value: 5 },
];

const LOKASI_OPTIONS = [
  { label: 'Kantor Pusat', value: 1 },
  { label: 'Gedung A Lantai 1', value: 2 },
  { label: 'Gedung B Lantai 2', value: 3 },
  { label: 'Gudang Utama', value: 4 },
  { label: 'Kantor Cabang Bandung', value: 5 },
];

const AssetWizardScreen = ({ navigation, route }) => {
  const steps = wizardSteps.asset;
  const [currentStep, setCurrentStep] = React.useState(0);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [isReview, setIsReview] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [user, setUser] = React.useState(null);

  // master options
  const [kategoriOptions, setKategoriOptions] = React.useState([]);
  const [subkategoriOptions, setSubkategoriOptions] = React.useState([]);

  // data awal jika datang dari NotificationRejected
  const initialData = route?.params?.initialData || {};

  const [form, setForm] = React.useState({
    kategori: initialData.kategori || '',
    subKategori: initialData.subKategori || '',
    nama: initialData.nama || '',
    deskripsi: initialData.deskripsi || '',
    tanggalPerolehan: initialData.tanggalPerolehan || null, // penting: null/Date
    nilaiPerolehan: initialData.nilaiPerolehan || '',
    kondisi: initialData.kondisi || '',
    lampiran: initialData.lampiran || null,
    penanggungJawab: initialData.penanggungJawab || '',
    lokasi: initialData.lokasi || '',
    status: initialData.status || '',
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

  // ========== AMBIL MASTER KATEGORI DARI /sub-kategoris ==========
  React.useEffect(() => {
    const fetchAllSub = async () => {
      try {
        const res = await getSubkategoriList();
        const subs = res?.data?.data || [];

        const kategoriMap = {};
        subs.forEach(s => {
          const kat = s.kategori;
          if (kat && !kategoriMap[kat.id]) {
            kategoriMap[kat.id] = {
              label: kat.nama,
              value: kat.id,
            };
          }
        });

        setKategoriOptions(Object.values(kategoriMap));
      } catch (e) {
        console.log('MASTER SUB-KAT ERROR:', e?.response?.data || e.message);
      }
    };

    fetchAllSub();
  }, []);

  // ========== AMBIL SUB-KATEGORI BERDASARKAN KATEGORI ==========
  React.useEffect(() => {
    const fetchSubByKategori = async () => {
      if (!form.kategori) {
        setSubkategoriOptions([]);
        return;
      }
      try {
        const res = await getSubkategoriList(form.kategori);
        const subs = res?.data?.data || [];
        setSubkategoriOptions(
          subs.map(s => ({
            label: s.nama,
            value: s.id,
          })),
        );
      } catch (e) {
        console.log('SUB BY KAT ERROR:', e?.response?.data || e.message);
      }
    };

    fetchSubByKategori();
  }, [form.kategori]);

  const getOptionLabel = React.useCallback((options, value) => {
    if (!value) {
      return '';
    }
    const found = options.find(opt => opt.value === value);
    if (found?.label) {
      return found.label;
    }
    return typeof value === 'string' ? value : String(value);
  }, []);

  const toNumberOrNull = value => {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  };

  const serializeLampiran = lampiran => {
    if (!lampiran) {
      return null;
    }
    if (typeof lampiran === 'string') {
      return lampiran;
    }
    if (lampiran.uri) {
      return lampiran.uri;
    }
    if (lampiran.name) {
      return lampiran.name;
    }
    return String(lampiran);
  };

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

  const handleConfirmSubmit = async () => {
    try {
      setSubmitting(true);

      const dinasId = toNumberOrNull(
        user?.dinas_id || user?.dinasId || user?.dinas?.id,
      );
      const lampiran = serializeLampiran(form.lampiran);

      const payload = {
        kategori_id: toNumberOrNull(form.kategori),
        subkategori_id: toNumberOrNull(form.subKategori),
        lokasi_id: toNumberOrNull(form.lokasi),
        penanggungjawab_id: toNumberOrNull(form.penanggungJawab),
        nama: form.nama,
        deskripsi: form.deskripsi,
        tgl_perolehan: form.tanggalPerolehan
          ? dayjs(form.tanggalPerolehan).format('YYYY-MM-DD HH:mm:ss')
          : null,
        nilai_perolehan: Number(
          String(form.nilaiPerolehan || '0').replace(/[^0-9]/g, ''),
        ),
        kondisi: form.kondisi,
        ...(lampiran ? { lampiran_bukti: lampiran } : {}),
        is_usage: form.status?.toLowerCase() === 'active' ? 'active' : 'inactive',
        status: 'pending',
      };

      if (dinasId) {
        payload.dinas_id = dinasId;
      }

      await createAsset(payload);
      setShowSuccess(true);
    } catch (err) {
      console.log('CREATE ASSET ERROR:', err?.response?.data || err.message);
      Alert.alert('Error', 'Gagal mengirim data asset');
    } finally {
      setSubmitting(false);
    }
  };

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
                  value={getOptionLabel(kategoriOptions, form.kategori)}
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
                  value={getOptionLabel(subkategoriOptions, form.subKategori)}
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
                  value={
                    form.tanggalPerolehan
                      ? dayjs(form.tanggalPerolehan).format('DD/MM/YYYY')
                      : ''
                  }
                  editable={false}
                />
              </View>
              <View style={styles.reviewItem}>
                <FormField
                  label="Lokasi"
                  value={getOptionLabel(LOKASI_OPTIONS, form.lokasi)}
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
            value={getOptionLabel(PENANGGUNG_JAWAB_OPTIONS, form.penanggungJawab)}
            editable={false}
          />

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
                    navigation.navigate('Dashboard', {
                      screen: 'DinasMain',
                    });
                  }}
                />
                <ActionButton
                  label="Next"
                  onPress={() => {
                    setShowSuccess(false);
                    navigation.navigate('Notifications', {
                      screen: 'NotificationsMain',
                      params: { initialFilter: 'Asset' },
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
                  options={kategoriOptions}
                  onValueChange={val =>
                    setForm(f => ({ ...f, kategori: val, subKategori: '' }))
                  }
                />
                <FormPicker
                  label="Sub Kategori"
                  selectedValue={form.subKategori}
                  options={subkategoriOptions}
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
                  options={['baik', 'rusak ringan', 'rusak berat']}
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
                  options={PENANGGUNG_JAWAB_OPTIONS}
                  onValueChange={val =>
                    setForm(f => ({ ...f, penanggungJawab: val }))
                  }
                />
                <FormPicker
                  label="Lokasi"
                  selectedValue={form.lokasi}
                  options={LOKASI_OPTIONS}
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
