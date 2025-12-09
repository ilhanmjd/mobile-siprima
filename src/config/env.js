import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};

const normalizeBaseUrl = (value) => {
  if (!value) {
    return 'https://siprima.digitaltech.my.id/api';
  }
  return value.replace(/\/+$/, '');
};

export const API_BASE_URL = normalizeBaseUrl(extra.apiBaseUrl);
