import React, { useState } from 'react';

interface FrequencyBarProps {
  title: string;
  frequency: number;
}

export const FrequencyBar: React.FC<FrequencyBarProps> = ({ title, frequency }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getTooltipText = (freq: number) => {
    switch (freq) {
      case 1:
        return 'Raramente aparece nessa competição';
      case 2:
        return 'Não aparece com frequência nessa competição';
      case 3:
        return 'Aparece com frequência nessa competição';
      case 4:
        return 'Quase sempre aparece nessa competição';
      default:
        return 'Não aparece nessa competição';
    }
  };

  const renderBars = (freq: number) => {
    switch (freq) {
      case 1:
        return (
          <>
            <div className="h-1 bg-red-400 rounded-sm"></div>
            <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
            <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
            <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
          </>
        );
      case 2:
        return (
          <>
            <div className="h-1 bg-orange-400 rounded-sm"></div>
            <div className="h-1 bg-orange-400 rounded-sm"></div>
            <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
            <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
          </>
        );
      case 3:
        return (
          <>
            <div className="h-1 bg-lime-400 rounded-sm"></div>
            <div className="h-1 bg-lime-400 rounded-sm"></div>
            <div className="h-1 bg-lime-400 rounded-sm"></div>
            <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
          </>
        );
      case 4:
        return (
          <>
            <div className="h-1 bg-green-500 rounded-sm"></div>
            <div className="h-1 bg-green-500 rounded-sm"></div>
            <div className="h-1 bg-green-500 rounded-sm"></div>
            <div className="h-1 bg-green-500 rounded-sm"></div>
          </>
        );
      default:
        return (
          <>
            <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
            <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
            <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
            <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
          </>
        );
    }
  };

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <h3 className="mb-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <div className="grid grid-cols-4 gap-2">
        {renderBars(frequency)}
      </div>

      {showTooltip && (
        <div className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap dark:bg-gray-700">
          {getTooltipText(frequency)}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
        </div>
      )}
    </div>
  );
};
