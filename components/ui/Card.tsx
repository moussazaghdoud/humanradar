'use client';

import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export default function Card({ glow, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 ${
        glow ? 'shadow-lg shadow-violet-500/10' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
