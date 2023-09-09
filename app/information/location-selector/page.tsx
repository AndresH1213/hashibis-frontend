'use client';

import { Tab } from '@headlessui/react';
import locationSelector from '@/i18n/en/location-selector.json';
import React from 'react';
import Image from 'next/image';

const locationPage = () => {
  return (
    <div className="flexCenter flex-col mx-auto mt-8 text-center">
      <h2 className="text-2xl font-semibold">{locationSelector.title}</h2>
      <Tab.Group>
        <Tab.List className="flex space-x-5 m-5 rounded-x px-3 py-2">
          {locationSelector.content.map((obj, index) => {
            return (
              <Tab key={index}>
                <h2 className="w-full leading- rounded-lg py-2.5 text-sm font-medium leading-5">
                  {obj.region}
                </h2>
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {locationSelector.content.map((obj, index) => {
            return (
              <Tab.Panel
                key={`${index}`}
                className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              >
                <ul>
                  {obj.countries.map((country, index) => {
                    return (
                      <li
                        key={index + 'a'}
                        className="flex items-center rounded-md p-2 relative hover:bg-gray-100"
                      >
                        <Image
                          src={`/flags/${country.flagPath}`}
                          alt={`${country.name} flag`}
                          width={30}
                          height={30}
                          className="mr-2"
                        />
                        <div>{country.name}</div>
                      </li>
                    );
                  })}
                </ul>
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
export default locationPage;
