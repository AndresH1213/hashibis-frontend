import React from 'react';
import Image from 'next/image';
import testimonialsI8n from '@/i18n/en/testimonials.json';

type testimonialPropsCard = {
  imagePath: string;
  name: string;
  quote: string;
};

const TestimonialCard = ({ imagePath, name, quote }: testimonialPropsCard) => {
  return (
    <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
      <div className="w-full flex mb-4 items-center">
        <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
          <Image src={imagePath} width={40} height={40} alt={name + 'image'} />
        </div>
        <div className="flex-grow pl-3">
          <h6 className="font-bold text-sm uppercase text-gray-600">{name}</h6>
        </div>
      </div>
      <div className="w-full">
        <p className="text-sm leading-tight">
          <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
            "
          </span>
          {quote}
          <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
            "
          </span>
        </p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center py-5">
      <div className="w-full bg-white px-5 text-gray-800">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-6xl md:text-5xl font-bold mb-5 text-gray-600">
              {testimonialsI8n.title1} <br /> {testimonialsI8n.title2}
            </h1>
            <h3 className="text-lg mb-5 font-light">
              {testimonialsI8n.introduction}
            </h3>
            <div className="text-center mb-8">
              <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
              <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
              <span className="inline-block w-40 h-1 rounded-full bg-indigo-500"></span>
              <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
              <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
            </div>
          </div>
          <div className="-mx-3 md:flex items-start">
            <div className="px-3 md:w-1/3">
              <TestimonialCard
                imagePath={testimonialsI8n.testimonials[0].image}
                name={testimonialsI8n.testimonials[0].name}
                quote={testimonialsI8n.testimonials[0].quote}
              />
              <TestimonialCard
                imagePath={testimonialsI8n.testimonials[1].image}
                name={testimonialsI8n.testimonials[1].name}
                quote={testimonialsI8n.testimonials[1].quote}
              />
            </div>
            <div className="px-3 md:w-1/3">
              <TestimonialCard
                imagePath={testimonialsI8n.testimonials[2].image}
                name={testimonialsI8n.testimonials[2].name}
                quote={testimonialsI8n.testimonials[2].quote}
              />
              <TestimonialCard
                imagePath={testimonialsI8n.testimonials[3].image}
                name={testimonialsI8n.testimonials[3].name}
                quote={testimonialsI8n.testimonials[3].quote}
              />
            </div>
            <div className="px-3 md:w-1/3">
              <TestimonialCard
                imagePath={testimonialsI8n.testimonials[4].image}
                name={testimonialsI8n.testimonials[4].name}
                quote={testimonialsI8n.testimonials[4].quote}
              />
              <TestimonialCard
                imagePath={testimonialsI8n.testimonials[5].image}
                name={testimonialsI8n.testimonials[5].name}
                quote={testimonialsI8n.testimonials[5].quote}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
