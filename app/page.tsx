import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Background glow */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-indigo-600/15 blur-[100px]" />
      </div>

      <div className="animate-fade-in space-y-8 max-w-md">
        {/* Title */}
        <div className="space-y-3">
          <div className="text-5xl sm:text-6xl font-black tracking-tight bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Human
            <br />
            Radar
          </div>
          <p className="text-lg text-white/60 font-medium">
            Can you predict how humans think?
          </p>
        </div>

        {/* Concept */}
        <p className="text-sm text-white/40 leading-relaxed max-w-xs mx-auto">
          Predict what the majority will choose. Score points. Climb the leaderboard. Prove you understand human nature.
        </p>

        {/* CTA */}
        <Link
          href="/play"
          className="inline-flex items-center justify-center w-full py-5 rounded-2xl text-xl font-bold text-white
            bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30
            hover:shadow-violet-500/50 hover:from-violet-500 hover:to-indigo-500
            active:scale-[0.97] transition-all duration-200 animate-pulse-glow"
        >
          Play Now
        </Link>

        <p className="text-xs text-white/20">Free to play. No downloads.</p>
      </div>
    </main>
  );
}
