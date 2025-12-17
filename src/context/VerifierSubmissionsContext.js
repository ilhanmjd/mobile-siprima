import React from 'react';
import dayjs from 'dayjs';
import {
  getDinasAssets,
  getDinasRisks,
  getRiskTreatments,
  getMaintenances,
  getAssetDeletions,
} from '../api/siprima';

const initialState = {
  Asset: [],
  Risk: [],
  'Risk Treatment': [],
  Maintenance: [],
  'Asset Deletion': [],
};

const VerifierSubmissionsContext = React.createContext();

const normalizeStatus = status =>
  String(status || '')
    .toLowerCase()
    .trim();

const isPendingStatus = status => {
  const normalized = normalizeStatus(status);
  return (
    normalized === 'pending' ||
    normalized === 'under review' ||
    normalized === 'under_review' ||
    normalized === 'menunggu' ||
    normalized === 'penanganan'
  );
};

const formatDate = value => {
  if (!value) {
    return '-';
  }
  const d = dayjs(value);
  return d.isValid() ? d.format('DD/MM/YYYY HH:mm') : '-';
};

const mapAssetSubmissions = assets =>
  assets
    .filter(item => isPendingStatus(item.status))
    .map(item => {
      const steps = ['Identitas Aset', 'Detail Perolehan', 'Penanggung Jawab'];
      const sections = [
        {
          title: 'Identitas Aset',
          fields: [
            { label: 'Kategori Aset', value: item?.kategori?.nama || '-' },
            {
              label: 'Sub Kategori',
              value:
                item?.sub_kategori?.nama ||
                item?.subkategori?.nama ||
                item?.subKategori?.nama ||
                '-',
            },
            { label: 'Nama Asset', value: item.nama || '-' },
            { label: 'Deskripsi Asset', value: item.deskripsi || '-' },
          ],
        },
        {
          title: 'Detail Perolehan',
          fields: [
            {
              label: 'Tanggal Perolehan Asset',
              value: formatDate(item.tgl_perolehan),
            },
            {
              label: 'Nilai Perolehan',
              value: item.nilai_perolehan
                ? `Rp ${item.nilai_perolehan.toLocaleString('id-ID')}`
                : '-',
            },
            { label: 'Kondisi Asset', value: item.kondisi || '-' },
            {
              label: 'Lampiran Bukti',
              value: item.lampiran_bukti ? String(item.lampiran_bukti) : '-',
            },
          ],
        },
        {
          title: 'Penanggung Jawab',
          fields: [
            {
              label: 'Penanggung Jawab',
              value:
                item?.penanggungjawab?.nama ||
                item?.penanggung_jawab?.nama ||
                '-',
            },
            { label: 'Lokasi', value: item?.lokasi?.nama || '-' },
            { label: 'Status', value: item.status || '-' },
          ],
        },
      ];
      return {
        id: `A-${item.id}`,
        pemohon: item?.dinas?.nama || 'Dinas',
        waktu: formatDate(item.created_at),
        previewFields: sections[0].fields,
        sections,
        steps,
        raw: item,
        type: 'Asset',
      };
    });

const mapRiskSubmissions = risks =>
  risks
    .filter(item => isPendingStatus(item.status))
    .map(item => {
      const assetName =
        item?.asset?.nama ||
        item?.asset_name ||
        item?.asset?.nama_asset ||
        '-';
      const steps = ['Identifikasi', 'Analisis', 'Review'];
      const sections = [
        {
          title: 'Identifikasi Risiko',
          fields: [
            { label: 'Asset', value: assetName },
            { label: 'Judul Risiko', value: item.judul || '-' },
            { label: 'Penyebab', value: item.penyebab || '-' },
          ],
        },
        {
          title: 'Analisis',
          fields: [
            { label: 'Dampak', value: item.dampak || '-' },
            { label: 'Probabilitas', value: String(item.probabilitas ?? '-') },
            { label: 'Nilai Dampak', value: String(item.nilai_dampak ?? '-') },
          ],
        },
        {
          title: 'Review',
          fields: [
            { label: 'Prioritas', value: item.prioritas || '-' },
            { label: 'Status', value: item.status || '-' },
          ],
        },
      ];
      return {
        id: `R-${item.id}`,
        pemohon: item?.dinas?.nama || 'Dinas',
        waktu: formatDate(item.created_at),
        previewFields: sections[0].fields,
        sections,
        steps,
        raw: item,
        type: 'Risk',
      };
    });

