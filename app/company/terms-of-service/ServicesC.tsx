'use client';

import { Disclosure } from '@headlessui/react';

export const ServicesC = ({
  title,
  liContent,
}: {
  title: string;
  liContent: string[];
}) => {
  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-green-50 px-4 py-2 text-left text-sm font-medium text-black-light hover:bg-green-100 focus:outline-none focus-visible:ring focus-visible:ring-green-100 focus-visible:ring-opacity-75">
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

            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              <ul className="list-disc ml-6 mb-6">
                {liContent.map((item, idx) => {
                  return <li key={`${idx}`}>{item}</li>;
                })}
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};
