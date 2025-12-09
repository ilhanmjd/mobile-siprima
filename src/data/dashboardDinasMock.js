// src/data/dashboardDinasMock.js

export const dashboardStats = {
  risks_active: 24,
  assets_in_maintenance: 12,
  risks_handled: 18,
  assets_end_of_life: 4,
};

export const verificationChart = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Asset Verified',
      color: '#7B61FF',
      data: [100, 300, 200, 150, 50, -200, 100],
    },
    {
      label: 'Risk Verified',
      color: '#FFD86F',
      data: [-900, 700, 400, 200, 100, -500, 500],
    },
  ],
};

export const residualRisk = [
  { label: 'Low / Medium', value: 80, color: '#4CAF50' },
  { label: 'High / Critical', value: 20, color: '#F44336' },
];

export const riskHandling = [
  { id: 'RH-001', asset_name: 'Asset laptop', status: 'Ditangani' },
  { id: 'RH-002', asset_name: 'Asset Komputer', status: 'Proses' },
  { id: 'RH-003', asset_name: 'Data Cloud', status: 'Proses' },
];

export const priorityRisks = [
  { id: 'PR-001', label: 'Laptop', value: 10 },
  { id: 'PR-002', label: 'Server', value: 8 },
  { id: 'PR-003', label: 'Router', value: 6 },
];
