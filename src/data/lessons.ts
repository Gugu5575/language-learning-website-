/* ---------------------------------------------------------------------------
   Daily lessons. Each lesson is a ~20–30 min sitting: teaching with examples,
   hands-on exercises (instant feedback, unscored), and a short quiz at the end
   whose score feeds the garden.
--------------------------------------------------------------------------- */

export type Skill = 'grammar' | 'listening' | 'reading' | 'writing'

export interface Example {
  spanish: string
  english: string
  note?: string
}

export interface Section {
  heading: string
  body: string
  examples?: Example[]
  /** For listening lessons: a short passage the learner "hears" (read aloud). */
  audioText?: string
}

export interface Question {
  id: string
  prompt: string
  type: 'choice' | 'fill'
  options?: string[]
  /** Accepted answer(s); comparison is case/accent-insensitive and trimmed. */
  answer: string | string[]
  hint?: string
  explanation?: string
}

export interface Lesson {
  id: string
  day: number
  title: string
  skill: Skill
  minutes: number
  summary: string
  intro: string
  sections: Section[]
  exercises: Question[]
  quiz: Question[]
}

export const SKILL_META: Record<Skill, { label: string; emoji: string; pill: string }> = {
  grammar: { label: 'Grammar', emoji: '🌿', pill: 'pill-sage' },
  listening: { label: 'Listening', emoji: '🎧', pill: 'pill' },
  reading: { label: 'Reading', emoji: '📖', pill: 'pill-butter' },
  writing: { label: 'Writing', emoji: '✒️', pill: 'pill-blush' },
}

