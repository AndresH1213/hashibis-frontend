import { ProductInterface } from '@/types';
import Categories from '@/components/Categories';
import { getProducts } from '@/services/Product';
import Products from '@/components/Products';

type SearchParams = {
  category?: string;
  cursor?: string;
  page?: string;
};

type fetchProductsProps = {
  category?: string;
};

const fetchProducts = async ({ category }: fetchProductsProps) => {
  const data = await getProducts({ category });
  const { items: products, lastEvaluatedKey } = (await data.json()) as {
    items: ProductInterface[];
    lastEvaluatedKey?: Record<string, any>;
  };
  return { products, lastEvaluatedKey };
};

type Props = {
  searchParams: SearchParams;
};

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

const Page = async ({ searchParams: { category } }: Props) => {
  const { products, lastEvaluatedKey } = await fetchProducts({ category });

  const lek = lastEvaluatedKey?.id?.['S'];
  return (
    <section className="flex-start flex-col paddings mb-8">
      <Categories />
      <Products products={products} lastEvaluatedKey={lek} />
    </section>
  );
};

export default Page;
