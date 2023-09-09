import { getCurrentUser } from '@/lib/session';
import { UserProfile } from '@/types';
import React from 'react';
import Image from 'next/image';

const page = async () => {
  const { user } = await getCurrentUser();

  const userProfile = {
    id: user.id,
    email: user.email,
    name: user.name,
    picture: user.picture,
    liked_products: [],
  } as UserProfile;

  return (
    <>
      {userProfile?.liked_products?.length ? (
        userProfile.liked_products.map((prod) => {
          return (
            <Image
              id={prod.id}
              src={prod.images[0]}
              alt="Product image"
              width={739}
              height={554}
              className="rounded-xl object-contain"
            />
          );
        })
      ) : (
        <p className="relative max-w-lg m-auto bg-light-white-300 opacity-50 text-black-100 font-bold text-xl py-4 px-8 rounded-xl shadow-lg">
          You don't have favorite products 😕
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full h-8 w-8 flex items-center justify-center text-black font-semibold text-lg shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-5a1 1 0 11-2 0 1 1 0 012 0zM9 7a1 1 0 012 0v4a1 1 0 11-2 0V7z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </p>
      )}
    </>
  );
};

export default page;
