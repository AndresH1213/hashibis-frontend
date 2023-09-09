'use client';

import { getImageData, tranformImageFileToDataSync } from '@/lib/utils';
import { UserProfile } from '@/types';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import ModalImageProfile from './ModalImageProfile';
import { uploadProfileImage } from '@/services/PersonalInformation';
import { useRouter } from 'next/navigation';

type Props = {
  user: UserProfile;
  token?: string;
};

const ProfilePage = ({ user, token }: Props) => {
  const router = useRouter();

  const [profileImage, setProfileImage] = useState<File>();
  const [profileImgData, setProfileImgData] = useState<string | ArrayBuffer>();
  let [isOpen, setIsOpen] = useState(false);

  const uploadImage = async () => {
    if (!token) return;
    const imageUrl = await uploadProfileImage(profileImage!, token);
    const resp = await fetch('/api/personal-information/upload-image', {
      method: 'POST',
      body: JSON.stringify({ imageUrl }),
    });
    if (resp.status === 200) {
      router.refresh();
    }
    setIsOpen(false);
    setProfileImgData('');
    setProfileImage(undefined);
  };

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files?.length) return;

    const imgFile = e.target.files[0];
    if (!imgFile.type.includes('image')) return;
    setProfileImage(imgFile);
    const imgData = await getImageData(imgFile);
    setProfileImgData(imgData);
    setIsOpen(true);
  };

  return (
    <section className="flexCenter max-w-7xl mx-auto paddings">
      <div className="flexCenter flex-col w-full">
        <label
          htmlFor="image-profile"
          className="flex flex-col hover:opacity-70 relative items-center justify-center w-fit border-gray cursor-pointer"
        >
          <Image
            src={user?.picture || '/user-default.png'}
            width={150}
            height={150}
            className="rounded-full"
            alt="user image"
          />
          <Image
            width={20}
            height={20}
            alt="edit logo"
            className="absolute bottom-1 right-4"
            src="/edit.svg"
          />
          <input
            id="image-profile"
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
            className="hidden"
            multiple
          />
        </label>
        <ModalImageProfile
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          imgData={(profileImgData as string) || ''}
          uploadData={uploadImage}
        />
        <p className="text-xl text-center font-bold mt-10">{user?.name} 👋</p>
        <p className="text-xl text-center font-bold mt-10">{user.email}</p>
      </div>
    </section>
  );
};

export default ProfilePage;
