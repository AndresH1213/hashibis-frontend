import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/session';
import Spinner from '@/components/common/Spinner';

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();

  if (!session || !session.user) {
    return <h1 className="flexCenter">Please authenticate for this page</h1>;
  }

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="absolute top-[89px] left-0 z-40 w-56 h-full transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-light-white-200 opacity-80 ">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/profile"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <Image
                  src="/profile-logo.svg"
                  height={20}
                  width={20}
                  alt="user profile logo"
                />
                <span className="ml-3">Profile</span>
              </Link>
            </li>
            <li>
              <Link
                href="/profile/details"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <Image
                  src="/details.svg"
                  height={20}
                  width={20}
                  alt="user details logo"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  My details
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/profile/favorite"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <Image
                  src="/hearth.svg"
                  height={20}
                  width={20}
                  alt="user details logo"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Favorites Products
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/profile/medical-history"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <Image
                  src="/medical-logo.svg"
                  height={20}
                  width={20}
                  alt="medical information logo"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Medical History
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-1 sm:p-4 sm:ml-64 min-h-screen">
        <Suspense fallback={<Spinner />}>
          <div className="p-1 sm:p-4 border-2 border-gray-200 relative border-dashed rounded-lg">
            {children}
          </div>
        </Suspense>
      </div>
    </>
  );
}
