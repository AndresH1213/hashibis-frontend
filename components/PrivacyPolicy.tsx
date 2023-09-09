'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import privacyPolicyContent from '@/i18n/en/privacy-policy.json';
import { footerLinks } from '@/constants';
import Button from './common/Button';

export default function PrivacyPolicy() {
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
        {footerLinks[4].links.at(-2)?.name}
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
                <Dialog.Panel className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-6 lg:p-10 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h2"
                    className="text-2xl mb-4 leading-6 font-semibold"
                  >
                    {privacyPolicyContent.introduction.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-100">
                      {privacyPolicyContent.introduction.content}
                    </p>
                  </div>

                  <section className="mb-4 mt-3">
                    <h2 className="text-md md:text-lg lg:text-xl font-semibold my-2">
                      {privacyPolicyContent.informationCollection.title}
                    </h2>
                    <p className="text-sm md:text-md mb-4">
                      {privacyPolicyContent.informationCollection.content}
                    </p>
                    <ul className="list-disc list-inside pl-6">
                      {privacyPolicyContent.informationCollection.services.map(
                        (item, i) => {
                          return (
                            <li
                              className="text-sm md:text-md"
                              key={i.toString()}
                            >
                              {item}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </section>

                  <section className="mb-4">
                    <h2 className="text-md md:text-lg lg:text-xl font-semibold mb-2">
                      {privacyPolicyContent.informationUse.title}
                    </h2>
                    <p className="text-sm md:text-md mb-4">
                      {privacyPolicyContent.informationUse.content}
                    </p>
                    <ul className="list-disc list-inside pl-6">
                      {privacyPolicyContent.informationUse.uses.map(
                        (item, i) => {
                          return (
                            <li
                              className="text-sm md:text-md"
                              key={i.toString()}
                            >
                              {item}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </section>

                  <section className="mb-4">
                    <h2 className="text-md md:text-lg lg:text-xl font-semibold mb-2">
                      {privacyPolicyContent.medicalInformation.title}
                    </h2>
                    <p className="text-sm md:text-md mb-4">
                      {privacyPolicyContent.medicalInformation.content}
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="text-md md:text-lg lg:text-xl font-semibold mb-2">
                      {privacyPolicyContent.dataSecurity.title}
                    </h2>
                    <p className="text-sm md:text-md mb-4">
                      {privacyPolicyContent.dataSecurity.content}
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="text-md md:text-lg lg:text-xl font-semibold mb-2">
                      {privacyPolicyContent.thirdPartyServices.title}
                    </h2>
                    <p className="text-sm md:text-md mb-4">
                      {privacyPolicyContent.thirdPartyServices.content}
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="text-md md:text-lg lg:text-xl font-semibold mb-2">
                      {privacyPolicyContent.yourChoices.title}
                    </h2>
                    <p className="text-sm md:text-md mb-4">
                      {privacyPolicyContent.yourChoices.content}
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="text-md md:text-lg lg:text-xl font-semibold mb-2">
                      {privacyPolicyContent.legalRequirements.title}
                    </h2>
                    <p className="text-sm md:text-md mb-4">
                      {privacyPolicyContent.legalRequirements.content}
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="text-md md:text-lg lg:text-xl font-semibold mb-2">
                      {privacyPolicyContent.childrenPrivacy.title}
                    </h2>
                    <p className="text-sm md:text-md mb-4">
                      {privacyPolicyContent.childrenPrivacy.content}
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="text-md md:text-lg lg:text-xl font-semibold mb-2">
                      {privacyPolicyContent.changesToThisPolicy.title}
                    </h2>
                    <p className="text-sm md:text-md mb-4">
                      {privacyPolicyContent.changesToThisPolicy.content}
                    </p>
                  </section>

                  <div className="mt-4">
                    <Button
                      type="button"
                      title=""
                      leftIcon={'/close.svg'}
                      bgColor="bg-gray-50"
                      handleClick={closeModal}
                    />
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
