import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8 flex-1 flex items-center justify-center">
      <div className="px-6 py-16 sm:px-0 text-center">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Code Marathon
        </h1>
        <p className="text-center mb-8 text-base font-normal text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Seja bem-vind@! O Code Marathon é um sistema onde pessoas interessadas 
          por Maratona de Programação e Olimpíada Brasileira de Informática podem 
          aprender os conteúdos recorrentes nessas competições.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/conteudos"
            className="inline-flex justify-center items-center py-3.5 px-6 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 shadow-md transition-all"
          >
            Quero Aprender
            <svg
              className="ml-2 -mr-1 w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              ></path>
            </svg>
          </Link>
          <a
            href="https://github.com/PauloMiranda98/codemarathon-rails"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center py-3.5 px-6 text-base font-medium text-center text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700 shadow-md transition-all"
          >
            Quero Contribuir
            <svg
              className="ml-2 -mr-1 w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
