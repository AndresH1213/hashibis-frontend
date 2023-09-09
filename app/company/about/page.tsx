import Image from 'next/image';
import Link from 'next/link';
import AboutContent from '@/i18n/en/about.json';

const About = () => {
  return (
    <section className="relative flex flexCenter h-auto p-20 mx-auto w-full overflow-hidden items-center bg-white">
      <div className="container">
        <div className="flex flex-row flex-nowrap shortcode-row space-between items-center">
          <div className="shortcode-col col flex-none w-1/2">
            <h1 className="comp-pre-title text-xs uppercase tracking-wider">
              {AboutContent.title}
            </h1>
            <h2 className="comp-title text-3xl font-bold mb-4">
              {AboutContent.header[0]}{' '}
              <span className="text-green-500">{AboutContent.header[1]}</span>
              {AboutContent.header[2]}
            </h2>
            <p className="shortcode-p comp-p text-gray-700">
              {AboutContent.content}
            </p>
            <Link
              className="inline-block px-6 py-3 mt-4 bg-primary-cognac text-white rounded hover:bg-light-white-500"
              href="/signup"
              rel="noopener noreferrer"
            >
              {AboutContent.buttonText}
            </Link>
          </div>
          <div className="shortcode-col col flex-none w-1/2">
            <div className="comp-resp-img wrapper shortcode-resp-image relative max-w-xs mx-auto">
              <Image
                src="/about_image.png"
                alt="About Us Image"
                width={400}
                height={400}
                className="comp-resp-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
