# 🌸 Florecer — Learn Spanish in a Cozy Garden

_Florecer_ (Spanish for **“to bloom / to flourish”**) is a cottagecore Spanish-learning
website. Study a little every day, pass your quizzes, and watch a spring meadow fill with
flowers while your animal friends grow happy and well-fed.

> **Concept:** floral · spring · oil-painting · cottagecore · cozy. Score at least **70%**
> (7/10) on a daily quiz and your garden grows — flowers bloom and the cats, dogs, ducks,
> and bunnies get fed. 🐈🦆🐕🐇

## The four features

| # | Feature | Status |
|---|---------|--------|
| 1 | **Daily Lesson** — a focused 20–30 min lesson (grammar / listening / reading / writing) with examples, hands-on exercises, and a short quiz. | ✅ Built |
| 2 | **Instant Flashcards** — everyday words with usage examples. | 🌱 Next |
| 3 | **Wilson** — an AI native speaker who chats and corrects you live. | 🌱 Planned (needs Claude API backend) |
| 4 | **Progress Evaluator** — a 10-question check-up drawn from your lesson quizzes. | 🌱 Planned |

The **garden gamification** (feature-crossing) is already live: passing quizzes earns seeds,
blooms flowers, feeds animals, and tracks your day streak. Progress is saved to your browser
(`localStorage`).

## Tech stack

- **Vite + React + TypeScript**
- **React Router** for navigation
- Hand-written CSS design system (`src/styles/theme.css`) for full control over the
  oil-painting / cottagecore look
- `localStorage`-backed state (`src/state/garden.tsx`) — no backend required yet

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## Project structure

```
src/
  components/   Layout, Garden (the meadow scene)
  pages/        Home (garden), LessonList, DailyLesson, Flashcards, Conversation, Evaluator
  data/         lessons.ts — lesson content + answer-matching helpers
  state/        garden.tsx — gamification state (seeds, flowers, animals, quiz history)
  styles/       theme.css — the cottagecore design system
```

## Roadmap

1. ✅ Foundation, design system, garden gamification, **Daily Lesson**
2. ⬜ **Flashcards** with usage examples
3. ⬜ **Wilson** conversation mode (Claude API)
4. ⬜ **Progress Evaluator** built from lesson-quiz history

_Built to grow, one lesson at a time._ 🌿
