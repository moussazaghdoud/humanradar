'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/play', label: 'Play' },
  { href: '/profile', label: 'Profile' },
  { href: '/leaderboard', label: 'Top' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a12]/90 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-lg mx-auto flex items-center justify-around py-3 px-4">
        {links.map(link => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors px-4 py-2 rounded-xl ${
                active
                  ? 'text-violet-400 bg-violet-500/10'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
