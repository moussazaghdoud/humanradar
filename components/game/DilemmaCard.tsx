'use client';

import type { Dilemma } from '@/types';

interface DilemmaCardProps {
  dilemma: Dilemma;
  onPredict: (option: 'a' | 'b') => void;
  disabled?: boolean;
}

export default function DilemmaCard({ dilemma, onPredict, disabled }: DilemmaCardProps) {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-6 animate-fade-in">
      <div className="text-xs font-medium uppercase tracking-widest text-violet-400">
        {dilemma.category}
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-white text-center leading-snug px-2">
        {dilemma.question}
      </h2>

      <p className="text-sm text-white/50">What will the majority choose?</p>

      <div className="w-full flex flex-col gap-3 mt-2">
        <button
          onClick={() => onPredict('a')}
          disabled={disabled}
          className="w-full py-5 px-6 rounded-2xl text-lg font-semibold text-white
            bg-gradient-to-r from-violet-600/80 to-indigo-600/80 border border-violet-400/30
            hover:from-violet-500 hover:to-indigo-500 hover:border-violet-400/50 hover:shadow-lg hover:shadow-violet-500/20
            active:scale-[0.97] transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {dilemma.option_a}
        </button>

        <button
          onClick={() => onPredict('b')}
          disabled={disabled}
          className="w-full py-5 px-6 rounded-2xl text-lg font-semibold text-white
            bg-gradient-to-r from-cyan-600/80 to-blue-600/80 border border-cyan-400/30
            hover:from-cyan-500 hover:to-blue-500 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20
            active:scale-[0.97] transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {dilemma.option_b}
        </button>
      </div>
    </div>
  );
}
