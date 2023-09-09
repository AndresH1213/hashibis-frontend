import { getCurrentUser } from '@/lib/session';

import React from 'react';
import SectionForm from './components/SectionForm';
import { getMedicalHistoryById } from '@/services/MedicalHistory';

const fetchUserData = async (sub: string, token: string) => {
  const resp = await getMedicalHistoryById(sub!, token);
  const data = await resp.json();
  return data;
};

const page = async () => {
  const userCreds = await getCurrentUser();

  const { medicalHistory } = await fetchUserData(
    userCreds.user.id,
    userCreds.token!
  );
  return (
    <div className="w-full h-full px-4">
      <SectionForm userData={medicalHistory} />
    </div>
  );
};

export default page;
