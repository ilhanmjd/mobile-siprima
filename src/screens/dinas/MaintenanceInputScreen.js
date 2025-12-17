import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import FormField from '../../components/FormField';
import ActionButton from '../../components/ActionButton';
import LampiranField from '../../components/LampiranField';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';
import { createMaintenance } from '../../api/siprima';

const MaintenanceInputScreen = ({ navigation, route }) => {
  const initialData = route?.params?.initialData || {};
  const originatingRiskTreatment = route?.params?.riskTreatmentData;

  const [submitting, setSubmitting] = React.useState(false);

  const [form, setForm] = React.useState({
    idAset:
      initialData.idAset ||
      (originatingRiskTreatment?.risiko?.asset?.id
        ? String(originatingRiskTreatment.risiko.asset.id)
        : originatingRiskTreatment?.risk?.asset?.id
        ? String(originatingRiskTreatment.risk.asset.id)
        : ''),
    alasan: initialData.alasan || '',
    bukti: initialData.bukti || null,
  });

  const handleCancel = () => {
    // balik ke hub aset
    navigation.navigate('Asset', { screen: 'AssetHub' });
  };

  const buildFormData = () => {
    const fd = new FormData();
    if (form.idAset) {
      fd.append('asset_id', Number(form.idAset));
    }
    if (originatingRiskTreatment?.risk?.id) {
      fd.append('risk_id', originatingRiskTreatment.risk.id);
    } else if (route?.params?.riskId) {
      fd.append('risk_id', route.params.riskId);
    }
    if (originatingRiskTreatment?.id) {
      fd.append('risk_treatment_id', originatingRiskTreatment.id);
    }
    if (form.alasan) {
      fd.append('alasan_pemeliharaan', form.alasan);
    }
    fd.append(
      'status',
      originatingRiskTreatment?.status?.toLowerCase() === 'accepted'
        ? 'penanganan'
        : 'pending',
    );
    fd.append('status_review', 'pending');
    if (form.bukti) {
      fd.append('bukti_lampiran', {
        uri: form.bukti.uri,
        name: form.bukti.name || 'bukti.jpg',
        type: form.bukti.mimeType || 'image/jpeg',
      });
    }
    return fd;
  };

  const handleConfirm = async () => {
    if (!form.idAset) {
      Alert.alert('Validasi', 'ID Aset wajib diisi');
      return;
    }
    try {
      setSubmitting(true);
      const payload = buildFormData();
      await createMaintenance(payload);
      Alert.alert('Sukses', 'Maintenance berhasil dibuat', [
        {
          text: 'OK',
          onPress: () =>
            navigation.navigate('Notifications', {
              screen: 'NotificationsMain',
              params: { initialFilter: 'Maintenance' },
            }),
        },
      ]);
    } catch (err) {
      console.log('CREATE MAINTENANCE ERROR:', err?.response?.data || err.message);
      const msg =
        err?.response?.data?.message ||
        (err?.response?.data?.errors
          ? JSON.stringify(err.response.data.errors)
          : null) ||
        'Gagal membuat maintenance';
      Alert.alert('Error', msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen>
      <SectionCard title="Input Maintenance">
        <View style={styles.form}>
          <FormField
            label="ID Aset"
            placeholder="Masukkan ID Aset"
            value={form.idAset}
            onChangeText={val =>
              setForm(f => ({ ...f, idAset: val }))
            }
          />

          <FormField
            label="Alasan Pemeliharaan"
            placeholder="Tuliskan alasan pemeliharaan"
            value={form.alasan}
            onChangeText={val =>
              setForm(f => ({ ...f, alasan: val }))
            }
          />

          <LampiranField
            label="Bukti foto"
            value={form.bukti}
            onChange={file =>
              setForm(f => ({ ...f, bukti: file }))
            }
          />
        </View>

        <View style={styles.footer}>
          <ActionButton
            label="Batal"
            variant="outline"
            onPress={handleCancel}
            style={styles.cancelButton}
          />
          <ActionButton
            label="Konfirmasi"
            onPress={handleConfirm}
            disabled={submitting}
            labelStyle={{ opacity: submitting ? 0.7 : 1 }}
            style={styles.confirmButton}
          />
        </View>
      </SectionCard>
    </Screen>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
  },
  cancelButton: {
    flex: 1,
    marginRight: spacing.sm,
    borderColor: '#d3d3d3ff',
  },
  confirmButton: {
    flex: 1,
    marginLeft: spacing.sm,
    backgroundColor: '#253D90',
  },
});

export default MaintenanceInputScreen;
