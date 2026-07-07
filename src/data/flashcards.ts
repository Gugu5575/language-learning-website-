/* ---------------------------------------------------------------------------
   Instant flashcards — everyday Spanish words, each with a usage example.
   Words are grouped into cozy categories and served in daily sets.
--------------------------------------------------------------------------- */

export interface Flashcard {
  id: string
  word: string
  translation: string
  pos: 'noun' | 'verb' | 'adjective' | 'phrase' | 'adverb'
  /** Article for nouns, to teach gender. */
  article?: 'el' | 'la' | 'los' | 'las'
  example: string
  exampleEn: string
  category: CategoryId
  emoji: string
}

export type CategoryId =
  | 'garden'
  | 'food'
  | 'home'
  | 'feelings'
  | 'nature'
  | 'everyday'

export const CATEGORIES: { id: CategoryId; label: string; emoji: string }[] = [
  { id: 'garden', label: 'Garden', emoji: '🌷' },
  { id: 'food', label: 'Food & Drink', emoji: '🍞' },
  { id: 'home', label: 'Home', emoji: '🏡' },
  { id: 'feelings', label: 'Feelings', emoji: '💗' },
  { id: 'nature', label: 'Nature', emoji: '🍃' },
  { id: 'everyday', label: 'Everyday', emoji: '☕' },
]

export const flashcards: Flashcard[] = [
  // --- Garden ---------------------------------------------------------------
  {
    id: 'flor',
    word: 'flor',
    translation: 'flower',
    pos: 'noun',
    article: 'la',
    example: 'Cada flor del jardín tiene un aroma diferente.',
    exampleEn: 'Every flower in the garden has a different scent.',
    category: 'garden',
    emoji: '🌸',
  },
  {
    id: 'jardin',
    word: 'jardín',
    translation: 'garden',
    pos: 'noun',
    article: 'el',
    example: 'Me gusta tomar el té en el jardín por la mañana.',
    exampleEn: 'I like to have tea in the garden in the morning.',
    category: 'garden',
    emoji: '🪴',
  },
  {
    id: 'semilla',
    word: 'semilla',
    translation: 'seed',
    pos: 'noun',
    article: 'la',
    example: 'Planté una semilla de girasol la semana pasada.',
    exampleEn: 'I planted a sunflower seed last week.',
    category: 'garden',
    emoji: '🌱',
  },
  {
    id: 'regar',
    word: 'regar',
    translation: 'to water',
    pos: 'verb',
    example: 'Tengo que regar las plantas todas las tardes.',
    exampleEn: 'I have to water the plants every afternoon.',
    category: 'garden',
    emoji: '💧',
  },
  {
    id: 'crecer',
    word: 'crecer',
    translation: 'to grow',
    pos: 'verb',
    example: 'Las flores crecen rápido en primavera.',
    exampleEn: 'Flowers grow quickly in spring.',
    category: 'garden',
    emoji: '🌿',
  },
  {
    id: 'abeja',
    word: 'abeja',
    translation: 'bee',
    pos: 'noun',
    article: 'la',
    example: 'Una abeja vuela entre las margaritas.',
    exampleEn: 'A bee flies among the daisies.',
    category: 'garden',
    emoji: '🐝',
  },

  // --- Food & drink ---------------------------------------------------------
  {
    id: 'pan',
    word: 'pan',
    translation: 'bread',
    pos: 'noun',
    article: 'el',
    example: 'Compro pan fresco en la panadería cada día.',
    exampleEn: 'I buy fresh bread at the bakery every day.',
    category: 'food',
    emoji: '🍞',
  },
  {
    id: 'cafe',
    word: 'café',
    translation: 'coffee',
    pos: 'noun',
    article: 'el',
    example: 'Por la mañana bebo un café con leche.',
    exampleEn: 'In the morning I drink a coffee with milk.',
    category: 'food',
    emoji: '☕',
  },
  {
    id: 'manzana',
    word: 'manzana',
    translation: 'apple',
    pos: 'noun',
    article: 'la',
    example: 'La manzana está un poco verde todavía.',
    exampleEn: 'The apple is still a little unripe.',
    category: 'food',
    emoji: '🍎',
  },
  {
    id: 'miel',
    word: 'miel',
    translation: 'honey',
    pos: 'noun',
    article: 'la',
    example: 'Me gusta el té con un poco de miel.',
    exampleEn: 'I like tea with a little honey.',
    category: 'food',
    emoji: '🍯',
  },
  {
    id: 'cocinar',
    word: 'cocinar',
    translation: 'to cook',
    pos: 'verb',
    example: 'Los domingos me encanta cocinar para mi familia.',
    exampleEn: 'On Sundays I love to cook for my family.',
    category: 'food',
    emoji: '🍲',
  },

  // --- Home -----------------------------------------------------------------
  {
    id: 'casa',
    word: 'casa',
    translation: 'house / home',
    pos: 'noun',
    article: 'la',
    example: 'Nuestra casa es pequeña pero muy acogedora.',
    exampleEn: 'Our house is small but very cozy.',
    category: 'home',
    emoji: '🏡',
  },
  {
    id: 'ventana',
    word: 'ventana',
    translation: 'window',
    pos: 'noun',
    article: 'la',
    example: 'Abro la ventana para que entre el sol.',
    exampleEn: 'I open the window to let the sun in.',
    category: 'home',
    emoji: '🪟',
  },
  {
    id: 'manta',
    word: 'manta',
    translation: 'blanket',
    pos: 'noun',
    article: 'la',
    example: 'En invierno leo bajo una manta suave.',
    exampleEn: 'In winter I read under a soft blanket.',
    category: 'home',
    emoji: '🧣',
  },
  {
    id: 'vela',
    word: 'vela',
    translation: 'candle',
    pos: 'noun',
    article: 'la',
    example: 'Enciendo una vela cuando llueve por la tarde.',
    exampleEn: 'I light a candle when it rains in the afternoon.',
    category: 'home',
    emoji: '🕯️',
  },
  {
    id: 'descansar',
    word: 'descansar',
    translation: 'to rest',
    pos: 'verb',
    example: 'Después del trabajo me gusta descansar un rato.',
    exampleEn: 'After work I like to rest for a while.',
    category: 'home',
    emoji: '🛋️',
  },

  // --- Feelings -------------------------------------------------------------
  {
    id: 'feliz',
    word: 'feliz',
    translation: 'happy',
    pos: 'adjective',
    example: 'Estoy muy feliz de verte hoy.',
    exampleEn: 'I am very happy to see you today.',
    category: 'feelings',
    emoji: '😊',
  },
  {
    id: 'tranquilo',
    word: 'tranquilo',
    translation: 'calm / peaceful',
    pos: 'adjective',
    example: 'El jardín es un lugar muy tranquilo.',
    exampleEn: 'The garden is a very peaceful place.',
    category: 'feelings',
    emoji: '😌',
  },
  {
    id: 'cansado',
    word: 'cansado',
    translation: 'tired',
    pos: 'adjective',
    example: 'Estoy un poco cansado después de caminar.',
    exampleEn: 'I am a little tired after walking.',
    category: 'feelings',
    emoji: '😴',
  },
  {
    id: 'querer',
    word: 'querer',
    translation: 'to want / to love',
    pos: 'verb',
    example: 'Quiero aprender español poco a poco.',
    exampleEn: 'I want to learn Spanish little by little.',
    category: 'feelings',
    emoji: '💗',
  },

  // --- Nature ---------------------------------------------------------------
  {
    id: 'sol',
    word: 'sol',
    translation: 'sun',
    pos: 'noun',
    article: 'el',
    example: 'Hoy hace sol y el cielo está despejado.',
    exampleEn: 'Today it is sunny and the sky is clear.',
    category: 'nature',
    emoji: '☀️',
  },
  {
    id: 'lluvia',
    word: 'lluvia',
    translation: 'rain',
    pos: 'noun',
    article: 'la',
    example: 'La lluvia suave es buena para el jardín.',
    exampleEn: 'Gentle rain is good for the garden.',
    category: 'nature',
    emoji: '🌧️',
  },
  {
    id: 'arbol',
    word: 'árbol',
    translation: 'tree',
    pos: 'noun',
    article: 'el',
    example: 'Hay un árbol grande cerca de la casa.',
    exampleEn: 'There is a big tree near the house.',
    category: 'nature',
    emoji: '🌳',
  },
  {
    id: 'pajaro',
    word: 'pájaro',
    translation: 'bird',
    pos: 'noun',
    article: 'el',
    example: 'Un pájaro canta en la rama por la mañana.',
    exampleEn: 'A bird sings on the branch in the morning.',
    category: 'nature',
    emoji: '🐦',
  },

  // --- Everyday -------------------------------------------------------------
  {
    id: 'hola',
    word: 'hola',
    translation: 'hello',
    pos: 'phrase',
    example: '¡Hola! ¿Cómo estás hoy?',
    exampleEn: 'Hello! How are you today?',
    category: 'everyday',
    emoji: '👋',
  },
  {
    id: 'gracias',
    word: 'gracias',
    translation: 'thank you',
    pos: 'phrase',
    example: 'Muchas gracias por tu ayuda.',
    exampleEn: 'Thank you very much for your help.',
    category: 'everyday',
    emoji: '🙏',
  },
  {
    id: 'hoy',
    word: 'hoy',
    translation: 'today',
    pos: 'adverb',
    example: 'Hoy voy a estudiar una lección nueva.',
    exampleEn: 'Today I am going to study a new lesson.',
    category: 'everyday',
    emoji: '📅',
  },
  {
    id: 'siempre',
    word: 'siempre',
    translation: 'always',
    pos: 'adverb',
    example: 'Siempre tomo un café antes de trabajar.',
    exampleEn: 'I always have a coffee before working.',
    category: 'everyday',
    emoji: '🔁',
  },
  {
    id: 'aprender',
    word: 'aprender',
    translation: 'to learn',
    pos: 'verb',
    example: 'Aprender un idioma es como cuidar un jardín.',
    exampleEn: 'Learning a language is like tending a garden.',
    category: 'everyday',
    emoji: '📚',
  },
]

export const POS_LABEL: Record<Flashcard['pos'], string> = {
  noun: 'noun',
  verb: 'verb',
  adjective: 'adjective',
  phrase: 'phrase',
  adverb: 'adverb',
}

/** Deterministic shuffle seeded by a number, so a "daily set" is stable per day. */
function seededShuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items]
  let s = seed
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280
    const j = Math.floor((s / 233280) * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function dayOfYear(d = new Date()): number {
  const start = new Date(d.getFullYear(), 0, 0)
  return Math.floor((d.getTime() - start.getTime()) / 86_400_000)
}

/** A stable set of `size` words for today, drawn across all categories. */
export function getDailySet(size = 8): Flashcard[] {
  return seededShuffle(flashcards, dayOfYear()).slice(0, size)
}

export function getByCategory(cat: CategoryId): Flashcard[] {
  return flashcards.filter((c) => c.category === cat)
}
