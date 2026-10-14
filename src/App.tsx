import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import QuizCard from '@/components/QuizCard';
import QuizRunner from '@/components/QuizRunner';
import Footer from '@/components/Footer';
import DisclaimerModal from '@/components/DisclaimerModal';
import { quizzes, type QuizDef } from '@/data/quizzes';

type View = 'home' | 'personality' | 'love';
type Mode = 'home' | 'quiz';

export default function App() {
  const [dark, setDark] = useState(false);
  const [view, setView] = useState<View>('home');
  const [mode, setMode] = useState<Mode>('home');
  const [activeQuiz, setActiveQuiz] = useState<QuizDef | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [scrollToQuizzes, setScrollToQuizzes] = useState(false);

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);

  useEffect(() => {
    if (scrollToQuizzes) {
      document.getElementById('quizzes')?.scrollIntoView({ behavior: 'smooth' });
      setScrollToQuizzes(false);
    }
  }, [scrollToQuizzes]);

  const startQuiz = (quiz: QuizDef) => {
    setActiveQuiz(quiz);
    setMode('quiz');
  };

  const goHome = () => {
    setMode('home');
    setActiveQuiz(null);
    setView('home');
    window.scrollTo({ top: 0 });
  };

  const handleNav = (v: View) => {
    setMode('home');
    setActiveQuiz(null);
    setView(v);
    if (v === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exploreQuizzes = () => setScrollToQuizzes(true);

  const filteredQuizzes =
    view === 'personality'
      ? quizzes.filter((q) => q.id !== 'love-language')
      : view === 'love'
        ? quizzes.filter((q) => q.id === 'love-language')
        : quizzes;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar dark={dark} toggleDark={() => setDark((d) => !d)} onNavigate={handleNav} />

      {mode === 'quiz' && activeQuiz ? (
        <QuizRunner quiz={activeQuiz} onHome={goHome} />
      ) : (
        <>
          {view === 'home' && (
            <Hero
              onTakeTest={() => startQuiz(quizzes[0])}
              onExplore={exploreQuizzes}
            />
          )}

          {view !== 'home' && (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8 text-center">
              <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {view === 'personality' ? 'Personality Tests' : 'Love & Compatibility'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-3">
                {view === 'personality'
                  ? 'Explore who you are with fun psychology quizzes.'
                  : 'Discover how you love and connect with others.'}
              </p>
            </div>
          )}

          <section id="quizzes" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} onStart={() => startQuiz(quiz)} />
              ))}
            </div>
          </section>
        </>
      )}

      <Footer onAbout={() => setShowDisclaimer(true)} />
      <DisclaimerModal open={showDisclaimer} onClose={() => setShowDisclaimer(false)} />
    </div>
  );
}
