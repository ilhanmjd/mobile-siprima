// src/api/siprima.js
import api from '../utils/axios';

export const getDinasAssets = () => api.get('/api/assets');
export const getDinasRisks = () => api.get('/api/risks');
export const getRiskTreatments = () => api.get('/api/risk-treatments');
export const getMaintenances = () => api.get('/api/maintenances');
export const createAsset = payload => api.post('/api/assets', payload);
export const getSubkategoriList = (kategoriId) =>
  api.get('/api/sub-kategoris', {
    params: kategoriId ? { kategori_id: kategoriId } : {},
  });
