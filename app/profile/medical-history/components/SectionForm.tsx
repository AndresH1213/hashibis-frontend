'use client';

import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import Notification from '@/lib/notification';
import MedicalHistoryQuestions from './MedicalHistoryQuestions';
import CannabisUsageQuestions from './CannabisUsageQuestions';
import MentalHealthQuestions from './MentalHealthQuestions';
import { MedicalUserData } from '@/types';
import ButtonSave from '../../components/ButtonSave';

type Props = {
  title: string;
  content: React.ReactNode;
};

const getNotifications = () => {
  const failedNotification = new Notification({
    message: `Error upload medical information`,
    type: 'error',
  });

  const successNotification = new Notification({
    message: `Medical Information uploaded`,
    type: 'success',
  });
  return { successNotification, failedNotification };
};

const DisclosureWrapper = ({ title, content }: Props) => {
  return (
    <Disclosure
      as="div"
      defaultOpen={title === 'Medical History'}
      className="2xl:w-[750px] lg:w-[600px] 2xl:-translate-x-28 lg:-translate-x-24 p-0"
    >
      {({ open }) => (
        <>
          <Disclosure.Button className="flex min-w-full h-11 sm:w-80 justify-between rounded-sm bg-light-white-200 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-black-light focus-visible:ring-opacity-75">
            <span>{title}</span>
            <svg
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 text-black-light`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1.707 2.707 5.586 5.586a1 1 0 0 0 1.414 0l5.586-5.586A1 1 0 0 0 13.586 1H2.414a1 1 0 0 0-.707 1.707Z"
              />
            </svg>
          </Disclosure.Button>
          <Disclosure.Panel className="text-sm text-gray-500">
            {content}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const sectionForm = ({ userData }: { userData: MedicalUserData }) => {
  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const getInitForm = () => {
    return {
      allergies: userData.allergies || '',
      chronicIllnesses: userData.chronicIllnesses || '',
      prescriptionMedication: userData.prescriptionMedication || '',
      previousExperienceWithTHC: userData.previousExperienceWithTHC || '',
      frequenceOfUsage: userData.frequenceOfUsage || 'ocassional',
      effectsExperienced: userData.effectsExperienced || '',
      psychiatricIssues: userData.psychiatricIssues || '',
      historyOfAbuse: userData.historyOfAbuse || '',
      mentalHealthMedications: userData.mentalHealthMedications || '',
    };
  };
  const [form, setForm] = useState(getInitForm());

  const handleSubmit = async () => {
    console.log({ form });
    const resp = await fetch('/api/medical-history', {
      method: 'POST',
      body: JSON.stringify(form),
    });
    if (resp.status !== 201) {
      getNotifications().failedNotification.notificate();
    } else {
      getNotifications().successNotification.notificate();
      setForm(getInitForm());
    }
  };
  return (
    <div className="mx-auto w-full max-w-md p-2">
      <DisclosureWrapper
        title="Medical History"
        content={
          <MedicalHistoryQuestions
            allergies={{
              state: form.allergies,
              setState: (value: string) =>
                handleStateChange('allergies', value),
            }}
            chronicIllnesses={{
              state: form.chronicIllnesses,
              setState: (value: string) =>
                handleStateChange('chronicIllnesses', value),
            }}
            prescriptionMedication={{
              state: form.prescriptionMedication,
              setState: (value: string) =>
                handleStateChange('prescriptionMedication', value),
            }}
          />
        }
      />
      <DisclosureWrapper
        title="Cannabis Usage History"
        content={
          <CannabisUsageQuestions
            previousExperienceWithTHC={{
              state: form.previousExperienceWithTHC,
              setState: (value: string) =>
                handleStateChange('previousExperienceWithTHC', value),
            }}
            frequenceOfUsage={{
              state: form.frequenceOfUsage,
              setState: (value: string) =>
                handleStateChange('frequenceOfUsage', value),
            }}
            effectsExperienced={{
              state: form.effectsExperienced,
              setState: (value: string) =>
                handleStateChange('effectsExperienced', value),
            }}
          />
        }
      />
      <DisclosureWrapper
        title="Mental and Emotional Health"
        content={
          <MentalHealthQuestions
            historyOfAbuse={{
              state: form.historyOfAbuse,
              setState: (value: string) =>
                handleStateChange('historyOfAbuse', value),
            }}
            mentalHealthMedications={{
              state: form.mentalHealthMedications,
              setState: (value: string) =>
                handleStateChange('mentalHealthMedications', value),
            }}
            psychiatricIssues={{
              state: form.psychiatricIssues,
              setState: (value: string) =>
                handleStateChange('psychiatricIssues', value),
            }}
          />
        }
      />
      <div className="flexCenter w-full">
        <ButtonSave handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default sectionForm;
