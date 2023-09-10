import Link from 'next/link';

import { ProductInterface } from '@/types';
import Image from 'next/image';
import { getProducts } from '@/services/Product';

const getRandomProducts = (prodsToSelect: ProductInterface[], num: number) => {
  const prods = [...prodsToSelect];
  const selectedElements = [];
  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * prods.length);
    selectedElements.push(prods[randomIndex]);
    prods.splice(randomIndex, 1);
  }
  return selectedElements;
};

const RelatedProducts = async () => {
  const resp = await getProducts({ limit: 6 });
  const { items } = await resp.json();
  const relatedProducts = getRandomProducts(items, 3);

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <Link href={`/`} className="text-primary-purple text-base">
          View All
        </Link>
      </div>

      <div className="related_products-grid mx-auto">
        {relatedProducts?.map((prod: ProductInterface) => (
          <div className="flexCenter related_product-card drop-shadow-card">
            <Link
              href={`/product/${prod.id}`}
              className="flexCenter group relative w-full h-full"
            >
              <Image
                src={prod.images[0]}
                width={300}
                height={350}
                className="w-full h-full object-cover rounded-2xl"
                alt="product image"
              />

              <div className="hidden group-hover:flex related_product-card_title">
                <p className="w-full">{prod?.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
