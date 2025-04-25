import React, { useEffect, useState, useRef } from 'react';
import { X, Quote } from 'lucide-react';
import { MotivationalPhrase } from '../types';

interface RevealModalProps {
  phrase: MotivationalPhrase | null;
  isOpen: boolean;
  onClose: () => void;
}

const RevealModal: React.FC<RevealModalProps> = ({ phrase, isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure animation plays after modal is positioned
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Play audio when modal becomes visible
        if (phrase && audioRef.current) {
          audioRef.current.play().catch(error => {
            console.log('Audio playback failed:', error);
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      // Stop audio when modal closes
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isOpen, phrase]);

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div 
        className={`
          relative bg-gradient-to-br from-indigo-900 to-purple-800
          rounded-xl p-8 max-w-md w-full shadow-2xl border border-purple-500/30
          transition-all duration-500 transform
          ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
        <button 
          className="absolute top-2 right-2 text-white/80 hover:text-white"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        
        <div className="flex flex-col items-center text-center space-y-5">
          <div className="w-16 h-16 bg-purple-600/30 rounded-full flex items-center justify-center">
            <Quote size={32} className="text-gold" />
          </div>
          
          {phrase && (
            <>
              <h3 className="text-lg md:text-2xl font-serif text-white leading-relaxed">
                "{phrase.phrase}"
              </h3>
              
              <p className="text-gold/90 italic">— {phrase.author}</p>
              
              <audio ref={audioRef} src={phrase.audioUrl} />
              
              <div className="pt-4 w-full border-t border-purple-500/30 mt-2">
                <p className="text-white/70 text-sm">
                  Reflita sobre esta mensagem e deixe que ela guie seu caminho.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevealModal;