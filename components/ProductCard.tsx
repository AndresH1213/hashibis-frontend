'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  id: string;
  name: string;
  image: string;
  category: string;
  price: string | number;
};

const tagsColor = ['gray', 'red', 'green'];

const ProductCard = ({ id, image, name, category, price }: Props) => {
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState('');

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 10000));
    setRandomViews(
      String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + 'k')
    );
  }, []);

  return (
    <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
      <Link
        href={`/product/${id}`}
        className={`flexCenter} group relative w-full h-full`}
      >
        <Image
          src={image}
          width={414}
          height={314}
          className="w-full h-full object-cover rounded-2xl"
          alt="product image"
        />

        <div className="hidden group-hover:flex profile_card-title">
          <p>{name}</p>
          <span className="min-w-fit text-sm">
            ~$US {Number(price).toLocaleString('en-US')}
          </span>
        </div>
      </Link>

      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/produts?category=${category}`}>
          <div className="flexCenter gap-2">
            <Image
              src="/category.svg"
              width={21}
              height={21}
              className="rounded-full"
              alt="profile image"
            />
            <p>{category}</p>
          </div>
        </Link>

        <div className="flexCenter gap-2">
          <div className="flexCenter gap-2">
            <Image src="/hearth.svg" width={13} height={12} alt="heart" />
            <p className="text-sm">{randomLikes}</p>
          </div>
          <div className="flexCenter gap-2">
            <Image src="/eye.svg" width={12} height={9} alt="eye" />
            <p className="text-sm">{randomViews}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
