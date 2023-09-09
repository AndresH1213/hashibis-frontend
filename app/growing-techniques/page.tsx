import Image from 'next/image';
import growingTechniquesList from '@/i18n/en/growingTechniques.json';

const growingTechniques = () => {
  return (
    <div className="flex flex-col">
      <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative h-[24em]">
        <div
          className="absolute left-0 bottom-0 w-full h-full z-10"
          style={{
            backgroundImage:
              'linear-gradient(180deg,transparent,rgba(0,0,0,.7))',
          }}
        ></div>
        <Image
          src="/cannabis-plant.jpg"
          alt="Green House cultivation system"
          layout="fill"
          className="absolute left-0 top-0 w-full h-full z-0 object-cover"
        />
        <div className="p-4 absolute bottom-0 left-0 z-20">
          <a
            href="#"
            className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2"
          >
            {growingTechniquesList.topic}
          </a>
          <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
            {growingTechniquesList.title}
          </h2>
        </div>
      </div>

      <div className="px-4 lg:px-0 my-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
        {growingTechniquesList.content.map((technique) => {
          return (
            <>
              <h5 className="text-lg font-semibold mb-2">{technique.title}</h5>
              <p className="font-normal mb-4">{technique.content}</p>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default growingTechniques;
