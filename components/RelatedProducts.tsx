import Link from 'next/link';

import { ProductInterface, UserProfile } from '@/types';
import Image from 'next/image';
import { getProducts } from '@/services/Product';

const RelatedProducts = async () => {
  const resp = await getProducts({ limit: 3 });
  const { items: relatedProducts } = await resp.json();

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <Link href={`/`} className="text-primary-purple text-base">
          View All
        </Link>
      </div>

      <div className="related_products-grid">
        {relatedProducts?.map((prod: ProductInterface) => (
          <div className="flexCenter related_product-card drop-shadow-card">
            <Link
              href={`/product/${prod.id}`}
              className="flexCenter group relative w-full h-full"
            >
              <Image
                src={prod.images[0]}
                width={414}
                height={314}
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
