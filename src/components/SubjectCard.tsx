import React from 'react';
import { Link } from 'react-router-dom';
import { FrequencyBar } from './FrequencyBar';

interface SubjectCardProps {
  title: string;
  imageUrl: string;
  obiFrequency: number;
  icpcFrequency: number;
  linkUrl: string;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  title,
  imageUrl,
  obiFrequency,
  icpcFrequency,
  linkUrl,
}) => {
  return (
    <Link to={linkUrl} className="block transition-transform hover:-translate-y-1">
      <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col justify-between">
        <div className="w-full flex justify-center bg-sky-900 rounded-t-lg p-6">
          <img className="h-20 w-auto object-contain" src={imageUrl} alt={title} />
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <h5 className="mb-4 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <div className="space-y-4">
            <FrequencyBar title="Frequência na OBI" frequency={obiFrequency} />
            <FrequencyBar title="Frequência na Maratona" frequency={icpcFrequency} />
          </div>
        </div>
      </div>
    </Link>
  );
};