const mapRiskTreatmentSubmissions = rts =>
  rts
    .filter(item => isPendingStatus(item.status))
    .map(item => {
      const assetName =
        item?.risk?.asset?.nama ||
        item?.asset?.nama ||
        item?.asset_name ||
        '-';
      const steps = ['Rencana', 'Residual'];
      const sections = [
        {
          title: 'Rencana Perlakuan',
          fields: [
            { label: 'Asset', value: assetName },
            { label: 'Strategi', value: item.strategi || '-' },
            { label: 'Pengendalian', value: item.pengendalian || '-' },
            {
              label: 'Target Tanggal',
              value: formatDate(item.target_tanggal),
            },
            { label: 'Biaya', value: item.biaya ? `Rp ${item.biaya}` : '-' },
          ],
        },
        {
          title: 'Residual Risk',
          fields: [
            {
              label: 'Probabilitas Akhir',
              value: String(item.probabilitas_akhir ?? '-'),
            },
            {
              label: 'Dampak Akhir',
              value: String(item.dampak_akhir ?? '-'),
            },
            {
              label: 'Level Residual',
              value: String(item.level_residual ?? '-'),
            },
          ],
        },
      ];
      return {
        id: `RT-${item.id}`,
        pemohon: item?.risk?.dinas?.nama || 'Dinas',
        waktu: formatDate(item.created_at),
        previewFields: sections[0].fields,
        sections,
        steps,
        raw: item,
        type: 'Risk Treatment',
      };
    });

const mapMaintenanceSubmissions = maintenances =>
  maintenances
    .filter(item => isPendingStatus(item?.status_review ?? item?.status))
    .map(item => {
      const assetIdValue = item?.asset_id
        ? String(item.asset_id)
        : item?.asset?.id
        ? String(item.asset.id)
        : '-';
      const steps = ['Identitas Aset', 'Detail Pengajuan'];
      const sections = [
        {
          title: 'Identitas Aset',
          fields: [{ label: 'ID Aset', value: assetIdValue }],
        },
        {
          title: 'Detail Pengajuan',
          fields: [
            {
              label: 'Alasan Pemeliharaan',
              value: item.alasan_pemeliharaan || '-',
              multiline: true,
            },
            { label: 'Bukti Lampiran', value: item.bukti_lampiran || '-' },
          ],
        },
      ];
      return {
        id: `M-${item.id}`,
        pemohon: item?.asset?.dinas?.nama || 'Dinas',
        waktu: formatDate(item.created_at),
        previewFields: sections[0].fields,
        sections,
        steps,
        raw: item,
        type: 'Maintenance',
      };
    });

const mapAssetDeletionSubmissions = deletions =>
  deletions
    .filter(item => isPendingStatus(item?.status))
    .map(item => {
      const assetName = item?.asset?.nama || `Asset ${item.asset_id}`;
      const steps = ['Penghapusan Aset', 'Konfirmasi'];
      const sections = [
        {
          title: 'Penghapusan Aset',
          fields: [
            { label: 'ID Aset', value: String(item.asset_id || '-') },
            { label: 'Nama Aset', value: assetName },
          ],
        },
        {
          title: 'Konfirmasi',
          fields: [
            {
              label: 'Alasan Penghapusan',
              value: item.alasan_penghapusan || '-',
              multiline: true,
            },
            { label: 'Lampiran', value: item.lampiran || '-' },
            { label: 'Status', value: item.status || '-' },
          ],
        },
      ];
      return {
        id: `AD-${item.id}`,
        pemohon: item?.asset?.dinas?.nama || 'Dinas',
        waktu: formatDate(item.created_at),
        previewFields: sections[0].fields,
        sections,
        steps,
        raw: item,
        type: 'Asset Deletion',
      };
    });

