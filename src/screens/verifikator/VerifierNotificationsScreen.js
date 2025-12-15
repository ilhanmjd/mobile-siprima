import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/Feather';
import { useVerifierSubmissions } from '../../context/VerifierSubmissionsContext';

const VerifierNotificationsScreen = () => {
  const { notifications } = useVerifierSubmissions();

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        {notifications.map(item => (
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

              <Icon name="bell" size={18} color="#666" />
            </View>

            <Text style={styles.bodyText}>{item.deskripsi}</Text>
          </SectionCard>
        ))}

        {!notifications.length && (
          <Text style={styles.emptyText}>Belum ada notifikasi baru.</Text>
        )}
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
  },
  emptyText: {
    marginTop: spacing.lg,
    textAlign: 'center',
    color: colors.textMuted,
  },
});

export default VerifierNotificationsScreen;
