import { X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function DisclaimerModal({ open, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Disclaimer</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
          All quizzes on this site are designed for entertainment and self-reflection. They are not
          professional psychological assessments, clinical diagnoses, or medical advice.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          If you are experiencing mental health difficulties, please consult a licensed mental health
          professional. Your results are not stored or shared.
        </p>
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
