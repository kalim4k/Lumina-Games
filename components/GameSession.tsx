import React, { useState, useEffect } from 'react';
import { Game } from '../types';
import { X, Trophy, Loader2 } from 'lucide-react';

interface GameSessionProps {
  game: Game | null;
  onClose: () => void;
  onComplete: (amount: number) => void;
}

export const GameSession: React.FC<GameSessionProps> = ({ game, onClose, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!game) return;

    // Reset state
    setProgress(0);
    setIsCompleted(false);

    // Simulate game duration
    const intervalTime = 100;
    const steps = (game.durationSec * 1000) / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsCompleted(true);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [game]);

  const handleCollect = () => {
    if (game) {
      onComplete(game.reward);
    }
  };

  if (!game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative animate-scale-in">
        {/* Close button */}
        {!isCompleted && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 z-10"
          >
            <X size={24} />
          </button>
        )}

        {/* Game Content */}
        <div className="text-center p-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
            <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{game.title}</h2>
          
          {!isCompleted ? (
            <div className="space-y-6">
              <p className="text-slate-500">Jeu en cours... Maximisez votre score !</p>
              
              <div className="relative w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="flex justify-center">
                 <Loader2 className="animate-spin text-indigo-500" size={32} />
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-center text-yellow-400 mb-2">
                <Trophy size={48} />
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 font-medium">Félicitations !</p>
                <p className="text-3xl font-bold text-slate-900">+{game.reward} FCFA</p>
              </div>
              
              <button 
                onClick={handleCollect}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Réclamer mes gains
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};