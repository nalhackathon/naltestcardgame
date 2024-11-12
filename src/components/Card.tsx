import React from 'react';

interface CardProps {
  content: string;
  isFlipped: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ content, isFlipped, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`aspect-square cursor-pointer perspective-1000 ${isFlipped ? 'rotate-y-180' : ''}`}
    >
      <div className="relative w-full h-full transition-transform duration-500 transform-style-3d">
        <div
          className={`absolute w-full h-full flex items-center justify-center text-4xl 
            ${isFlipped ? 'rotate-y-180 opacity-0' : 'opacity-100'}
            bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl shadow-lg
            transition-all duration-500 hover:shadow-xl`}
        >
          ?
        </div>
        <div
          className={`absolute w-full h-full flex items-center justify-center text-4xl
            ${isFlipped ? 'opacity-100' : 'rotate-y-180 opacity-0'}
            bg-white rounded-xl shadow-lg
            transition-all duration-500`}
        >
          {content}
        </div>
      </div>
    </div>
  );
}

export default Card;