import React from 'react';

interface AboutCardProps {
  title: string;
  imageUrl: string;
  children: React.ReactNode;
}

export const AboutCard: React.FC<AboutCardProps> = ({ title, imageUrl, children }) => {
  return (
    <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6 py-8 bg-white rounded-xl">
      <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
        <div className="md:w-6/12 lg:w-3/12 flex justify-center">
          <img className="rounded-lg max-h-36 object-contain" src={imageUrl} alt={title} loading="lazy" />
        </div>
        <div className="md:w-6/12 lg:w-9/12">
          <h2 className="text-center md:text-left text-2xl text-gray-900 font-bold md:text-4xl">{title}</h2>
          <div className="mt-6 text-gray-600 space-y-3 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
