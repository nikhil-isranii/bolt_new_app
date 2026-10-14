import { Sparkles, Compass } from 'lucide-react';

type Props = {
  onTakeTest: () => void;
  onExplore: () => void;
};

export default function Hero({ onTakeTest, onExplore }: Props) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-indigo-500/10 to-transparent dark:from-purple-900/30 dark:via-indigo-900/20 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-24 text-center relative">
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6 animate-pulse">
          Personality quizzes, compatibility &amp; fun psychology
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight mb-5">
          Dimag Ka Test,<br />Personality Ka Best
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          Discover yourself. Decode your relationships. Have fun with psychology.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onTakeTest}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            Take a Personality Test
          </button>
          <button
            onClick={onExplore}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 font-semibold border-2 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:scale-105 transition-all"
          >
            <Compass className="w-5 h-5" />
            Explore Quizzes
          </button>
        </div>
      </div>
    </section>
  );
}
