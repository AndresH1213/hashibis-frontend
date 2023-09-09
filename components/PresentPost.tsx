import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  title: string;
  intro: string;
  image: string;
  link: string;
};

const PresentPost = ({ title, intro, image, link }: Props) => {
  return (
    <div className="mt-20">
      <div className="max-w-lg mx-auto">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
          <Image
            className="rounded-lg mx-auto p-1"
            src={image}
            alt={title + 'image'}
            height={400}
            width={350}
          />

          <div className="p-5">
            <a href="#">
              <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
                {title}
              </h5>
            </a>
            <p className="font-normal text-gray-700 mb-3">{intro}</p>
            <Link
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
              href={link}
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentPost;
