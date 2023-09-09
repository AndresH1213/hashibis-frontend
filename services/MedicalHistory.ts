import { MedicalUserData } from '@/types';

const MEDICAL_HISTORY_URL = process.env.NEXT_PUBLIC_IS_LOCAL
  ? process.env.NEXT_PUBLIC_LOCALHOST_MEDICAL_HISTORY
  : process.env.NEXT_PUBLIC_API_DOMAIN_PROD;

export const createMedicalHistory = async (
  prod: MedicalUserData,
  token: string
) => {
  return await fetch(`${MEDICAL_HISTORY_URL}/medical-history`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
    },
    body: JSON.stringify(prod),
  });
};

export const updateMedicalHistory = async (
  mh: MedicalUserData,
  token: string
) => {
  return await fetch(`${MEDICAL_HISTORY_URL}/medical-history`, {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
    },
    body: JSON.stringify(mh),
  });
};

export const getMedicalHistoryById = async (id: string, token: string) => {
  return await fetch(`${MEDICAL_HISTORY_URL}/medical-history/${id}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
    },
  });
};
