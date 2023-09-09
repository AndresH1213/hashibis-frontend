'use client';

import React, { useState } from 'react';
import Notification from '@/lib/notification';
import { PersonalUserData } from '@/types';
import FormField from '../../components/FormField';
import { CustomMenu } from '@/components/common';
import ButtonSave from '../../components/ButtonSave';
import PhoneInput from 'react-phone-number-input';

const getNotifications = () => {
  const failedNotification = new Notification({
    message: `Error uploading personal details`,
    type: 'error',
  });

  const successNotification = new Notification({
    message: `Personal Information uploaded`,
    type: 'success',
  });
  return { successNotification, failedNotification };
};

const DetailsForm = ({ userData }: { userData: PersonalUserData }) => {
  const handleSubmit = async () => {
    const { successNotification, failedNotification } = getNotifications();
    const resp = await fetch('/api/personal-information', {
      method: 'POST',
      body: JSON.stringify(form),
    });
    if (resp.status === 201) {
      successNotification.notificate();
      setForm(getInitForm());
    } else if (resp.status === 400) {
      const { errors } = await resp.json();
      if (!errors?.length) return failedNotification.notificate();
      errors.forEach(({ message }: { message: string }) => {
        const ErrorNotification = new Notification({
          message,
          type: 'error',
          theme: 'colored',
          autoClose: 5000,
        });
        ErrorNotification.notificate();
      });
    }
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };
  const getInitForm = () => {
    return {
      name: userData.name,
      lastname: userData.lastname,
      birthday: userData.birthday || '',
      address: userData.address || '',
      country: userData.country || '',
      identification: userData.identification || '',
      identificationType: userData.identificationType || '',
      gender: userData.gender || '',
      phone: userData.phone || '',
      email: userData.email || '',
      hasMedicalHistory: userData.hasMedicalHistory || '',
    };
  };
  const [form, setForm] = useState(getInitForm());
  return (
    <div className="w-full m-auto max-w-2xl">
      <div className="flow-root bg-white shadow p-0 sm:p-8">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="py-1 sm:py-4 flex flex-col sm:flex-row">
            <div className="w-1/2">
              <p className="text-md font-semibold truncate ">Birthday</p>
              <p className="text-sm">🎉 Please provide us with your birthday</p>
            </div>
            <div className="ml-3">
              <label htmlFor="birthday"></label>
              <input
                type="date"
                id="birthday"
                className="bg-white-light border border-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date"
                value={form.birthday}
                onChange={(e) => handleStateChange('birthday', e.target.value)}
              />
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <FormField
              title="Address"
              state={form.address}
              setState={(value) => handleStateChange('address', value)}
              description="Where do you live?"
              placeholder="Cll 123, #48"
            />
          </li>
          <li className="py-3 sm:py-4 flex flex-col sm:flex-row">
            <div className="w-1/2 grid place-items-center">
              <CustomMenu
                title="Identification Type"
                state={form.identificationType}
                setState={(value) => handleStateChange('gender', value)}
                filters={['CC', 'NIT', 'PA']}
              />
            </div>
            <div className="relative ml-4">
              <input
                type="text"
                id="identification"
                onChange={(e) =>
                  handleStateChange('identification', e.target.value)
                }
                value={form.identification}
                className="block py-2.5 w-full text-sm font-semibold bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder={'112-123-123'}
              />
              <label className="text-sm" htmlFor="identification">
                Identification
              </label>
            </div>
          </li>
          <li className="py-3 sm:py-4 flex flex-col sm:flex-row">
            <div className="w-full">
              <p className="text-md font-semibold truncate ">Gender</p>
              <p className="text-sm">Please tells us your gender...</p>
            </div>
            <CustomMenu
              title=""
              state={form.gender}
              setState={(value) => handleStateChange('gender', value)}
              filters={['male', 'female', 'other']}
            />
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/2">
                <p className="text-md font-semibold truncate ">Phone</p>
                <p className="text-sm">Contact information</p>
              </div>
              <PhoneInput
                placeholder="Enter phone number"
                value={form.phone}
                defaultCountry="US"
                style={{ textAlign: 'center', maxWidth: '198px' }}
                onChange={(value) => handleStateChange('phone', value || '')}
              />
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <FormField
              title="Email"
              state={form.email}
              setState={(value) => handleStateChange('email', value)}
              description="Share us an email to contact you"
              placeholder="john@email.com"
            />
          </li>
        </ul>
      </div>
      <div className="flexCenter w-full">
        <ButtonSave handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default DetailsForm;
