import React from 'react';
import { AboutCard } from '../components/AboutCard';

export const About: React.FC = () => {
  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col justify-center relative overflow-hidden lg:py-12">
      <div className="relative w-full px-6 py-12 bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 md:max-w-3xl md:mx-auto lg:max-w-4xl rounded-lg space-y-12">
        <AboutCard title="Code Marathon" imageUrl={`${baseUrl}about/logo_code_marathon.png`}>
          <p>
            O Code Marathon é um sistema onde pessoas interessadas por 
            Maratona de Programação e Olimpíada Brasileira de Informática 
            podem aprender os conteúdos recorrentes nessas competições.
          </p>
          <p>
            Você pode contribuir com conteúdos e questões pelo GitHub. 
            Para isso, acesse o repositório do projeto:
          </p>
          <div className="mt-4 text-center md:text-left">
            <a
              href="https://github.com/PauloMiranda98/codemarathon-rails"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-6 py-2.5 shadow-sm transition-all"
            >
              Repositório no GitHub
            </a>
          </div>
        </AboutCard>

        <hr className="border-gray-100" />

        <AboutCard title="OBI" imageUrl={`${baseUrl}about/logo_obi.png`}>
          <p>
            A OBI é uma competição organizada nos moldes das outras 
            olimpíadas científicas brasileiras, como Matemática, Física e 
            Astronomia. O objetivo da OBI é despertar nos alunos o interesse 
            por uma ciência importante na formação básica hoje em dia 
            (no caso, ciência da computação), através de uma atividade que 
            envolve desafio, engenhosidade e uma saudável dose de competição. 
            A organização da OBI está a cargo do Instituto de Computação da 
            UNICAMP.
          </p>
        </AboutCard>

        <hr className="border-gray-100" />

        <AboutCard title="Maratona de Programação" imageUrl={`${baseUrl}about/logo_maratona.png`}>
          <p>
            A Maratona de Programação é um evento da Sociedade Brasileira 
            de Computação que existe desde o ano de 1996. A Maratona nasceu 
            das competições regionais classificatórias para as finais 
            mundiais do concurso de programação, o International Collegiate 
            Programming Contest, e é parte da regional sulamericana do 
            concurso. Ela se destina a alunos e alunas de cursos de graduação 
            e início de pós-graduação na área de Computação e afins (Ciência 
            da Computação, Engenharia de Computação, Sistemas de Informação, 
            Matemática, etc). A competição promove nos estudantes a 
            criatividade, a capacidade de trabalho em equipe, a busca de 
            novas soluções de software e a habilidade de resolver problemas 
            sob pressão. De ano para ano temos observado que as instituições 
            e principalmente as grandes empresas da área têm valorizado os 
            alunos que participam da Maratona.
          </p>
        </AboutCard>
      </div>
    </div>
  );
};
