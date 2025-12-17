import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import spacing from '../../theme/spacing';
import colors from '../../theme/colors';
import { useVerifierSubmissions } from '../../context/VerifierSubmissionsContext';

const FILTERS = ['Asset', 'Risk', 'Risk Treatment', 'Maintenance', 'Asset Deletion'];

const VerifierVerificationScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = React.useState('Asset');
  const { submissions, loading, refetch } = useVerifierSubmissions();

  const items = submissions[activeFilter] || [];

  const handleReview = item => {
    navigation.navigate('VerifierSubmissionDetail', {
      type: activeFilter,
      submissionId: item.id,
      initialSubmission: item,
    });
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Verification</Text>
          <TouchableOpacity style={styles.refreshButton} onPress={refetch}>
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterChip,
                activeFilter === f && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === f && styles.filterTextActive,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.loaderText}>Memuat pengajuan...</Text>
          </View>
        ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {items.map(item => (
            <SectionCard key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.cardTitle}>{item.id}</Text>
                  <Text style={styles.cardMeta}>
                    {item.pemohon} · {item.waktu}
                  </Text>
                </View>
                <View style={styles.statusPill}>
                  <Text style={styles.statusText}>Menunggu</Text>
                </View>
              </View>

              <View style={styles.fieldList}>
                {(item.previewFields || []).map(field => (
                  <View key={field.label} style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>{field.label}</Text>
                    <Text style={styles.fieldValue}>{field.value}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.approveButton}
                  onPress={() => handleReview(item)}
                >
                  <Text style={styles.approveText}>Lihat Form</Text>
                </TouchableOpacity>
              </View>
            </SectionCard>
          ))}

          {!items.length && (
            <Text style={styles.emptyText}>
              Belum ada pengajuan untuk kategori ini.
            </Text>
          )}
        </ScrollView>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  refreshButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  refreshText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  filterRow: {
    paddingVertical: 4,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#F2F4F7',
    marginRight: spacing.sm,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 11,
    color: colors.text,
  },
  filterTextActive: {
    color: '#FFF',
    fontWeight: '700',
  },
  list: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  card: {
    backgroundColor: '#F7FBFF',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 14,
  },
  cardMeta: {
    fontSize: 12,
    color: colors.textMuted,
  },
  statusPill: {
    backgroundColor: '#E0E8FF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  fieldList: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  fieldValue: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
    flex: 1,
    marginLeft: spacing.sm,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  approveButton: {
    backgroundColor: '#0062FF',
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  approveText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textMuted,
  },
  loader: {
    marginTop: spacing.xl,
    alignItems: 'center',
    gap: spacing.xs,
  },
  loaderText: {
    fontSize: 12,
    color: colors.textMuted,
  },
});

export default VerifierVerificationScreen;
