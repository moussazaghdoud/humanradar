'use client';

const BADGE_ICONS: Record<string, string> = {
  'First Win': '🎯',
  '5 Streak': '🔥',
  '10 Streak': '⚡',
  '100 Points': '💯',
  '500 Points': '🏆',
  '80% Accuracy': '🧠',
  'Mind Reader': '🔮',
};

interface BadgeDisplayProps {
  name: string;
  size?: 'sm' | 'md';
}

export default function BadgeDisplay({ name, size = 'md' }: BadgeDisplayProps) {
  const icon = BADGE_ICONS[name] ?? '⭐';
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 ${sizeClass}`}>
      <span>{icon}</span>
      <span className="text-white/80">{name}</span>
    </span>
  );
}
