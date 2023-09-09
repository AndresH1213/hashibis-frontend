import codeOfConduct from '@/i18n/en/code-of-conduct.json';

const Rule = ({
  title,
  content,
  idx,
}: {
  title: string;
  content: string;
  idx: number;
}) => {
  const side = idx % 2 === 0 ? 'right' : 'left';
  const isFlowReverse = idx % 2 === 0 ? '' : 'flex-row-reverse';
  return (
    <div
      className={`mb-8 flex justify-between ${isFlowReverse} items-center w-full ${side}-timeline`}
    >
      <div className="order-1 w-5/12"></div>
      <div className={`order-1 w-5/12 px-1 py-4 text-${side}`}>
        <h4 className="mb-3 font-bold text-lg md:text-2xl">{title}</h4>
        <p className="text-sm md:text-base leading-snug text-black-light text-opacity-100">
          {content}
        </p>
      </div>
    </div>
  );
};

const CodeOfCoduct = () => {
  return (
    <section>
      <div className="bg-light-white text-black py-8">
        <div className="container mx-auto flex flex-col items-start md:flex-row my-12 md:my-24">
          <div className="flex flex-col w-full sticky md:top-36 lg:w-1/3 mt-2 md:mt-12 px-8">
            <p className="ml-2 text-primary-cognac uppercase tracking-loose">
              {codeOfConduct.title}
            </p>
            <p className="text-3xl md:text-4xl leading-normal md:leading-relaxed mb-2">
              {codeOfConduct.header}
            </p>
            <p className="text-sm md:text-base text-black-light mb-4">
              {codeOfConduct.introduction}
            </p>
            <a
              href="#"
              className="bg-transparent mr-auto hover:bg-primary-cognac text-primary-cognac hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-primary-cognac hover:border-transparent"
            >
              {codeOfConduct.linkText}
            </a>
          </div>
          <div className="ml-0 md:ml-12 lg:w-2/3 sticky">
            <div className="container mx-auto w-full h-full">
              <div className="relative wrap overflow-hidden p-10 h-full">
                <div
                  className="border-2-2 border-secondary-cognac absolute h-full border"
                  style={{
                    right: '50%',
                    border: '2px solid #D8AEA',
                    borderRadius: '1%',
                  }}
                ></div>
                <div
                  className="border-2-2 border-secondary-cognac absolute h-full border"
                  style={{
                    right: '50%',
                    border: '2px solid #D8AEA',
                    borderRadius: '1%',
                  }}
                ></div>
                {codeOfConduct.rules.map((rule, idx) => (
                  <Rule
                    key={`${idx}`}
                    idx={idx}
                    title={rule.title}
                    content={rule.content}
                  />
                ))}
              </div>
              <img
                className="mx-auto -mt-36 md:-mt-36"
                src="https://user-images.githubusercontent.com/54521023/116968861-ef21a000-acd2-11eb-95ac-a34b5b490265.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeOfCoduct;
