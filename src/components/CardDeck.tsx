import React, { useState, useEffect } from 'react';
import TarotCard from './TarotCard';
import RevealModal from './RevealModal';
import { TarotCard as TarotCardType, MotivationalPhrase } from '../types';
import { getRandomPhrase } from '../data/phrases';

interface CardDeckProps {
  cards: TarotCardType[];
}

const CardDeck: React.FC<CardDeckProps> = ({ cards }) => {
  const [selectedCard, setSelectedCard] = useState<TarotCardType | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState<MotivationalPhrase | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  
  // Handle card selection
  const handleCardSelect = (card: TarotCardType) => {
    if (isLocked || selectedCard !== null) return;
    
    setSelectedCard(card);
    setCurrentPhrase(getRandomPhrase());
    setIsLocked(true);
    
    // Animate card reveal after a short delay
    setTimeout(() => {
      setIsRevealed(true);
      
      // Show modal after card flip animation completes
      setTimeout(() => {
        setShowModal(true);
      }, 1000);
    }, 500);
  };
  
  // Reset the reading
  const resetReading = () => {
    setShowModal(false);
    
    // Wait for modal to close before resetting the cards
    setTimeout(() => {
      setIsRevealed(false);
      
      // Wait for card to flip back before allowing new selection
      setTimeout(() => {
        setSelectedCard(null);
        setCurrentPhrase(null);
        setIsLocked(false);
      }, 1000);
    }, 300);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-4xl font-serif text-white mb-4">Escolha uma Carta</h2>
        <p className="text-purple-200/80 max-w-2xl mx-auto">
          Concentre-se em sua pergunta ou intenção ao selecionar uma carta. 
          O universo irá guiá-lo para a mensagem que você precisa ouvir.
        </p>
      </div>
      
      <div className="relative flex flex-wrap justify-center gap-6 md:gap-10 py-6">
        {cards.map((card) => (
          <TarotCard
            key={card.id}
            card={card}
            isSelected={selectedCard?.id === card.id}
            isRevealed={isRevealed && selectedCard?.id === card.id}
            onClick={() => handleCardSelect(card)}
            disabled={isLocked || selectedCard !== null}
          />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        {selectedCard ? (
          <button
            className="px-6 py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-full 
                      font-medium transition-all shadow-lg hover:shadow-purple-500/30"
            onClick={resetReading}
          >
            Fazer leitura novamente
          </button>
        ) : (
          <p className="text-purple-300/80 italic font-serif">
            Confie em sua intuição e selecione a carta que chama por você...
          </p>
        )}
      </div>
      
      <RevealModal
        phrase={currentPhrase}
        isOpen={showModal}
        onClose={resetReading}
      />
    </div>
  );
};

export default CardDeck;