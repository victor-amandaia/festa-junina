import React from 'react';
import { tarotCards } from './data/cards';
import Header from './components/Header';
import CardDeck from './components/CardDeck';
import Background from './components/Background';
import './styles/animations.css';

function App() {
  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden">
      <Background />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <CardDeck cards={tarotCards} />
        </main>
        
        <footer className="py-6 mt-12 border-t border-purple-800/30">
          <div className="container mx-auto px-4 text-center text-purple-300/70 text-sm">
            <p>Trust in the universe and the wisdom of the cards.</p>
            <p className="mt-2">© {new Date().getFullYear()} Mystic Tarot</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;