export const lessons: Lesson[] = [
  {
    id: 'day-1-ser-estar',
    day: 1,
    title: 'Ser vs. Estar — Two Ways to “Be”',
    skill: 'grammar',
    minutes: 25,
    summary:
      'Spanish has two verbs for “to be”. Learn when to use ser (essence) and estar (state) with a simple, memorable rule.',
    intro:
      'One of the first puzzles every Spanish learner meets: there are two verbs that both mean “to be”. The good news is that they split the work in a very logical way. Ser describes what something *is* — its identity and permanent traits. Estar describes how something *is right now* — its condition, mood, and location. Keep the little rhyme in mind: “How you feel and where you are, always use the verb estar.”',
    sections: [
      {
        heading: 'Ser — identity & essence',
        body: 'Use ser for things that define what someone or something fundamentally is: name, origin, profession, nationality, physical and personality traits, and the time or date.',
        examples: [
          { spanish: 'Yo soy María.', english: 'I am María.', note: 'identity / name' },
          { spanish: 'Ella es de España.', english: 'She is from Spain.', note: 'origin' },
          { spanish: 'Somos estudiantes.', english: 'We are students.', note: 'profession/role' },
          { spanish: 'El jardín es hermoso.', english: 'The garden is beautiful.', note: 'inherent trait' },
        ],
      },
      {
        heading: 'Estar — states & location',
        body: 'Use estar for conditions that can change — feelings, health, temporary states — and for physical location.',
        examples: [
          { spanish: 'Estoy cansada.', english: 'I am tired.', note: 'temporary feeling' },
          { spanish: 'El café está caliente.', english: 'The coffee is hot.', note: 'current condition' },
          { spanish: 'Los gatos están en el jardín.', english: 'The cats are in the garden.', note: 'location' },
          { spanish: 'Estamos muy contentos hoy.', english: 'We are very happy today.', note: 'mood right now' },
        ],
      },
      {
        heading: 'The meaning can flip!',
        body: 'Some adjectives change meaning depending on which verb you choose. This is where the essence-vs-state rule really shines.',
        examples: [
          { spanish: 'Ella es aburrida.', english: 'She is boring.', note: 'ser → a permanent trait' },
          { spanish: 'Ella está aburrida.', english: 'She is bored.', note: 'estar → a current state' },
          { spanish: 'La manzana es verde.', english: 'The apple is green (a green variety).', note: 'ser → its nature' },
          { spanish: 'La manzana está verde.', english: 'The apple is unripe.', note: 'estar → its condition' },
        ],
      },
    ],
    exercises: [
      {
        id: 'ex1',
        prompt: 'Mi hermana ___ doctora. (identity / profession)',
        type: 'choice',
        options: ['es', 'está'],
        answer: 'es',
        explanation: 'Profession is part of who she is → ser.',
      },
      {
        id: 'ex2',
        prompt: 'El perro ___ en la cocina. (location)',
        type: 'choice',
        options: ['es', 'está'],
        answer: 'está',
        explanation: 'Location always uses estar.',
      },
      {
        id: 'ex3',
        prompt: 'Hoy yo ___ muy feliz. (mood right now)',
        type: 'fill',
        answer: ['estoy'],
        hint: 'A feeling in the moment → estar, first person.',
        explanation: 'A current mood → estar. First person singular is “estoy”.',
      },
      {
        id: 'ex4',
        prompt: 'La sopa ___ deliciosa hoy. (how it tastes right now)',
        type: 'choice',
        options: ['es', 'está'],
        answer: 'está',
        explanation: 'A tasting/condition right now → estar.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'Nosotros ___ de México.',
        type: 'choice',
        options: ['somos', 'estamos'],
        answer: 'somos',
        explanation: 'Origin → ser. “Nosotros somos”.',
      },
      {
        id: 'q2',
        prompt: 'Los niños ___ cansados después de jugar.',
        type: 'choice',
        options: ['son', 'están'],
        answer: 'están',
        explanation: 'Tired is a temporary state → estar.',
      },
      {
        id: 'q3',
        prompt: 'El cielo ___ azul esta mañana.',
        type: 'choice',
        options: ['es', 'está'],
        answer: 'está',
        explanation: 'A condition “this morning” → estar.',
      },
      {
        id: 'q4',
        prompt: 'Complete: Yo ___ profesora de música. (I am a music teacher)',
        type: 'fill',
        answer: ['soy'],
        explanation: 'Profession → ser → “soy”.',
      },
      {
        id: 'q5',
        prompt: 'La ventana ___ abierta.  (the window is open — a state)',
        type: 'choice',
        options: ['es', 'está'],
        answer: 'está',
        explanation: 'Open is a current state → estar.',
      },
    ],
  },

  {
    id: 'day-2-cafe-listening',
    day: 2,
    title: 'At the Café — Everyday Listening',
    skill: 'listening',
    minutes: 20,
    summary:
      'Tune your ear to a simple café conversation. Learn ordering phrases and catch the details.',
    intro:
      'Listening is a muscle — the more familiar phrases you meet, the more your ear relaxes. Below is a short exchange at a village café. Read it aloud (or use your browser’s read-aloud), imagine the sounds, then answer questions about what happened. Tip: you don’t need every word — listen for the key ones.',
    sections: [
      {
        heading: 'Useful café phrases',
        body: 'A handful of phrases will carry you through almost any café.',
        examples: [
          { spanish: '¿Qué le pongo?', english: 'What can I get you?' },
          { spanish: 'Quisiera un café con leche, por favor.', english: 'I would like a coffee with milk, please.' },
          { spanish: '¿Algo más?', english: 'Anything else?' },
          { spanish: 'La cuenta, por favor.', english: 'The check, please.' },
        ],
      },
      {
        heading: 'Listen to the scene',
        body: 'Camila stops at the café before work. Read the dialogue aloud, then answer below.',
        audioText:
          '— Buenos días. ¿Qué le pongo? — Buenos días. Quisiera un café con leche y una tostada con mermelada. — Muy bien. ¿Algo más? — Sí, un zumo de naranja, por favor. — Enseguida. Son cuatro euros con cincuenta.',
        examples: [
          { spanish: 'una tostada con mermelada', english: 'toast with jam' },
          { spanish: 'un zumo de naranja', english: 'an orange juice' },
          { spanish: 'Son cuatro euros con cincuenta.', english: 'That’s €4.50.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'ex1',
        prompt: 'What did Camila order to drink first?',
        type: 'choice',
        options: ['Un té', 'Un café con leche', 'Un zumo de manzana'],
        answer: 'Un café con leche',
        explanation: 'She said “Quisiera un café con leche”.',
      },
      {
        id: 'ex2',
        prompt: 'How would you politely say “I would like a coffee”?',
        type: 'choice',
        options: ['Dame un café', 'Quisiera un café', 'Café ahora'],
        answer: 'Quisiera un café',
        explanation: '“Quisiera” is a soft, polite “I would like”.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'How much was the total?',
        type: 'choice',
        options: ['€4.15', '€4.50', '€5.40'],
        answer: '€4.50',
        explanation: '“cuatro euros con cincuenta” = €4.50.',
      },
      {
        id: 'q2',
        prompt: 'What did Camila have to eat?',
        type: 'choice',
        options: ['Toast with jam', 'A croissant', 'A sandwich'],
        answer: 'Toast with jam',
        explanation: '“una tostada con mermelada”.',
      },
      {
        id: 'q3',
        prompt: '“¿Algo más?” means…',
        type: 'choice',
        options: ['Anything else?', 'How much?', 'For here or to go?'],
        answer: 'Anything else?',
      },
      {
        id: 'q4',
        prompt: 'Fill in: “La ___, por favor.” (I’d like the check)',
        type: 'fill',
        answer: ['cuenta'],
        explanation: '“La cuenta, por favor.”',
      },
      {
        id: 'q5',
        prompt: '“un zumo de naranja” is…',
        type: 'choice',
        options: ['an orange juice', 'a lemonade', 'a green tea'],
        answer: 'an orange juice',
      },
    ],
  },

  {
    id: 'day-3-garden-reading',
    day: 3,
    title: 'The Little Garden — Reading Comprehension',
    skill: 'reading',
    minutes: 25,
    summary:
      'Read a cozy short text about a spring garden and grow your present-tense vocabulary.',
    intro:
      'Reading gently builds vocabulary and grammar at the same time. Read the short passage below twice — once for the gist, once for detail. New words are glossed underneath. Then answer the questions.',
    sections: [
      {
        heading: 'El jardín de la abuela',
        body: 'En primavera, la abuela trabaja en su pequeño jardín cada mañana. Planta flores de muchos colores: rosas, margaritas y lavanda. Un gato gris duerme al sol entre las macetas. Por la tarde, la abuela toma té y mira las abejas. “El jardín es mi lugar favorito”, dice ella con una sonrisa.',
        examples: [
          { spanish: 'la primavera', english: 'spring' },
          { spanish: 'las margaritas', english: 'daisies' },
          { spanish: 'las macetas', english: 'flowerpots' },
          { spanish: 'las abejas', english: 'the bees' },
          { spanish: 'una sonrisa', english: 'a smile' },
        ],
      },
    ],
    exercises: [
      {
        id: 'ex1',
        prompt: 'When does the grandmother work in the garden?',
        type: 'choice',
        options: ['Every morning', 'On weekends', 'At night'],
        answer: 'Every morning',
        explanation: '“cada mañana” = every morning.',
      },
      {
        id: 'ex2',
        prompt: '“las macetas” are…',
        type: 'choice',
        options: ['flowerpots', 'butterflies', 'benches'],
        answer: 'flowerpots',
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'What color is the cat?',
        type: 'choice',
        options: ['Gray', 'Black', 'Orange'],
        answer: 'Gray',
        explanation: '“Un gato gris” = a gray cat.',
      },
      {
        id: 'q2',
        prompt: 'Which flowers does she plant? (choose the one mentioned)',
        type: 'choice',
        options: ['Tulips', 'Daisies', 'Sunflowers'],
        answer: 'Daisies',
        explanation: '“margaritas” = daisies.',
      },
      {
        id: 'q3',
        prompt: 'What does the grandmother do in the afternoon?',
        type: 'choice',
        options: ['Drinks tea and watches the bees', 'Reads a book', 'Sleeps'],
        answer: 'Drinks tea and watches the bees',
      },
      {
        id: 'q4',
        prompt: 'Fill in: “El jardín es mi lugar ___.” (favorite)',
        type: 'fill',
        answer: ['favorito'],
      },
      {
        id: 'q5',
        prompt: '“la primavera” means…',
        type: 'choice',
        options: ['spring', 'summer', 'autumn'],
        answer: 'spring',
      },
    ],
  },

  {
    id: 'day-4-writing-me-gusta',
    day: 4,
    title: 'Writing with “Me gusta” — Saying What You Like',
    skill: 'writing',
    minutes: 25,
    summary:
      'Learn to express likes and dislikes, then write your own cozy sentences with confidence.',
    intro:
      'To say you like something in Spanish, you flip the sentence around: literally “it is pleasing to me”. Use me gusta + a singular thing/verb, and me gustan + plural things. Let’s learn the pattern and then write a few lines of your own.',
    sections: [
      {
        heading: 'The pattern',
        body: 'Me gusta (singular thing or an action) / Me gustan (plural things). Add “no” in front to say you don’t like it.',
        examples: [
          { spanish: 'Me gusta el café.', english: 'I like coffee.', note: 'singular noun' },
          { spanish: 'Me gustan las flores.', english: 'I like flowers.', note: 'plural noun → gustan' },
          { spanish: 'Me gusta leer en el jardín.', english: 'I like reading in the garden.', note: 'a verb → gusta' },
          { spanish: 'No me gusta el frío.', english: 'I don’t like the cold.' },
        ],
      },
      {
        heading: 'Turn it up',
        body: 'Add feeling with “mucho” (a lot) and “encanta” (I love).',
        examples: [
          { spanish: 'Me gusta mucho la primavera.', english: 'I really like spring.' },
          { spanish: 'Me encanta el jardín.', english: 'I love the garden.', note: 'encanta = stronger than gusta' },
        ],
      },
    ],
    exercises: [
      {
        id: 'ex1',
        prompt: 'Choose: “___ los gatos.” (I like cats — plural)',
        type: 'choice',
        options: ['Me gusta', 'Me gustan'],
        answer: 'Me gustan',
        explanation: 'Plural things → me gustan.',
      },
      {
        id: 'ex2',
        prompt: 'Write “I like tea.” in Spanish.',
        type: 'fill',
        answer: ['me gusta el te', 'me gusta el té', 'me gusta te'],
        hint: 'Me gusta + el + noun.',
        explanation: '“Me gusta el té.”',
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'Choose the correct form: “___ las margaritas.”',
        type: 'choice',
        options: ['Me gusta', 'Me gustan'],
        answer: 'Me gustan',
        explanation: 'Daisies are plural → gustan.',
      },
      {
        id: 'q2',
        prompt: '“Me encanta el jardín” is stronger than “me gusta”. True?',
        type: 'choice',
        options: ['True', 'False'],
        answer: 'True',
        explanation: 'Encanta ≈ “I love it”.',
      },
      {
        id: 'q3',
        prompt: 'Write “I don’t like the cold.”',
        type: 'fill',
        answer: ['no me gusta el frio', 'no me gusta el frío'],
        explanation: '“No me gusta el frío.”',
      },
      {
        id: 'q4',
        prompt: 'Choose: “Me gusta ___ en el jardín.” (to read)',
        type: 'choice',
        options: ['leer', 'libro', 'leo'],
        answer: 'leer',
        explanation: 'After me gusta, use the infinitive: leer.',
      },
      {
        id: 'q5',
        prompt: 'Write “I really like spring.” (use mucho)',
        type: 'fill',
        answer: ['me gusta mucho la primavera'],
        explanation: '“Me gusta mucho la primavera.”',
      },
    ],
  },
]

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id)
}

/** Picks a “today’s lesson” deterministically from the day of the year. */
export function getTodaysLesson(): Lesson {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86_400_000)
  return lessons[dayOfYear % lessons.length]
}

/** Normalizes an answer for tolerant comparison (case, accents, spacing). */
export function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[.!?¿¡]/g, '')
}

export function isCorrect(given: string, answer: string | string[]): boolean {
  const answers = Array.isArray(answer) ? answer : [answer]
  return answers.some((a) => normalize(a) === normalize(given))
}
