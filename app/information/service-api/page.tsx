import { getApiDocs } from '@/lib/swagger';
import ReactSwagger from './swaggerComponent';

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="flexCenter">
      <ReactSwagger spec={spec} />
    </section>
  );
}
