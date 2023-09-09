import Link from 'next/link';
import React from 'react';

type Props = {
  title: string;
  image: string;
  link: { path: string; name: string };
};

const PresentProduct = ({ title, image, link }: Props) => {
  return (
    <div className="relative">
      <div className="overflow-hidden w-full">
        <img
          className="hover:scale-125  w-[550px] h-[290px] transition-all ease-out duration-[400ms]"
          src={image}
          alt={title + 'image'}
        />
      </div>
      <div className="absolute top-10 left-7">
        <h4 className="text-xl font-semibold mb-3">{title}</h4>
        <Link
          href={link.path}
          className=" w-3/4 flexCenter p-0.5 m-auto py-2 text-sm font-medium rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 opacity-90"
        >
          View {link.name}
        </Link>
      </div>
    </div>
  );
};

export default PresentProduct;
