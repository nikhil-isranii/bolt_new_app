import { useState, useCallback, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Check, Copy, Share2, Home, Sparkles, AlertCircle } from 'lucide-react';
import type { QuizDef, QuizResult } from '@/data/quizzes';

type Props = {
  quiz: QuizDef;
  onHome: () => void;
};

export default function QuizRunner({ quiz, onHome }: Props) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [insightLoading, setInsightLoading] = useState(false);
  const [insightError, setInsightError] = useState<string | null>(null);
  const fetchedRef = useRef<string | null>(null);

  const total = quiz.questions.length;
  const isLast = current === total - 1;

  const handleSelect = (idx: number) => {
    setSelected(idx);
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
  };

  const handleNext = useCallback(() => {
    if (selected === null) return;
    if (isLast) {
      const scores: Record<string, number> = {};
      answers.forEach((ansIdx, qIdx) => {
        const opts = quiz.questions[qIdx].options;
        const opt = opts[ansIdx];
        if (!opt) return;
        for (const [k, v] of Object.entries(opt.scores)) {
          scores[k] = (scores[k] ?? 0) + v;
        }
      });
      setResult(quiz.getResult(scores));
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(answers[current + 1] ?? null);
  }, [selected, isLast, answers, current, quiz]);

  const handleBack = () => {
    if (current === 0) return;
    setCurrent((c) => c - 1);
    setSelected(answers[current - 1] ?? null);
  };

  const handleRetake = () => {
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setResult(null);
    setAiInsight(null);
    setInsightLoading(false);
    setInsightError(null);
    fetchedRef.current = null;
  };

  useEffect(() => {
    if (!result || !result.title) return;
    const key = `${quiz.id}:${result.title}`;
    if (fetchedRef.current === key) return;
    fetchedRef.current = key;
    setInsightLoading(true);
    setInsightError(null);

    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-insight`;
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        quizTitle: quiz.title,
        resultTitle: result.title,
        resultDescription: result.description,
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        if (typeof data.insight !== 'string') throw new Error('Invalid response');
        setAiInsight(data.insight);
      })
      .catch((err) => setInsightError(err.message || 'Something went wrong'))
      .finally(() => setInsightLoading(false));
  }, [result, quiz.id, quiz.title]);

  const resultText = result
    ? `I got "${result.emoji} ${result.title}" on ${quiz.title}! Take it at Dimag Ka Test.`
    : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = resultText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: quiz.title, text: resultText });
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  if (result) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 text-center">
          <div className="text-6xl mb-4 animate-bounce">{result.emoji}</div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {result.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-lg mx-auto">
            {result.description}
          </p>

          <div className="mb-8 max-w-lg mx-auto">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-2">
              <Sparkles className="w-4 h-4" />
              AI Insight
            </div>
            {insightLoading && (
              <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                Generating your personalized insight...
              </div>
            )}
            {insightError && !insightLoading && (
              <div className="flex items-start gap-2 text-sm text-gray-400 dark:text-gray-500">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Couldn&apos;t load AI insight. Your result is still valid!</span>
              </div>
            )}
            {aiInsight && !insightLoading && (
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-left">
                {aiInsight}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Result'}
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRetake}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border-2 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 text-sm font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </button>
            <button
              onClick={onHome}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = quiz.questions[current];
  const progress = ((current + (selected !== null ? 1 : 0)) / total) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Question {current + 1} of {total}
          </span>
          <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
            {quiz.title}
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 leading-snug">
          {q.question}
        </h2>
        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all text-sm font-medium ${
                selected === idx
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50/50 dark:hover:bg-purple-900/10'
              }`}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={current === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={selected === null}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        >
          {isLast ? 'See Results' : 'Next'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
