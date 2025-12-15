// src/api/siprima.js
import api from '../utils/axios';

export const getDinasAssets = (params = {}) =>
  api.get('/api/assets', { params });
export const getDinasRisks = (params = {}) =>
  api.get('/api/risks', { params });
export const getRiskTreatments = (params = {}) =>
  api.get('/api/risk-treatments', { params });
export const getMaintenances = (params = {}) =>
  api.get('/api/maintenances', { params });
export const getMaintenanceById = id => api.get(`/api/maintenances/${id}`);
export const updateMaintenance = (id, payload) =>
  api.put(`/api/maintenances/${id}`, payload);
export const createAsset = payload => api.post('/api/assets', payload);
export const updateAsset = (id, payload) => api.put(`/api/assets/${id}`, payload);
export const createRisk = payload => api.post('/api/risks', payload);
export const approveRisk = id => api.post(`/api/risks/${id}/approve`);
export const rejectRisk = (id, payload) =>
  api.post(`/api/risks/${id}/reject`, payload);
export const createRiskTreatment = payload =>
  api.post('/api/risk-treatments', payload);
export const approveRiskTreatment = id =>
  api.post(`/api/risk-treatments/${id}/approve`);
export const rejectRiskTreatment = (id, payload) =>
  api.post(`/api/risk-treatments/${id}/reject`, payload);
export const createMaintenance = payload =>
  api.post('/api/maintenances', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const createAssetDeletion = payload =>
  api.post('/api/asset-deletions', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const getAssetDeletions = (params = {}) =>
  api.get('/api/asset-deletions', { params });
export const reviewAssetDeletion = (id, payload) =>
  api.put(`/api/asset-deletions/${id}/review`, payload);
export const getSubkategoriList = (kategoriId) =>
  api.get('/api/sub-kategoris', {
    params: kategoriId ? { kategori_id: kategoriId } : {},
  });
