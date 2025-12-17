import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import FormField from '../../components/FormField';
import FormPicker from '../../components/FormPicker';
import LampiranField from '../../components/LampiranField';
import ActionButton from '../../components/ActionButton';
import StepIndicator from '../../components/StepIndicator';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/Feather';
import { getDinasAssets, createAssetDeletion } from '../../api/siprima';

const steps = ['Penghapusan Aset', 'Konfirmasi'];

const AssetDeletionScreen = ({ navigation }) => {
  const [assets, setAssets] = React.useState([]);
  const [loadingAssets, setLoadingAssets] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const [form, setForm] = React.useState({
    assetId: '',
    reason: '',
    attachment: null,
  });

  React.useEffect(() => {
    const loadAssets = async () => {
      try {
        setLoadingAssets(true);
        const res = await getDinasAssets();
        const data = res?.data?.data || [];
        setAssets(data);
      } catch (err) {
        console.log(
          'LOAD ASSET DELETION OPTIONS ERROR:',
          err?.response?.data || err.message,
        );
        Alert.alert('Error', 'Gagal memuat daftar aset');
      } finally {
        setLoadingAssets(false);
      }
    };

    loadAssets();
  }, []);

  const selectedAsset =
    assets.find(asset => String(asset.id) === String(form.assetId)) || null;

  const assetOptions = assets.map(asset => ({
    label: `${asset.id} - ${asset.nama || 'Asset'}`,
    value: asset.id,
  }));

  const resetForm = () => {
    setForm({
      assetId: '',
      reason: '',
      attachment: null,
    });
    setCurrentStep(0);
  };

  const validateFirstStep = () => {
    if (!form.assetId) {
      Alert.alert('Validasi', 'Silakan pilih ID aset yang akan dihapus');
      return false;
    }
    if (!form.reason.trim()) {
      Alert.alert('Validasi', 'Alasan penghapusan wajib diisi');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateFirstStep()) {
      setCurrentStep(1);
    }
  };

  const buildPayload = () => {
    const fd = new FormData();
    fd.append('asset_id', Number(form.assetId));
    fd.append('alasan_penghapusan', form.reason);
    if (form.attachment) {
      fd.append('lampiran', {
        uri: form.attachment.uri,
        name: form.attachment.name || 'lampiran.jpg',
        type: form.attachment.mimeType || 'application/octet-stream',
      });
    }
    return fd;
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const payload = buildPayload();
      await createAssetDeletion(payload);
      setShowSuccess(true);
      resetForm();
    } catch (err) {
      console.log(
        'CREATE ASSET DELETION ERROR:',
        err?.response?.data || err.message,
      );
      const message =
        err?.response?.data?.message ||
        (err?.response?.data?.errors
          ? JSON.stringify(err.response.data.errors)
          : 'Gagal mengajukan penghapusan aset');
      Alert.alert('Error', message);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStepOne = () => (
    <>
      {loadingAssets ? (
        <View style={styles.loaderRow}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.loaderText}>Memuat daftar aset...</Text>
        </View>
      ) : (
        <FormPicker
          label="ID Aset"
          selectedValue={form.assetId}
          options={assetOptions}
          onValueChange={value =>
            setForm(prev => ({ ...prev, assetId: value }))
          }
        />
      )}
      {selectedAsset ? (
        <Text style={styles.assetHint}>
          {selectedAsset.nama || 'Aset'} •{' '}
          {selectedAsset.kode_bmd || selectedAsset.kode || 'Tanpa kode'}
        </Text>
      ) : null}

      <FormField
        label="Alasan Penghapusan"
        placeholder="Tuliskan alasan penghapusan aset"
        value={form.reason}
        multiline
        onChangeText={text => setForm(prev => ({ ...prev, reason: text }))}
      />

      <LampiranField
        label="Lampiran"
        value={form.attachment}
        onChange={file => setForm(prev => ({ ...prev, attachment: file }))}
      />
    </>
  );

  const renderConfirmation = () => (
    <>
      <FormField
        label="ID Aset"
        value={
          selectedAsset
            ? `${
                selectedAsset.kode_bmd ? `${selectedAsset.kode_bmd} • ` : ''
              }${selectedAsset.nama || selectedAsset.id}`
            : form.assetId
        }
        editable={false}
      />
      <FormField
        label="Alasan Penghapusan"
        value={form.reason}
        multiline
        editable={false}
      />
      <FormField
        label="Lampiran"
        value={form.attachment ? form.attachment.name : '-'}
        editable={false}
      />
    </>
  );

  return (
    <Screen>
      <SectionCard title="Penghapusan Aset">
        <StepIndicator steps={steps} activeIndex={currentStep} />
        <View style={styles.form}>
          {currentStep === 0 ? renderStepOne() : renderConfirmation()}
        </View>
        <View style={styles.footer}>
          {currentStep === 0 ? (
            <>
              <ActionButton
                label="Batal"
                variant="outline"
                onPress={() => navigation.goBack()}
                style={styles.resetButton}
              />
              <ActionButton
                label="Lanjut"
                onPress={handleNext}
                style={styles.submitButton}
              />
            </>
          ) : (
            <>
              <ActionButton
                label="Kembali"
                variant="outline"
                onPress={() => setCurrentStep(0)}
                style={styles.resetButton}
              />
              <ActionButton
                label={submitting ? 'Mengirim...' : 'Submit'}
                onPress={handleSubmit}
                disabled={submitting}
                style={styles.submitButton}
              />
            </>
          )}
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
            <Icon name="check-circle" size={96} color={colors.primary} />
            <Text style={styles.modalTitle}>Pengajuan penghapusan</Text>
            <Text style={styles.modalTitle}>berhasil dikirim.</Text>

            <View style={styles.modalButtons}>
              <ActionButton
                label="Back"
                variant="outline"
                onPress={() => setShowSuccess(false)}
                style={styles.modalBack}
              />
              <ActionButton
                label="Lihat Notif"
                onPress={() => {
                  setShowSuccess(false);
                  navigation.navigate('Notifications', {
                    screen: 'NotificationsMain',
                    params: { initialFilter: 'Asset Delete' },
                  });
                }}
                style={styles.modalNext}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  loaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  loaderText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  assetHint: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: -spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
  },
  resetButton: {
    flex: 1,
    marginRight: spacing.sm,
    borderColor: '#d3d3d3ff',
  },
  submitButton: {
    flex: 1,
    marginLeft: spacing.sm,
    backgroundColor: '#253D90',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: spacing.lg,
  },
  modalBack: {
    flex: 1,
    marginRight: spacing.sm,
  },
  modalNext: {
    flex: 1,
    marginLeft: spacing.sm,
  },
});

export default AssetDeletionScreen;