const buildNotifications = submissions =>
  Object.entries(submissions).flatMap(([type, items]) =>
    items.map(item => ({
      id: item.id,
      jenis: type,
      kode: item.raw?.kode_bmd || item.raw?.asset?.kode_bmd,
      waktu: item.waktu,
      status: 'Pending',
      deskripsi:
        item.previewFields?.find(f => f.label === 'Deskripsi')?.value ||
        item.previewFields?.[0]?.value ||
        '',
    })),
  );

export const VerifierSubmissionsProvider = ({ children }) => {
  const [submissions, setSubmissions] = React.useState(initialState);
  const [notifications, setNotifications] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

const fetchWithPendingPref = async (apiCall, label) => {
  try {
    const res = await apiCall({ status: 'pending' });
    return res?.data?.data || [];
  } catch (err) {
    console.log(
      `VERIFIER ${label} PENDING ERROR:`,
      err?.response?.data || err?.message,
    );
    try {
      const fallback = await apiCall();
      return fallback?.data?.data || [];
    } catch (fallbackErr) {
      console.log(
        `VERIFIER ${label} FETCH ERROR:`,
        fallbackErr?.response?.data || fallbackErr?.message,
      );
      return [];
    }
  }
};

  const fetchMaintenanceData = async () => {
    try {
      const res = await getMaintenances();
      return res?.data?.data || [];
    } catch (err) {
      console.log(
        'VERIFIER MAINTENANCE FETCH ERROR:',
        err?.response?.data || err?.message,
      );
      return [];
    }
  };
  const fetchAssetDeletionData = async () => {
    try {
      const res = await getAssetDeletions();
      return res?.data?.data || [];
    } catch (err) {
      console.log(
        'VERIFIER ASSET DELETION FETCH ERROR:',
        err?.response?.data || err?.message,
      );
      return [];
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const [assetData, riskData, rtData] = await Promise.all([
      fetchWithPendingPref(getDinasAssets, 'ASSET'),
      fetchWithPendingPref(getDinasRisks, 'RISK'),
      fetchWithPendingPref(getRiskTreatments, 'RISK TREATMENT'),
    ]);
    const maintenanceData = await fetchMaintenanceData();
    const assetDeletionData = await fetchAssetDeletionData();

    const assetSubs = mapAssetSubmissions(assetData);
    const riskSubs = mapRiskSubmissions(riskData);
    const rtSubs = mapRiskTreatmentSubmissions(rtData);
    const maintenanceSubs = mapMaintenanceSubmissions(maintenanceData);
    const assetDeletionSubs = mapAssetDeletionSubmissions(assetDeletionData);

    const newSubmissions = {
      Asset: assetSubs,
      Risk: riskSubs,
      'Risk Treatment': rtSubs,
      Maintenance: maintenanceSubs,
      'Asset Deletion': assetDeletionSubs,
    };

    setSubmissions(newSubmissions);
    setNotifications(buildNotifications(newSubmissions));
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const markSubmissionDecision = (type, submissionId, decision) => {
    setSubmissions(prev => {
      const updated = { ...prev };
      updated[type] = (updated[type] || []).map(item =>
        item.id === submissionId
          ? {
              ...item,
              lastDecision: decision,
            }
          : item,
      );
      return updated;
    });
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === submissionId
          ? { ...notification, status: decision === 'approve' ? 'Accepted' : 'Rejected' }
          : notification,
      ),
    );
  };

  return (
    <VerifierSubmissionsContext.Provider
      value={{
        submissions,
        notifications,
        markSubmissionDecision,
        loading,
        refetch: fetchData,
      }}
    >
      {children}
    </VerifierSubmissionsContext.Provider>
  );
};

export const useVerifierSubmissions = () => {
  const ctx = React.useContext(VerifierSubmissionsContext);
  if (!ctx) {
    throw new Error(
      'useVerifierSubmissions must be used within VerifierSubmissionsProvider',
    );
  }
  return ctx;
};
