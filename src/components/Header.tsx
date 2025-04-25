import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 md:py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="text-gold h-6 w-6" />
            <h1 className="text-3xl md:text-4xl font-serif text-white">Mystic Tarot</h1>
            <Sparkles className="text-gold h-6 w-6" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;