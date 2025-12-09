import React from 'react';
import { View, StyleSheet, Text, Modal, ActivityIndicator } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import FormField from '../../components/FormField';
import FormPicker from '../../components/FormPicker';
import LampiranField from '../../components/LampiranField';
import ActionButton from '../../components/ActionButton';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/Feather';

const AssetDeletionScreen = ({ navigation }) => {
  const [assets, setAssets] = React.useState([]);
  const [loadingAssets, setLoadingAssets] = React.useState(true);

  const [form, setForm] = React.useState({
    idAset: '',
    namaAset: '',
    alasan: '',
    lampiran: null,
  });
  const [showSuccess, setShowSuccess] = React.useState(false);

  // simulasi fetch master data aset dari backend
  React.useEffect(() => {
    const loadAssets = async () => {
      try {
        // TODO: ganti ke fetch API beneran
        // const res = await fetch('https://api…/assets');
        // const data = await res.json();
        const data = [
          { id: 'r14a', nama: 'Laptop ASUS Vivobook' },
          { id: 'd45k', nama: 'Printer Canon' },
          { id: 'c12d', nama: 'Server Utama' },
        ];
        setAssets(data);
      } catch (e) {
        console.log('Error load assets', e);
      } finally {
        setLoadingAssets(false);
      }
    };

    loadAssets();
  }, []);

  const handleSelectId = (id) => {
    const found = assets.find(a => a.id === id);
    setForm(f => ({
      ...f,
      idAset: id,
      namaAset: found ? found.nama : '',
    }));
  };

  const handleReset = () => {
    setForm({
      idAset: '',
      namaAset: '',
      alasan: '',
      lampiran: null,
    });
  };

  const handleSubmit = async () => {
    // TODO: kirim ke API backend
    // await fetch('POST /asset-deletion', { body: JSON.stringify(form) })
    console.log('Submit deletion:', form);
    setShowSuccess(true);
  };

  return (
    <Screen>
      <SectionCard title="Asset Deletion Input">
        <View style={styles.form}>
          {loadingAssets ? (
            <View style={styles.loaderRow}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.loaderText}>Memuat daftar aset…</Text>
            </View>
          ) : (
            <FormPicker
              label="ID aset"
              selectedValue={form.idAset}
              options={assets.map(a => a.id)}
              onValueChange={handleSelectId}
            />
          )}

          <FormField
            label="Nama aset"
            value={form.namaAset}
            editable={false}
            placeholder="Nama aset akan terisi otomatis"
          />

          <FormField
            label="Alasan penghapusan aset"
            placeholder="Tuliskan alasan penghapusan aset"
            value={form.alasan}
            multiline
            numberOfLines={4}
            onChangeText={val =>
              setForm(f => ({ ...f, alasan: val }))
            }
          />

          <LampiranField
            label="Lampiran"
            value={form.lampiran}
            onChange={file =>
              setForm(f => ({ ...f, lampiran: file }))
            }
          />
        </View>

        <View style={styles.footer}>
          <ActionButton
            label="Reset"
            variant="outline"
            onPress={handleReset}
            style={styles.resetButton}
          />
          <ActionButton
            label="Submit"
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>
      </SectionCard>

      {/* Modal sukses */}
      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Icon name="check-circle" size={96} color={colors.primary} />
            <Text style={styles.modalTitle}>Your request has</Text>
            <Text style={styles.modalTitle}>been sent</Text>
            <Text style={styles.modalTitle}>successfully.</Text>

            <View style={styles.modalButtons}>
              <ActionButton
                label="Back"
                variant="outline"
                onPress={() => setShowSuccess(false)}
                style={styles.modalBack}
              />
              <ActionButton
                label="Next"
                onPress={() => {
                  setShowSuccess(false);
                  navigation.navigate('Notifications');
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
    marginTop: spacing.md,
  },
  loaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  loaderText: {
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
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
    top: 0, bottom: 0, left: 0, right: 0,
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
