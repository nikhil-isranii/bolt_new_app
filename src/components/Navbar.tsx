import { Brain, Moon, Sun } from 'lucide-react';

type Props = {
  dark: boolean;
  toggleDark: () => void;
  onNavigate: (view: 'home' | 'personality' | 'love') => void;
};

export default function Navbar({ dark, toggleDark, onNavigate }: Props) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white">
          <span className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-1.5 rounded-lg">
            <Brain className="w-5 h-5" />
          </span>
          <span className="hidden sm:inline bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Dimag Ka Test
          </span>
        </button>

        <div className="flex items-center gap-1 sm:gap-4">
          <button onClick={() => onNavigate('home')} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors px-2 sm:px-3 py-1.5 rounded-lg">
            Home
          </button>
          <button onClick={() => onNavigate('personality')} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors px-2 sm:px-3 py-1.5 rounded-lg">
            Personality Tests
          </button>
          <button onClick={() => onNavigate('love')} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors px-2 sm:px-3 py-1.5 rounded-lg">
            Love & Compatibility
          </button>
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
