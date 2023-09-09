'use client';

import React from 'react';
import AuthProviders from '@/components/AuthProviders';
import Image from 'next/image';
import Link from 'next/link';
import SmallModal from '@/components/common/SmallModal';

const DisplayProviders = () => {
  return (
    <>
      <div className="h-80"></div>
      <SmallModal>
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
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Please select one of this providers to sign up
                    </p>
                  </div>
                  <div>
                    <AuthProviders />
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </SmallModal>
    </>
  );
};

export default DisplayProviders;
