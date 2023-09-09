import React from 'react';
import cultivationI18N from '@/i18n/en/cultivation.json';

const Cultivation = () => {
  return (
    <div>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 not-format">
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {cultivationI18N.title}
              </h1>
            </header>
            <p className="font-normal mb-4 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
              {cultivationI18N.paragraph[0]}
            </p>
            <figure className="mb-5">
              <img
                className="rounded-lg"
                src="/practices-grow-cannabis.jpg"
                alt=""
              />
              <figcaption>Digital art by Anonymous</figcaption>
            </figure>
            {cultivationI18N.paragraph.slice(1).map((p, idx) => {
              return (
                <p key={idx} className="my-2">
                  {p}
                </p>
              );
            })}

            <h2 className="font-semibold my-8 text-lg">
              {cultivationI18N.tropicalClime.title}
            </h2>
            <ul className="max-w-xl pl-5 mt-2 space-y-3 list-disc list-inside">
              {cultivationI18N.tropicalClime.list.map((p, idx) => {
                return (
                  <li key={idx} className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-3.5 h-3.5 text-green-950 dark:text-green-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                    <span>{p}</span>
                  </li>
                );
              })}
            </ul>
          </article>
        </div>
      </main>
    </div>
  );
};

export default Cultivation;
