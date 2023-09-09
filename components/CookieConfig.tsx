'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import cookieConfig from '@/i18n/en/cookie-config.json';
import { footerLinks } from '@/constants';

export default function ConfigCookie() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="cursor-pointer" onClick={openModal}>
        {footerLinks[4].links.at(-1)?.name}
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h2"
                    className="text-2xl mb-4 leading-6 font-semibold"
                  >
                    {cookieConfig.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-100">
                      {cookieConfig.intro}
                    </p>
                  </div>

                  <div>
                    <ul className="text-sm font-medium text-black bg-white rounded-lg">
                      {cookieConfig.content.map((item, idx) => {
                        return (
                          <li
                            className="w-full border-gray-50 rounded-t-lg"
                            key={`${idx}`}
                          >
                            <div className="flex items-center pl-3">
                              <input
                                id="vue-checkbox"
                                type="checkbox"
                                value=""
                                className="w-5 h-5 text-green-200 bg-gray-100 border-black-light rounded-lg focus:ring-green-100 focus:ring-2"
                              />
                              <label
                                htmlFor="vue-checkbox"
                                className="w-full py-3 ml-2 text-sm font-semibold text-gray-100"
                              >
                                {item.category}
                              </label>
                            </div>
                            <p className="block font-light ml-8 mb-2">
                              {item.description}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                    <p className="text-sm">{cookieConfig.learnMore}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-901 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-100 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      {cookieConfig.buttonText}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
