'use client';

import RegisterValidator from '@/validations/RegisterValidator';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Notification from '@/lib/notification';

const SignUp = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [registrationStatusMessage, setRegistrationStatusMessage] =
    useState('');

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    const validator = new RegisterValidator(form);
    const isValid = validator.validate();
    if (!isValid) {
      setRegistrationStatusMessage(validator.getErrorMessage());
    }
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        givenName: form.givenName,
        familyName: form.familyName,
        email: form.email,
        password: form.password,
      }),
    });
    if (response.status !== 200) {
      const failedNotification = new Notification({
        message: 'Error registering user',
        type: 'error',
      });
      failedNotification.notificate();
      setForm((prevState) => ({
        ...prevState,
        password: '',
        confirmPassword: '',
      }));
    } else {
      const successNotification = new Notification({
        message: 'Registration succeded!',
        type: 'success',
      });
      successNotification.notificate();
      const encodedEmail = encodeURIComponent(form.email);
      router.push(`/signup/confirm-code?email=${encodedEmail}`);
    }
  };

  const [form, setForm] = useState({
    email: '',
    givenName: '',
    familyName: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <section className="flex justify-center items-center h-fit">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full my-5">
        <div className="flex space-x-6">
          <h2 className="text-xl font-semibold mb-2">Join Us Today!</h2>
          <Image
            className="translate-y-[-15px]"
            width={40}
            height={40}
            src="/loading-plant.gif"
            alt="logo"
            priority
          />
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-2 md:space-y-4">
          <div>
            <label className="text-sm">Email</label>
            <input
              value={form.email}
              onChange={(e) => handleStateChange('email', e.target.value)}
              className="register-form__field"
              placeholder="name@email.com"
              type="email"
            />
          </div>
          <div className="flex space-x-4">
            <div>
              <label className="text-sm">Given Name</label>
              <input
                value={form.givenName}
                onChange={(e) => handleStateChange('givenName', e.target.value)}
                className="register-form__field"
                placeholder="John"
                type="text"
              />
            </div>
            <div>
              <label className="text-sm">Family Name</label>
              <input
                value={form.familyName}
                onChange={(e) =>
                  handleStateChange('familyName', e.target.value)
                }
                className="register-form__field"
                placeholder="Doe"
                type="text"
              />
            </div>
          </div>
          <div>
            <label className="text-sm">Password</label>
            <input
              value={form.password}
              placeholder="••••••••"
              className="register-form__field"
              onChange={(e) => handleStateChange('password', e.target.value)}
              type="password"
            />
          </div>
          <div>
            <label className="text-sm">Confirm password</label>
            <input
              className="register-form__field"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={(e) =>
                handleStateChange('confirmPassword', e.target.value)
              }
              type="password"
            />
          </div>
          <input
            type="submit"
            value="Register"
            className="w-full py-3 px-4 mt-4 bg-green-50 hover:bg-green-100 hover:text-black-light text-black-100 font-semibold rounded cursor-pointer"
          />
        </form>
        <label className="text-red-500 mt-2">{registrationStatusMessage}</label>
        <div className="mt-4">
          Already have an account? <Link href="/login">Login</Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
