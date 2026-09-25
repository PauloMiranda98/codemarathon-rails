import React from 'react';

export const Footer: React.FC = () => {
  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return (
    <footer className="bg-gray-100 mt-auto border-t border-slate-900/5 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <img
          className="mx-auto h-12 w-auto text-slate-900"
          src={`${baseUrl}logo_code_marathon.png`}
          alt="Logo do Code Marathon"
        />
        <p className="mt-5 text-center text-sm leading-6 text-slate-700">
          Code Marathon ©2022 - {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
