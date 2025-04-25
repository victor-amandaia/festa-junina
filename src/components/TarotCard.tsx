import React, { useState } from 'react';
import { TarotCard as TarotCardType } from '../types';

interface TarotCardProps {
  card: TarotCardType;
  isSelected: boolean;
  isRevealed: boolean;
  onClick: () => void;
  disabled: boolean;
}

const TarotCard: React.FC<TarotCardProps> = ({ 
  card, 
  isSelected, 
  isRevealed, 
  onClick, 
  disabled 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`
        relative w-48 h-72 perspective-1000 cursor-pointer transition-transform duration-300
        ${isHovered && !disabled ? 'transform scale-105' : ''}
        ${disabled && !isSelected ? 'opacity-60 cursor-not-allowed' : ''}
        ${isSelected ? 'z-10' : 'z-0'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !disabled && onClick()}
    >
      <div 
        className={`
          relative w-full h-full transition-transform duration-1000 transform-style-3d
          ${isRevealed ? 'rotate-y-180' : ''}
        `}
      >
        {/* Card Back */}
        <div 
          className={`
            absolute w-full h-full backface-hidden border-4 border-gold rounded-lg
            flex justify-center items-center overflow-hidden shadow-2xl
            bg-indigo-900 transition-all duration-300
            ${isHovered && !disabled ? 'shadow-glow-gold' : ''}
          `}
        >
          <div className="absolute inset-0 p-2">
            <img 
              src={card.backImage} 
              alt="Card Back" 
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-indigo-900/30 rounded-md" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-3/4 border-2 border-gold/70 rounded-md flex items-center justify-center">
              <div className="text-gold text-2xl font-serif">Tarot</div>
            </div>
          </div>
          <div 
            className={`
              absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent
              p-3 text-center transition-opacity duration-300
              ${isHovered && !disabled ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <p className="text-white text-sm font-serif">Select this card</p>
          </div>
        </div>
        
        {/* Card Front */}
        <div 
          className="
            absolute w-full h-full backface-hidden border-4 border-gold rounded-lg
            transform rotate-y-180 overflow-hidden shadow-2xl
          "
        >
          <img 
            src={card.image} 
            alt={card.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <h3 className="text-white text-center font-serif">{card.name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarotCard;