import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/* ---------------------------------------------------------------------------
   The garden is the heart of Florecer. Passing your daily quizzes (>= 70%)
   earns seeds, blooms flowers, and feeds the animals who live in the garden.
   Everything persists to localStorage so the garden is here when you return.
--------------------------------------------------------------------------- */

export const PASS_RATIO = 0.7 // "at least 7/10"

export interface QuizResult {
  lessonId: string
  lessonTitle: string
  skill: string
  score: number
  total: number
  date: string // ISO
}

export interface Animal {
  id: string
  name: string
  emoji: string
  /** 0–100 how well-fed / happy this friend is */
  happiness: number
}

export interface GardenState {
  seeds: number
  flowers: number
  animals: Animal[]
  quizHistory: QuizResult[]
  completedLessons: string[]
  lastActiveDate: string | null
  streak: number
}

const STARTER_ANIMALS: Animal[] = [
  { id: 'cat', name: 'Doña Nube', emoji: '🐈', happiness: 20 },
  { id: 'duck', name: 'Pepe', emoji: '🦆', happiness: 15 },
  { id: 'dog', name: 'Coco', emoji: '🐕', happiness: 10 },
  { id: 'bunny', name: 'Trébol', emoji: '🐇', happiness: 0 },
]

const INITIAL: GardenState = {
  seeds: 0,
  flowers: 0,
  animals: STARTER_ANIMALS,
  quizHistory: [],
  completedLessons: [],
  lastActiveDate: null,
  streak: 0,
}

const STORAGE_KEY = 'florecer.garden.v1'

function load(): GardenState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return INITIAL
    const parsed = JSON.parse(raw) as Partial<GardenState>
    // Merge defensively so new fields/animals appear for returning gardeners.
    return {
      ...INITIAL,
      ...parsed,
      animals:
        parsed.animals && parsed.animals.length
          ? STARTER_ANIMALS.map(
              (a) => parsed.animals!.find((p) => p.id === a.id) ?? a,
            )
          : STARTER_ANIMALS,
    }
  } catch {
    return INITIAL
  }
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

function dayDiff(a: string, b: string): number {
  const ms = new Date(b).getTime() - new Date(a).getTime()
  return Math.round(ms / 86_400_000)
}

export interface AwardOutcome {
  passed: boolean
  seedsEarned: number
  flowersBloomed: number
  fed: Animal | null
  perfect: boolean
}

interface GardenContextValue extends GardenState {
  /** Record a finished quiz and grow the garden accordingly. */
  recordQuiz: (r: Omit<QuizResult, 'date'>) => AwardOutcome
  reset: () => void
  bloomedThisWeek: number
}

const GardenContext = createContext<GardenContextValue | null>(null)

export function GardenProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GardenState>(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  function recordQuiz(r: Omit<QuizResult, 'date'>): AwardOutcome {
    const ratio = r.total > 0 ? r.score / r.total : 0
    const passed = ratio >= PASS_RATIO
    const perfect = r.score === r.total && r.total > 0

    // Reward scales with how well you did; a perfect run earns a bonus bloom.
    const seedsEarned = passed ? r.score * 2 + (perfect ? 6 : 0) : 0
    const flowersBloomed = passed ? (perfect ? 3 : 2) : 0

    const outcome: AwardOutcome = {
      passed,
      seedsEarned,
      flowersBloomed,
      fed: null,
      perfect,
    }

    setState((prev) => {
      const today = todayKey()
      let streak = prev.streak
      if (prev.lastActiveDate !== today) {
        const gap = prev.lastActiveDate ? dayDiff(prev.lastActiveDate, today) : 999
        streak = gap === 1 ? prev.streak + 1 : 1
      }

      // Feed the hungriest friend when the quiz is passed.
      let animals = prev.animals
      if (passed) {
        const hungriest = [...prev.animals].sort(
          (a, b) => a.happiness - b.happiness,
        )[0]
        if (hungriest) {
          outcome.fed = hungriest
          animals = prev.animals.map((a) =>
            a.id === hungriest.id
              ? { ...a, happiness: Math.min(100, a.happiness + (perfect ? 30 : 20)) }
              : a,
          )
        }
      }

      const completed = prev.completedLessons.includes(r.lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, r.lessonId]

      return {
        ...prev,
        seeds: prev.seeds + seedsEarned,
        flowers: prev.flowers + flowersBloomed,
        animals,
        quizHistory: [...prev.quizHistory, { ...r, date: new Date().toISOString() }],
        completedLessons: completed,
        lastActiveDate: today,
        streak,
      }
    })

    return outcome
  }

  function reset() {
    setState(INITIAL)
  }

  const bloomedThisWeek = useMemo(() => {
    const weekAgo = Date.now() - 7 * 86_400_000
    return state.quizHistory.filter(
      (q) => new Date(q.date).getTime() >= weekAgo && q.score / q.total >= PASS_RATIO,
    ).length
  }, [state.quizHistory])

  const value: GardenContextValue = {
    ...state,
    recordQuiz,
    reset,
    bloomedThisWeek,
  }

  return <GardenContext.Provider value={value}>{children}</GardenContext.Provider>
}

export function useGarden(): GardenContextValue {
  const ctx = useContext(GardenContext)
  if (!ctx) throw new Error('useGarden must be used within a GardenProvider')
  return ctx
}
