type Props = {
  onAbout: () => void;
};

export default function Footer({ onAbout }: Props) {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-3xl mb-6 leading-relaxed">
          <strong className="text-gray-700 dark:text-gray-300">Disclaimer:</strong> These quizzes are for
          entertainment and self-reflection only. They are not professional psychological assessments,
          diagnoses, or medical advice. If you are struggling with your mental health, please reach out to
          a qualified professional.
        </p>
        <div className="flex flex-wrap gap-6 text-sm">
          <button onClick={onAbout} className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">About</button>
          <button onClick={onAbout} className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Privacy</button>
          <button onClick={onAbout} className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Disclaimer</button>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-6">© 2026 Dimag Ka Test. Made for fun.</p>
      </div>
    </footer>
  );
}
