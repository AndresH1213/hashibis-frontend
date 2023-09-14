'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { bannerContent } from '@/constants';

const Banner = () => {
  return (
    <Carousel
      infiniteLoop
      swipeable
      autoPlay
      stopOnHover={false}
      showArrows={false}
      showStatus={false}
      interval={4000}
    >
      {bannerContent.map((banner, idx) => {
        return (
          <div key={idx} className="w-full md:flex md:h-[500px] bg-light-white">
            <div className="w-full md:w-1/3 h-72 md:h-full relative animate__animated animate__fadeIn">
              <Image src={banner.image} fill alt="banner image" />
            </div>
            <div className="w-full md:w-2/3 h-64 md:h-full flex flex-col justify-center align-middle">
              <h1 className="text-3xl lg:text-7xl md:text-5xl max-w-2xl mx-auto animate__animated animate__fadeInUp">
                {banner.title}
              </h1>
              <p className="text-lg max-w-2xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
                {banner.content}
              </p>
              <Link
                className="cursor-pointer z-10 max-w-xs px-6 py-3 mt-8 mx-auto bg-primary-cognac text-white rounded hover:bg-light-white-500 animate__animated animate__fadeInUp animate__delay-1s"
                href="/products"
              >
                Discover more
              </Link>
              <hr className="w-60 h-1 mx-auto my-4 bg-green-100 border-0 rounded md:my-10"></hr>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Banner;
