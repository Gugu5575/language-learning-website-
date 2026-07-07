import { Link } from 'react-router-dom'
import { useGarden } from '../state/garden'
import { getTodaysLesson, SKILL_META } from '../data/lessons'
import Garden from '../components/Garden'

export default function Home() {
  const garden = useGarden()
  const today = getTodaysLesson()
  const meta = SKILL_META[today.skill]
  const doneToday = garden.completedLessons.includes(today.id)

  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Aprende español · cozy &amp; slow</span>
          <h1>
            Grow your Spanish,
            <br />
            grow your garden.
          </h1>
          <p className="muted hero-lead">
            A little study every day. Pass your quizzes and watch flowers bloom
            and your animal friends grow plump and happy in a spring meadow.
          </p>
          <div className="row">
            <Link className="btn" to={`/lessons/${today.id}`}>
              {doneToday ? 'Revisit today’s lesson' : 'Start today’s lesson'} →
            </Link>
            <Link className="btn btn-ghost" to="/lessons">
              Browse lessons
            </Link>
          </div>
        </div>
      </section>

      {/* The garden */}
      <section style={{ marginTop: '2rem' }}>
        <Garden />
        <div className="stat-row">
          <Stat label="Flowers bloomed" value={garden.flowers} emoji="🌼" />
          <Stat label="Seeds" value={garden.seeds} emoji="🌱" />
          <Stat label="Day streak" value={garden.streak} emoji="🔥" />
          <Stat label="Lessons done" value={garden.completedLessons.length} emoji="📖" />
        </div>
      </section>

      {/* Today's lesson card */}
      <section style={{ marginTop: '2.4rem' }}>
        <h2>Today in the garden</h2>
        <div className="card today-card">
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <span className={`pill ${meta.pill}`}>
              {meta.emoji} {meta.label}
            </span>
            <span className="faint">~{today.minutes} min</span>
          </div>
          <h3 style={{ marginTop: '0.8rem' }}>{today.title}</h3>
          <p className="muted">{today.summary}</p>
          <Link className="btn btn-sage btn-sm" to={`/lessons/${today.id}`}>
            {doneToday ? 'Practice again' : 'Begin lesson'} →
          </Link>
          {doneToday && (
            <span className="pill pill-sage" style={{ marginLeft: '0.6rem' }}>
              ✓ Completed
            </span>
          )}
        </div>
      </section>

      {/* Feature garden beds */}
      <section style={{ marginTop: '2.4rem' }}>
        <h2>Wander the garden</h2>
        <div className="feature-grid">
          <FeatureCard
            to="/lessons"
            emoji="📖"
            title="Daily Lesson"
            body="A focused 20–30 min lesson in grammar, listening, reading, or writing — with examples, exercises, and a quiz."
            ready
          />
          <FeatureCard
            to="/flashcards"
            emoji="🃏"
            title="Flashcards"
            body="Everyday Spanish words with usage examples, flipped at your own pace."
          />
          <FeatureCard
            to="/wilson"
            emoji="🧑‍🌾"
            title="Talk with Wilson"
            body="Chat with Wilson, your friendly native speaker, who gently corrects you as you go."
          />
          <FeatureCard
            to="/evaluator"
            emoji="📜"
            title="Progress Evaluator"
            body="A 10-question check-up drawn from your lesson quizzes to see how far you’ve bloomed."
          />
        </div>
      </section>

      <style>{styles}</style>
    </div>
  )
}

function Stat({ label, value, emoji }: { label: string; value: number; emoji: string }) {
  return (
    <div className="stat">
      <span className="stat-emoji">{emoji}</span>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

function FeatureCard({
  to,
  emoji,
  title,
  body,
  ready,
}: {
  to: string
  emoji: string
  title: string
  body: string
  ready?: boolean
}) {
  return (
    <Link to={to} className="card feature-card">
      <span className="feature-emoji">{emoji}</span>
      <h3>{title}</h3>
      <p className="muted" style={{ marginBottom: 0 }}>
        {body}
      </p>
      <span className={`pill ${ready ? 'pill-sage' : ''}`} style={{ marginTop: '0.9rem' }}>
        {ready ? 'Ready to explore' : 'Coming soon 🌷'}
      </span>
    </Link>
  )
}

const styles = `
.hero { padding-top: 1rem; }
.hero-lead { font-size: 1.12rem; max-width: 52ch; }
.stat-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.9rem;
  margin-top: 1rem;
}
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  background: var(--surface);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-sm);
  padding: 0.9rem 0.6rem;
  box-shadow: var(--shadow-soft);
}
.stat-emoji { font-size: 1.4rem; }
.stat-value { font-family: var(--font-display); font-weight: 700; font-size: 1.8rem; color: var(--ink); line-height: 1; }
.stat-label { font-size: 0.78rem; color: var(--ink-faint); font-weight: 600; text-align: center; }
.today-card { margin-top: 0.6rem; }
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1.2rem;
  margin-top: 0.6rem;
}
.feature-card {
  display: flex;
  flex-direction: column;
  color: inherit;
  transition: transform 0.18s, box-shadow 0.2s;
}
.feature-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lift); text-decoration: none; }
.feature-emoji { font-size: 2rem; }
.feature-card h3 { margin: 0.5rem 0 0.3rem; }
@media (max-width: 620px) {
  .stat-row { grid-template-columns: repeat(2, 1fr); }
}
`
