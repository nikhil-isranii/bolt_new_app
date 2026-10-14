export type QuizOption = {
  text: string;
  scores: Record<string, number>;
  emoji?: string;
};

export type QuizQuestion = {
  question: string;
  options: QuizOption[];
};

export type QuizResult = {
  title: string;
  description: string;
  emoji: string;
};

export type QuizDef = {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimatedTime: string;
  questions: QuizQuestion[];
  getResult: (scores: Record<string, number>) => QuizResult;
};

/* ── Quiz 1: Personality Archetypes ── */
const personality: QuizDef = {
  id: 'personality',
  title: 'Discover Your Personality',
  description: 'Find out which archetype matches your energy and vibe.',
  icon: 'Sparkles',
  estimatedTime: '2 min',
  questions: [
    {
      question: 'At a party, you are usually…',
      options: [
        { text: 'The one talking to everyone', scores: { leader: 2, social: 1 } },
        { text: 'Observing from a cozy corner', scores: { thinker: 2, dreamer: 1 } },
        { text: 'Helping the host with things', scores: { caretaker: 2, leader: 1 } },
        { text: 'Dreaming up new ideas', scores: { dreamer: 2, thinker: 1 } },
      ],
    },
    {
      question: 'When facing a big decision you…',
      options: [
        { text: 'Trust your gut and act fast', scores: { leader: 2, dreamer: 1 } },
        { text: 'List every pros and con', scores: { thinker: 2 } },
        { text: 'Ask how it affects others', scores: { caretaker: 2, social: 1 } },
        { text: 'Imagine all possible futures', scores: { dreamer: 2, thinker: 1 } },
      ],
    },
    {
      question: 'Your ideal weekend is…',
      options: [
        { text: 'Hiking a new trail', scores: { leader: 2, dreamer: 1 } },
        { text: 'Reading a good book', scores: { thinker: 2, dreamer: 1 } },
        { text: 'Hosting friends for dinner', scores: { social: 2, caretaker: 1 } },
        { text: 'Painting or writing', scores: { dreamer: 2, thinker: 1 } },
      ],
    },
    {
      question: 'People describe you as…',
      options: [
        { text: 'Bold and confident', scores: { leader: 2 } },
        { text: 'Deep and thoughtful', scores: { thinker: 2 } },
        { text: 'Warm and supportive', scores: { caretaker: 2, social: 1 } },
        { text: 'Creative and quirky', scores: { dreamer: 2 } },
      ],
    },
    {
      question: 'Your biggest strength is…',
      options: [
        { text: 'Taking charge', scores: { leader: 2 } },
        { text: 'Analyzing situations', scores: { thinker: 2 } },
        { text: 'Connecting with people', scores: { social: 2, caretaker: 1 } },
        { text: 'Imagining possibilities', scores: { dreamer: 2 } },
      ],
    },
  ],
  getResult: (scores) => {
    const archetypes: Record<string, QuizResult> = {
      leader: { title: 'The Bold Leader', emoji: '🔥', description: 'You charge ahead with confidence and inspire others to follow. People look to you when decisions need to be made.' },
      thinker: { title: 'The Deep Thinker', emoji: '🧠', description: 'You process the world with logic and curiosity. You value understanding over impulse and rarely act without reason.' },
      caretaker: { title: 'The Warm Caretaker', emoji: '💛', description: 'You lead with empathy and make people feel safe. Your presence is a comfort, and you naturally nurture those around you.' },
      social: { title: 'The Social Spark', emoji: '✨', description: 'You light up rooms and bring people together. Connection is your superpower and you thrive in community.' },
      dreamer: { title: 'The Creative Dreamer', emoji: '🌙', description: 'You see the world through a vivid imagination. Ideas flow through you and you find beauty where others miss it.' },
    };
    let top = 'dreamer';
    let max = -1;
    for (const [k, v] of Object.entries(scores)) {
      if (v > max) { max = v; top = k; }
    }
    return archetypes[top] ?? archetypes.dreamer;
  },
};

