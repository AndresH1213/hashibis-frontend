'use client';

import React, { useState } from 'react';
import AuthProviders from './AuthProviders';
import Image from 'next/image';
import Button from './common/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Notification from '@/lib/notification';
import { signIn } from 'next-auth/react';

const SignInForm = ({ handleModal }: { handleModal: any }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: form.email, password: form.password }),
    });

    if (response.status !== 200) {
      const failedNotification = new Notification({
        message: 'Invalid Credentials',
        type: 'error',
      });
      failedNotification.notificate();
      setForm((prevState) => ({
        ...prevState,
        password: '',
        confirmPassword: '',
      }));
    } else {
      const data = await response.json();
      const cognitoTokens = {
        accessToken: data.AccessToken,
        idToken: data.IdToken,
        refreshToken: data.RefreshToken,
        tokenType: data.TokenType,
      };

      const successNotification = new Notification({
        message: 'Login succed!',
        type: 'success',
      });
      successNotification.notificate();
      handleModal(false);
      router.push(`/`);
    }
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  return (
    <div className="gray-100 dark:bg-gray-900 min-w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <Image
          className="mb-2"
          width={100}
          height={50}
          src="/logo-green.svg"
          alt="logo"
        />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleFormSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium green-50"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => handleStateChange('email', e.target.value)}
                  className="bg-light-white-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  placeholder="name@email.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={(e) =>
                    handleStateChange('password', e.target.value)
                  }
                  placeholder="••••••••"
                  className="bg-light-white-200 border border-gray-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <Link
                  href="/auth/reset-password"
                  className="text-sm  font-medium hover:underline text-primary-cognac"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="flexCenter">
                <Button
                  type="submit"
                  title="Sign in"
                  bgColor="bg-green-50 !w-max"
                  textColor="text-black-100"
                  submitting={submitting}
                />
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <Link
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
              <div>
                <AuthProviders />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
