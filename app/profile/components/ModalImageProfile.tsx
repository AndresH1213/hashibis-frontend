'use client';

import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import ButtonSave from './ButtonSave';

type Props = {
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  imgData: string;
  uploadData: () => Promise<void>;
};

const ModalImageProfile = ({
  isOpen,
  setIsOpen,
  imgData,
  uploadData,
}: Props) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
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
              <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                <Image
                  src={imgData}
                  className="z-10 p-0 rounded-3xl m-auto"
                  alt="image profile uploaded"
                  height={180}
                  width={180}
                />
                <ButtonSave handleSubmit={uploadData} text="Upload Image" />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalImageProfile;
