import { Link } from 'react-router-dom'
import { lessons, getTodaysLesson, SKILL_META } from '../data/lessons'
import { useGarden } from '../state/garden'

export default function LessonList() {
  const today = getTodaysLesson()
  const { completedLessons } = useGarden()

  return (
    <div className="page">
      <span className="eyebrow">Daily Lessons</span>
      <h1>Pick a lesson to bloom</h1>
      <p className="muted" style={{ maxWidth: '56ch' }}>
        Each lesson is a cozy 20–30 minute sitting with examples, hands-on
        exercises, and a short quiz at the end. Score at least 70% and your
        garden grows.
      </p>

      <div className="lesson-list">
        {lessons.map((l) => {
          const meta = SKILL_META[l.skill]
          const done = completedLessons.includes(l.id)
          const isToday = l.id === today.id
          return (
            <Link key={l.id} to={`/lessons/${l.id}`} className="card lesson-row">
              <div className="lesson-day">
                <span className="lesson-day-num">{l.day}</span>
                <span className="lesson-day-word">día</span>
              </div>
              <div className="lesson-main">
                <div className="row" style={{ gap: '0.5rem' }}>
                  <span className={`pill ${meta.pill}`}>
                    {meta.emoji} {meta.label}
                  </span>
                  {isToday && <span className="pill pill-butter">🌞 Today</span>}
                  {done && <span className="pill pill-sage">✓ Done</span>}
                </div>
                <h3 style={{ margin: '0.5rem 0 0.2rem' }}>{l.title}</h3>
                <p className="muted" style={{ marginBottom: 0 }}>
                  {l.summary}
                </p>
              </div>
              <div className="lesson-go faint">~{l.minutes} min →</div>
            </Link>
          )
        })}
      </div>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.lesson-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 1.6rem; }
.lesson-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.2rem;
  color: inherit;
  transition: transform 0.16s, box-shadow 0.2s;
}
.lesson-row:hover { transform: translateY(-3px); box-shadow: var(--shadow-lift); text-decoration: none; }
.lesson-day {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  width: 66px; height: 66px; border-radius: 18px;
  background: linear-gradient(135deg, var(--butter), var(--butter-deep));
  color: var(--terracotta-deep);
}
.lesson-day-num { font-family: var(--font-display); font-weight: 700; font-size: 1.7rem; line-height: 1; }
.lesson-day-word { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
.lesson-go { white-space: nowrap; font-weight: 700; }
@media (max-width: 560px) {
  .lesson-row { grid-template-columns: auto 1fr; }
  .lesson-go { grid-column: 2; }
}
`
