import Banner from '@/components/Banner';
import PresentPost from '@/components/PresentPost';
import PresentProduct from '@/components/PresentProduct';

import CultivationI18N from '@/i18n/en/cultivation.json';
import GrowingTechniquesI18N from '@/i18n/en/growingTechniques.json';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

const Home = async () => {
  return (
    <section className="flex-start flex-col paddings mb-8">
      <Banner />

      <div className="w-full mx-auto flexBetween mt-20 pt-8 max-w-6xl  max-h-[375px]">
        <PresentProduct
          image="/product-present-1.jpg"
          title="Explore our products"
          link={{ name: 'Products', path: '/products' }}
        />
        <PresentProduct
          image="/product-present-2.jpg"
          title="Explore the code of Conduct"
          link={{ name: 'Conduct', path: '/company/code-of-conduct' }}
        />
      </div>

      <div className="container flex flex-shrink space-x-3 justify-center align-middle m-auto">
        <PresentPost
          title={CultivationI18N.title}
          intro={CultivationI18N.intro}
          image="/cannabis-plant.jpg"
          link="/growing-techniques"
        />
        <PresentPost
          title={GrowingTechniquesI18N.title}
          intro={GrowingTechniquesI18N.intro}
          image="/practices-grow-cannabis.jpg"
          link="/cultivation"
        />
      </div>
    </section>
  );
};

export default Home;
