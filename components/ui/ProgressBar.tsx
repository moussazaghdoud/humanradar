'use client';

import { useEffect, useState } from 'react';

interface ProgressBarProps {
  percent: number;
  color?: 'violet' | 'green' | 'red';
  label?: string;
  animate?: boolean;
}

const colorClasses = {
  violet: 'bg-gradient-to-r from-violet-500 to-indigo-500',
  green: 'bg-gradient-to-r from-emerald-500 to-green-400',
  red: 'bg-gradient-to-r from-red-500 to-rose-400',
};

export default function ProgressBar({ percent, color = 'violet', label, animate = true }: ProgressBarProps) {
  const [width, setWidth] = useState(animate ? 0 : percent);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setWidth(percent), 50);
      return () => clearTimeout(timer);
    }
    setWidth(percent);
  }, [percent, animate]);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm text-white/70">{label}</span>
          <span className="text-sm font-semibold text-white">{percent}%</span>
        </div>
      )}
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${colorClasses[color]}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
