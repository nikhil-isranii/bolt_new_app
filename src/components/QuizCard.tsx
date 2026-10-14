import { Sparkles, Brain, Heart, Clock } from 'lucide-react';
import type { QuizDef } from '@/data/quizzes';

const iconMap: Record<string, typeof Sparkles> = {
  Sparkles,
  Brain,
  Heart,
};

type Props = {
  quiz: QuizDef;
  onStart: () => void;
};

export default function QuizCard({ quiz, onStart }: Props) {
  const Icon = iconMap[quiz.icon] ?? Sparkles;
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5">{quiz.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{quiz.description}</p>
      <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mb-5">
        <Clock className="w-3.5 h-3.5" />
        {quiz.estimatedTime}
      </div>
      <button
        onClick={onStart}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
      >
        Start Quiz
      </button>
    </div>
  );
}
