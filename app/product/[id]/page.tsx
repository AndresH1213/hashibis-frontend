import Image from 'next/image';
import Link from 'next/link';

import Modal from '@/components/common/Modal';
import RelatedProducts from '@/components/RelatedProducts';
import { ProductInterface } from '@/types';
import { getProductById } from '@/services/Product';

const tagsColor = ['green', 'purple', 'red', 'yellow', 'gray'];

const Product = async ({ params: { id } }: { params: { id: string } }) => {
  const response = await getProductById(id);
  const { item: product } = (await response.json()) as {
    item: ProductInterface;
  };
  if (!product) {
    return <p className="no-result-text">Failed to fetch product info</p>;
  }

  return (
    <Modal>
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
          <div className="flexBetween w-full">
            <div className="flex-1 flexStart flex-col gap-1">
              <p className="self-start text-lg font-semibold">{product.name}</p>
              <div className="product-info">
                <Image src="/dot.svg" width={4} height={4} alt="dot" />
                <Link
                  href={`/products?category=${product.category}`}
                  className="text-primary-purple font-semibold"
                >
                  {product.category}
                </Link>
              </div>
            </div>
            <div className="flex">
              {product.tags.map((tag, idx) => {
                return (
                  <div
                    key={idx}
                    className={`bg-${tagsColor[idx]}-100 text-${tagsColor[idx]}-800 text-xs font-medium mr-2 px-3 py-1 rounded hover:opacity-60`}
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 relative">
        <p className="absolute font-mono left-3 z-10 top-3 text-gray-50 text-2xl">
          ~${Number(product.price).toLocaleString('en-US')}
        </p>
        {product.measureUnitConcentration && (
          <p className="absolute font-mono right-4 z-10 -bottom-5 text-black-light text-sm">
            <span className="font-semibold">concentration:</span>{' '}
            {product.concentration} ({product.measureUnitConcentration})
          </p>
        )}
        <Image
          src={`${product.images[0]}`}
          className="object-cover rounded-2xl hover:opacity-90"
          width={800}
          height={598}
          alt="poster"
        />
      </section>

      <section className="flexCenter flex-col mt-10">
        <p className="max-w-5xl text-xl font-normal">
          <span className="text-base font-bold underline-offset-4 underline">
            Description
          </span>{' '}
          <br />
          {product.description}
        </p>
      </section>

      <section className="flexBetween w-full mt-10 shadow p-4 justify-start">
        <ul className="space-y-4 text-left text-black-light">
          {product.benefits?.map((benefit, idx) => (
            <li key={idx} className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-green-400 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        {product.recommendation && (
          <p>
            <span className="text-black-light font-bold">Recommendation: </span>
            {product.recommendation}
          </p>
        )}
      </section>

      <section className="flexCenter w-full gap-8 mt-12">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Link
          href={`/products?category=${product.category}`}
          className="min-w-[82px] h-[82px] grid items-center"
        >
          <Image
            src="/category.svg"
            className="rounded-full"
            width={82}
            height={82}
            alt="category logo"
          />
          <span className="text-center">{product.category}</span>
        </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>

      <RelatedProducts />
    </Modal>
  );
};

export default Product;
