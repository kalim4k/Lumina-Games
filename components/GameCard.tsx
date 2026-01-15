import React from 'react';
import { Game } from '../types';
import { Play, Clock, Trophy } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
      <div className="relative h-32 sm:h-40 overflow-hidden">
        <img 
          src={game.image} 
          alt={game.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-indigo-700 shadow-sm">
          {game.difficulty}
        </div>
      </div>
      
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
              {game.category}
            </span>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg mt-0.5">{game.title}</h3>
          </div>
        </div>
        
        <p className="text-slate-500 text-xs sm:text-sm mb-4 line-clamp-2">
          {game.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col sm:flex-row sm:items-center text-xs text-slate-500 font-medium gap-1 sm:gap-3">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              {game.durationSec}s
            </div>
            <div className="flex items-center text-emerald-600 font-bold">
              <Trophy size={14} className="mr-1" />
              {game.reward} FCFA
            </div>
          </div>
          
          <button 
            onClick={() => onPlay(game)}
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"
          >
            <Play size={16} className="sm:w-[18px] sm:h-[18px]" fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};