/* ── Quiz 2: Overthinker ── */
const overthinker: QuizDef = {
  id: 'overthinker',
  title: 'Are You an Overthinker?',
  description: 'Find out how much your mind loves to replay things on loop.',
  icon: 'Brain',
  estimatedTime: '2 min',
  questions: [
    {
      question: 'When someone texts "ok" you…',
      options: [
        { text: 'Think nothing of it', scores: { chill: 2 } },
        { text: 'Wonder if they are annoyed', scores: { moderate: 2, heavy: 1 } },
        { text: 'Reread the last 20 messages for clues', scores: { heavy: 2 } },
        { text: 'Ask a friend to analyze it', scores: { heavy: 2, moderate: 1 } },
      ],
    },
    {
      question: 'Before falling asleep you usually…',
      options: [
        { text: 'Drift off quickly', scores: { chill: 2 } },
        { text: 'Think about tomorrow a bit', scores: { moderate: 2 } },
        { text: 'Replay conversations from 3 years ago', scores: { heavy: 2 } },
        { text: 'Plan responses to imaginary arguments', scores: { heavy: 2 } },
      ],
    },
    {
      question: 'When you make a small mistake you…',
      options: [
        { text: 'Shrug and move on', scores: { chill: 2 } },
        { text: 'Feel slightly bad for a while', scores: { moderate: 2 } },
        { text: 'Think about it for days', scores: { heavy: 2 } },
        { text: 'Assume everyone noticed and judges you', scores: { heavy: 2 } },
      ],
    },
    {
      question: 'How often do you second-guess decisions?',
      options: [
        { text: 'Rarely, I trust my choices', scores: { chill: 2 } },
        { text: 'Sometimes on big things', scores: { moderate: 2 } },
        { text: 'Often, even small ones', scores: { heavy: 2 } },
        { text: 'Constantly, it is exhausting', scores: { heavy: 2 } },
      ],
    },
    {
      question: 'Your mind is like a…',
      options: [
        { text: 'Calm lake on a still day', scores: { chill: 2 } },
        { text: 'Gentle stream with some rapids', scores: { moderate: 2 } },
        { text: 'A browser with 47 tabs open', scores: { heavy: 2 } },
        { text: 'A washing machine on spin cycle', scores: { heavy: 2 } },
      ],
    },
  ],
  getResult: (scores) => {
    const results: Record<string, QuizResult> = {
      chill: { title: 'The Chill Mind', emoji: '🌿', description: 'You keep things light and move on easily. Your mind is calm and you do not get stuck in thought loops.' },
      moderate: { title: 'The Thoughtful Ponderer', emoji: '🤔', description: 'You reflect on things but know when to stop. A healthy balance of thinking and letting go.' },
      heavy: { title: 'The Serial Overthinker', emoji: '🌀', description: 'Your mind loves to replay, analyze, and imagine every scenario. It can be exhausting but also means you care deeply.' },
    };
    let top = 'chill';
    let max = -1;
    for (const [k, v] of Object.entries(scores)) {
      if (v > max) { max = v; top = k; }
    }
    return results[top] ?? results.chill;
  },
};

/* ── Quiz 3: Love Languages ── */
const loveLanguage: QuizDef = {
  id: 'love-language',
  title: 'What Is Your Love Language?',
  description: 'Discover how you naturally give and receive love.',
  icon: 'Heart',
  estimatedTime: '2 min',
  questions: [
    {
      question: 'What makes you feel most appreciated?',
      options: [
        { text: 'A heartfelt "thank you"', scores: { words: 2 } },
        { text: 'A surprise small gift', scores: { gifts: 2 } },
        { text: 'Someone doing a chore for you', scores: { acts: 2 } },
        { text: 'A long warm hug', scores: { touch: 2 } },
      ],
    },
    {
      question: 'Your perfect date involves…',
      options: [
        { text: 'Deep conversation over coffee', scores: { quality: 2, words: 1 } },
        { text: 'Exchanging thoughtful gifts', scores: { gifts: 2 } },
        { text: 'Cooking a meal together', scores: { acts: 2, quality: 1 } },
        { text: 'Cuddling on the couch', scores: { touch: 2 } },
      ],
    },
    {
      question: 'When you are stressed, you want…',
      options: [
        { text: 'Encouraging words', scores: { words: 2 } },
        { text: 'A little care package', scores: { gifts: 2 } },
        { text: 'Someone to handle things', scores: { acts: 2 } },
        { text: 'A tight hug', scores: { touch: 2 } },
      ],
    },
    {
      question: 'You show love by…',
      options: [
        { text: 'Writing sweet notes', scores: { words: 2 } },
        { text: 'Bringing their favorite snack', scores: { gifts: 2 } },
        { text: 'Helping with their to-do list', scores: { acts: 2 } },
        { text: 'Holding their hand', scores: { touch: 2 } },
      ],
    },
    {
      question: 'What hurts the partner most?',
      options: [
        { text: 'Harsh or careless words', scores: { words: 2 } },
        { text: 'Being forgotten on special days', scores: { gifts: 2 } },
        { text: 'Not helping when overwhelmed', scores: { acts: 2 } },
        { text: 'Physical distance or coldness', scores: { touch: 2 } },
      ],
    },
  ],
  getResult: (scores) => {
    const results: Record<string, QuizResult> = {
      words: { title: 'Words of Affirmation', emoji: '💬', description: 'You feel loved through spoken affection, encouragement, and kind words. Verbal appreciation fuels your heart.' },
      gifts: { title: 'Receiving Gifts', emoji: '🎁', description: 'You feel loved through thoughtful tokens. It is not about price but the meaning behind the gesture.' },
      acts: { title: 'Acts of Service', emoji: '🤝', description: 'You feel loved when someone lightens your load. Actions speak louder than words for you.' },
      touch: { title: 'Physical Touch', emoji: '🤗', description: 'You feel loved through physical closeness. A hug, a hand to hold, or a shoulder touch says it all.' },
      quality: { title: 'Quality Time', emoji: '⏰', description: 'You feel loved through undivided attention. Being fully present with someone is your greatest gift.' },
    };
    let top = 'words';
    let max = -1;
    for (const [k, v] of Object.entries(scores)) {
      if (v > max) { max = v; top = k; }
    }
    return results[top] ?? results.words;
  },
};

export const quizzes: QuizDef[] = [personality, overthinker, loveLanguage];
