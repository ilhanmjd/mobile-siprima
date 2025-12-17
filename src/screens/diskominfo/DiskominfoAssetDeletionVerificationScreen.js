// DiskominfoAssetDeletionVerificationScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  getAssetDeletions,
  deleteAssetByDiskominfo,
} from '../../api/siprima';

const DiskominfoAssetDeletionVerificationScreen = () => {
  const [loading, setLoading] = useState(true);
  const [deletions, setDeletions] = useState([]);
  const [selectedDeletion, setSelectedDeletion] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchAcceptedDeletions();
  }, []);

  const fetchAcceptedDeletions = async () => {
    try {
      setLoading(true);
      const res = await getAssetDeletions({ status: 'accepted' });
      setDeletions(res.data.data || res.data || []);
    } catch (error) {
      console.error('Failed to fetch deletions:', error);
      Alert.alert('Error', 'Gagal mengambil data penghapusan aset');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAsset = (deletion) => {
    Alert.alert(
      'Konfirmasi',
      `Apakah Anda yakin ingin menghapus asset "${deletion.asset?.nama}"? Tindakan ini tidak dapat dibatalkan!`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => doDeleteAsset(deletion),
        },
      ],
    );
  };

  const doDeleteAsset = async (deletion) => {
    try {
      setIsDeleting(true);
      await deleteAssetByDiskominfo(deletion.asset_id);
      Alert.alert('Sukses', 'Asset berhasil dihapus dari sistem!');
      await fetchAcceptedDeletions();
      setSelectedDeletion(null);
    } catch (error) {
      console.error('Failed to delete asset:', error);
      Alert.alert('Error', 'Gagal menghapus asset. Silakan coba lagi.');
    } finally {
      setIsDeleting(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.assetName}>{item.asset?.nama || 'dummy data'}</Text>
      <Text style={styles.assetMeta}>Alasan Penghapusan:</Text>
      <Text style={styles.reason}>{item.alasan_penghapusan}</Text>
      <Text style={styles.assetMeta}>Kondisi:</Text>
      <Text style={styles.chip}>{item.asset?.kondisi || 'baik'}</Text>
      <Text style={styles.dateText}>
        Diajukan: {new Date(item.created_at).toLocaleDateString('id-ID')}
      </Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => setSelectedDeletion(item)}
        >
          <Text style={styles.detailButtonText}>View Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteAsset(item)}
          disabled={isDeleting}
        >
          <Text style={styles.deleteButtonText}>
            {isDeleting ? 'Processing...' : 'Delete Asset'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0052CC" />
        <Text style={styles.loadingText}>Memuat daftar penghapusan aset...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asset Deletion Management</Text>
      <Text style={styles.subtitle}>
        Daftar asset yang sudah disetujui untuk dihapus. Klik "Delete Asset" untuk menghapus asset dari sistem.
      </Text>

      {deletions.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>
            Tidak ada asset yang menunggu untuk dihapus.
          </Text>
        </View>
      ) : (
        <FlatList
          data={deletions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}

      <Modal
        visible={!!selectedDeletion}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedDeletion(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.modalTitle}>Detail Penghapusan Aset</Text>

              <Text style={styles.modalLabel}>Nama Aset</Text>
              <Text style={styles.modalValue}>
                {selectedDeletion?.asset?.nama || 'N/A'}
              </Text>

              <Text style={styles.modalLabel}>ID Aset</Text>
              <Text style={styles.modalValue}>
                {selectedDeletion?.asset_id || 'N/A'}
              </Text>

              <Text style={styles.modalLabel}>Kondisi</Text>
              <Text style={styles.modalValue}>
                {selectedDeletion?.asset?.kondisi || 'N/A'}
              </Text>

              <Text style={styles.modalLabel}>Lokasi</Text>
              <Text style={styles.modalValue}>
                {selectedDeletion?.asset?.lokasi?.nama || 'N/A'}
              </Text>

              <Text style={styles.modalLabel}>Alasan Penghapusan</Text>
              <Text style={styles.modalValue}>
                {selectedDeletion?.alasan_penghapusan || '-'}
              </Text>

              <Text style={styles.modalLabel}>Lampiran</Text>
              <Text style={styles.modalValue}>
                {selectedDeletion?.lampiran || '-'}
              </Text>

              <Text style={styles.modalLabel}>Tanggal Permintaan</Text>
              <Text style={styles.modalValue}>
                {selectedDeletion
                  ? new Date(
                      selectedDeletion.created_at,
                    ).toLocaleString('id-ID')
                  : '-'}
              </Text>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setSelectedDeletion(null)}
              >
                <Text style={styles.modalCloseText}>Tutup</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalDeleteButton}
                onPress={() => handleDeleteAsset(selectedDeletion)}
                disabled={isDeleting}
              >
                <Text style={styles.modalDeleteText}>
                  {isDeleting ? 'Processing...' : 'Delete Asset'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DiskominfoAssetDeletionVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2FF',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#001B3D',
    marginTop: 8,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B778C',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B778C',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  assetName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#172B4D',
    marginBottom: 8,
  },
  assetMeta: {
    fontSize: 12,
    color: '#6B778C',
  },
  reason: {
    fontSize: 12,
    color: '#172B4D',
    marginBottom: 4,
  },
  chip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: '#FFE9ED',
    color: '#D4380D',
    fontSize: 11,
    marginBottom: 6,
  },
  dateText: {
    fontSize: 11,
    color: '#97A0AF',
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  detailButton: {
    backgroundColor: '#1890FF',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  detailButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  deleteButton: {
    backgroundColor: '#FF4D4F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#6B778C',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    maxHeight: '80%',
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#001B3D',
    marginBottom: 12,
  },
  modalLabel: {
    fontSize: 12,
    color: '#6B778C',
    marginTop: 8,
  },
  modalValue: {
    fontSize: 14,
    color: '#172B4D',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  modalCloseButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#DFE1E6',
    marginRight: 8,
  },
  modalCloseText: {
    fontSize: 13,
    color: '#172B4D',
  },
  modalDeleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#FF4D4F',
  },
  modalDeleteText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
