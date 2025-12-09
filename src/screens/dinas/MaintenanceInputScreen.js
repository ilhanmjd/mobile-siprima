import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import FormField from '../../components/FormField';
import ActionButton from '../../components/ActionButton';
import LampiranField from '../../components/LampiranField';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';

const MaintenanceInputScreen = ({ navigation, route }) => {
  const initialData = route?.params?.initialData || {};

  const [form, setForm] = React.useState({
    idAset: initialData.idAset || '',
    alasan: initialData.alasan || '',
    bukti: initialData.bukti || null,
  });

  const handleCancel = () => {
    // balik ke hub aset
    navigation.navigate('Asset', { screen: 'AssetHub' });
  };

  const handleConfirm = () => {
    // TODO: kirim ke API nanti
    console.log('Submit maintenance:', form);
    navigation.navigate('Notifications');
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
