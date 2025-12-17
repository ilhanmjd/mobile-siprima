import React from 'react';
import { View, StyleSheet, Alert, Text, ActivityIndicator, Modal, TextInput } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import StepIndicator from '../../components/StepIndicator';
import FormField from '../../components/FormField';
import ActionButton from '../../components/ActionButton';
import spacing from '../../theme/spacing';
import { colors } from '../../theme';
import { useVerifierSubmissions } from '../../context/VerifierSubmissionsContext';
import {
  updateAsset,
  approveRisk,
  rejectRisk,
  approveRiskTreatment,
  rejectRiskTreatment,
  approveMaintenance,
  rejectMaintenance,
  reviewAssetDeletion,
} from '../../api/siprima';

const stepsByType = {
  Asset: ['Identitas', 'Detail', 'Penanggung Jawab'],
  Risk: ['Identifikasi', 'Analisis', 'Review'],
  'Risk Treatment': ['Rencana', 'Residual'],
  Maintenance: ['Identitas', 'Detail Pengajuan', 'Penjadwalan'],
  'Asset Deletion': ['Pengajuan', 'Review'],
};

const VerifierSubmissionDetailScreen = ({ route, navigation }) => {
  const { type, submissionId, initialSubmission } = route.params || {};
  const {
    submissions,
    markSubmissionDecision,
    loading,
    refetch,
  } = useVerifierSubmissions();
  const submissionFromStore = submissions[type]?.find(item => item.id === submissionId);
  const submission = submissionFromStore || initialSubmission;
  const [currentStep, setCurrentStep] = React.useState(0);
  const [rejectModal, setRejectModal] = React.useState(false);
  const [rejectReason, setRejectReason] = React.useState('');

  React.useEffect(() => {
    if (!submission && !loading) {
      Alert.alert('Info', 'Data tidak ditemukan', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  }, [submission, loading, navigation]);

  if (!submission) {
    return (
      <Screen>
        <View style={styles.loader}>
          <ActivityIndicator />
          <Text style={styles.loaderText}>Memuat form...</Text>
        </View>
      </Screen>
    );
  }

  const steps = submission.steps || stepsByType[type] || ['Review'];
  const sections = submission.sections || [
    { title: 'Ringkasan', fields: submission.previewFields || [] },
  ];
  const currentSection = sections[Math.min(currentStep, sections.length - 1)];

  const buildAssetPayload = (raw, statusValue, reason) => ({
    dinas_id: raw?.dinas_id ?? raw?.dinas?.id ?? null,
    kategori_id: raw?.kategori_id ?? raw?.kategori?.id ?? null,
    subkategori_id:
      raw?.subkategori_id ??
      raw?.sub_kategori_id ??
      raw?.subKategori?.id ??
      raw?.sub_kategori?.id ??
      null,
    lokasi_id: raw?.lokasi_id ?? raw?.lokasi?.id ?? null,
    penanggungjawab_id:
      raw?.penanggungjawab_id ??
      raw?.penanggung_jawab_id ??
      raw?.penanggungjawab?.id ??
      raw?.penanggung_jawab?.id ??
      null,
    nama: raw?.nama ?? '',
    deskripsi: raw?.deskripsi ?? '',
    tgl_perolehan: raw?.tgl_perolehan ?? null,
    nilai_perolehan: raw?.nilai_perolehan ?? 0,
    kondisi: raw?.kondisi ?? '',
    lampiran_bukti: raw?.lampiran_bukti ?? null,
    is_usage: raw?.is_usage ?? 'active',
    status: statusValue,
    ...(statusValue === 'ditolak'
      ? { alasan_ditolak: reason || raw?.alasan_ditolak || '-' }
      : {}),
  });

  const performDecision = async (decision, reason) => {
    try {
      if (type === 'Asset') {
        const apiStatus = decision === 'approve' ? 'diterima' : 'ditolak';
        const payload = buildAssetPayload(
          submission.raw || {},
          apiStatus,
          reason,
        );
        await updateAsset(submission.raw?.id, payload);
      } else if (type === 'Risk') {
        if (decision === 'approve') {
          await approveRisk(submission.raw?.id);
        } else {
          await rejectRisk(submission.raw?.id, {
            alasan: reason || '-',
          });
        }
      } else if (type === 'Risk Treatment') {
        if (decision === 'approve') {
          await approveRiskTreatment(submission.raw?.id);
        } else {
          await rejectRiskTreatment(submission.raw?.id, {
            alasan: reason || '-',
          });
        }
      } else if (type === 'Maintenance') {
        if (decision === 'approve') {
          await approveMaintenance(submission.raw?.id);
        } else {
          await rejectMaintenance(submission.raw?.id, {
            alasan_ditolak: reason || '-',
          });
        }
      } else if (type === 'Asset Deletion') {
        const statusPayload =
          decision === 'approve' ? 'accepted' : 'rejected';
        await reviewAssetDeletion(submission.raw?.id, {
          status: statusPayload,
          ...(statusPayload === 'rejected'
            ? { alasan_ditolak: reason || '-' }
            : {}),
        });
      }
    } catch (err) {
      Alert.alert(
        'Error',
        err?.response?.data?.message || 'Gagal mengirim data',
      );
      return;
    }

    markSubmissionDecision(type, submissionId, decision);
    refetch?.();
    Alert.alert(
      'Sukses',
      decision === 'approve'
        ? 'Pengajuan sudah diverifikasi'
        : 'Pengajuan ditolak',
      [{ text: 'OK', onPress: () => navigation.popToTop() }],
    );
  };

  const handleDecision = decision => {
    if (
      decision === 'reject' &&
      (type === 'Asset' ||
        type === 'Risk' ||
        type === 'Risk Treatment' ||
        type === 'Maintenance' ||
        type === 'Asset Deletion')
    ) {
      setRejectReason('');
      setRejectModal(true);
    } else {
      performDecision(decision);
    }
  };

  return (
    <Screen>
      <SectionCard title={`${type} Form`} subtitle="Detail pengajuan user dinas">
        <StepIndicator steps={steps} activeIndex={currentStep} />
        <View style={styles.form}>
          <Text style={styles.sectionTitle}>{currentSection?.title}</Text>
          {(currentSection?.fields || []).map(field => (
            <FormField
              key={`${submission.id}-${field.label}`}
              label={field.label}
              value={
                typeof field.value === 'string' || field.value == null
                  ? field.value ?? ''
                  : String(field.value)
              }
              multiline={field.multiline}
              editable={false}
            />
          ))}
        </View>

        <View style={styles.stepNav}>
          {currentStep > 0 && (
            <ActionButton
              label="Previous"
              variant="outline"
              onPress={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
            />
          )}
          {currentStep < steps.length - 1 && (
            <ActionButton
              label="Next"
              onPress={() =>
                setCurrentStep(prev =>
                  Math.min(prev + 1, steps.length - 1),
                )
              }
            />
          )}
        </View>

       {currentStep === steps.length - 1 && (
         <View style={styles.actions}>
           <ActionButton
             label="Back"
             variant="outline"
             onPress={() => navigation.goBack()}
           />
           <ActionButton
             label="Reject"
             variant="danger"
             onPress={() => handleDecision('reject')}
           />
           <ActionButton
             label="Accept"
             onPress={() => handleDecision('approve')}
            />
          </View>
        )}
      </SectionCard>

      <Modal
        visible={rejectModal}
        transparent
        animationType="fade"
        onRequestClose={() => setRejectModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Alasan Ditolak:</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Tulis alasan ditolak..."
              multiline
              value={rejectReason}
              onChangeText={setRejectReason}
            />
            <View style={styles.modalActions}>
              <ActionButton
                label="Cancel"
                variant="outline"
                onPress={() => setRejectModal(false)}
              />
              <ActionButton
                label="Submit"
                onPress={() => {
                  setRejectModal(false);
                  performDecision('reject', rejectReason);
                }}
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
    marginTop: spacing.md,
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors?.text || '#000',
  },
  stepNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
  },
  loaderText: {
    color: colors.textMuted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  modalCard: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: spacing.lg,
    gap: spacing.md,
  },
  modalTitle: {
    fontWeight: '700',
    fontSize: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.border || '#ccc',
    borderRadius: 12,
    minHeight: 120,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
});

export default VerifierSubmissionDetailScreen;
