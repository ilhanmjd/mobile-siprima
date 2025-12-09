import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/Feather';

const dummyNotifs = [
  {
    id: '1',
    jenis: 'Asset',
    kode: '1579',
    waktu: '10 mins ago',
    deskripsi:
      'Printer Epson L3250 perangkat multifungsi (print, scan, copy) yang digunakan untuk mendukung kegiatan administrasi dan dokumentasi di Dinas Kesehatan.',
  },
  {
    id: '2',
    jenis: 'Asset',
    waktu: '10 mins ago',
    deskripsi:
      'Laptop digunakan oleh staf keuangan untuk pelaporan SPJ dan pengelolaan dokumen keuangan berbasis aplikasi. Sudah dilengkapi antivirus dan sistem backup internal.',
  },
  {
    id: '3',
    jenis: 'Asset',
    waktu: '10 mins ago',
    deskripsi:
      'Router utama yang mengelola jaringan intranet antar-OPD. Dilengkapi failover otomatis dan terhubung ke sistem monitoring jaringan kota.',
  },
];

const VerifierNotificationsScreen = ({ navigation }) => {
  const [items, setItems] = React.useState(
    dummyNotifs.map(n => ({ ...n, status: 'New' }))
  );

  const updateStatus = (id, status) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, status } : i))
    );
  };

  const handleDismiss = (id) => {
    updateStatus(id, 'Dismissed');
    // TODO: kirim status ke backend (dismiss)
  };

  const handleAccept = (item) => {
    updateStatus(item.id, 'Accepted');
    // TODO: kirim status ke backend (accepted)
    if (item.jenis === 'Asset') {
      navigation.navigate('VerifierAssetDetail', { id: item.id });
    }
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        {items.map(item => (
          <SectionCard key={item.id} style={styles.card}>
            <View style={styles.headerRow}>
              <View style={styles.headerLeft}>
                <View style={styles.iconBox}>
                  <Icon
                    name={item.jenis === 'Asset' ? 'home' : 'send'}
                    size={20}
                    color="#000"
                  />
                </View>
                <View>
                  <View style={styles.titleRow}>
                    <Text style={styles.dinasText}>Dinas</Text>
                    {item.kode && (
                      <>
                        <Text style={styles.sep}> | </Text>
                        <Text style={styles.kodeText}>{item.kode}</Text>
                      </>
                    )}
                  </View>
                  <Text style={styles.timeText}>
                    {item.waktu} · {item.status}
                  </Text>
                </View>
              </View>

              <TouchableOpacity onPress={() => handleDismiss(item.id)}>
                <Icon name="x" size={18} color="#666" />
              </TouchableOpacity>
            </View>

            <Text style={styles.bodyText}>{item.deskripsi}</Text>

            <View style={styles.actionRow}>
              <TouchableOpacity onPress={() => handleDismiss(item.id)}>
                <Text style={styles.dismissText}>Dismiss</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAccept(item)}>
                <Text style={styles.acceptText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </SectionCard>
        ))}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
  card: {
    backgroundColor: '#F5FAFF',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dinasText: {
    fontSize: 14,
    fontWeight: '700',
  },
  sep: {
    fontSize: 14,
    marginHorizontal: 2,
  },
  kodeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  bodyText: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: spacing.sm,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: spacing.lg,
  },
  dismissText: {
    fontSize: 13,
    color: '#666',
  },
  acceptText: {
    fontSize: 13,
    color: '#0052CC',
    fontWeight: '600',
  },
});

export default VerifierNotificationsScreen;
