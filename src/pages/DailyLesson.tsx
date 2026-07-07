import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  getLesson,
  isCorrect,
  SKILL_META,
  type Lesson,
  type Question,
  type Section,
} from '../data/lessons'
import { useGarden, PASS_RATIO, type AwardOutcome } from '../state/garden'

type Stage = 'learn' | 'practice' | 'quiz' | 'results'

export default function DailyLesson() {
  const { id } = useParams()
  const navigate = useNavigate()
  const lesson = id ? getLesson(id) : undefined
  const { recordQuiz } = useGarden()

  const [stage, setStage] = useState<Stage>('learn')
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [outcome, setOutcome] = useState<{ award: AwardOutcome; score: number } | null>(null)

  const meta = lesson ? SKILL_META[lesson.skill] : null

  if (!lesson || !meta) {
    return (
      <div className="page">
        <h2>That lesson wandered off…</h2>
        <Link className="btn btn-sage" to="/lessons">
          Back to lessons
        </Link>
      </div>
    )
  }

  const stages: Stage[] = ['learn', 'practice', 'quiz', 'results']
  const stageIndex = stages.indexOf(stage)

  function submitQuiz() {
    const total = lesson!.quiz.length
    const finalScore = lesson!.quiz.reduce(
      (n, q) => (isCorrect(quizAnswers[q.id] ?? '', q.answer) ? n + 1 : n),
      0,
    )
    const award = recordQuiz({
      lessonId: lesson!.id,
      lessonTitle: lesson!.title,
      skill: lesson!.skill,
      score: finalScore,
      total,
    })
    setOutcome({ award, score: finalScore })
    setStage('results')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const allQuizAnswered = lesson.quiz.every((q) => (quizAnswers[q.id] ?? '').trim() !== '')

  return (
    <div className="page">
      {/* Header */}
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <Link to="/lessons" className="faint" style={{ fontWeight: 700 }}>
          ← All lessons
        </Link>
        <span className="faint">Día {lesson.day} · ~{lesson.minutes} min</span>
      </div>
      <span className={`pill ${meta.pill}`} style={{ marginTop: '0.8rem' }}>
        {meta.emoji} {meta.label}
      </span>
      <h1 style={{ marginTop: '0.5rem' }}>{lesson.title}</h1>

      {/* Stepper */}
      <div className="stepper">
        {(['learn', 'practice', 'quiz', 'results'] as Stage[]).map((s, i) => (
          <div
            key={s}
            className={
              'step' +
              (i === stageIndex ? ' active' : '') +
              (i < stageIndex ? ' done' : '')
            }
          >
            <span className="step-dot">{i < stageIndex ? '✓' : i + 1}</span>
            <span className="step-label">
              {s === 'learn'
                ? 'Learn'
                : s === 'practice'
                  ? 'Practice'
                  : s === 'quiz'
                    ? 'Quiz'
                    : 'Bloom'}
            </span>
          </div>
        ))}
      </div>

      {/* LEARN */}
      {stage === 'learn' && (
        <div className="stack">
          <p className="lesson-intro">{lesson.intro}</p>
          {lesson.sections.map((s, i) => (
            <SectionBlock key={i} section={s} />
          ))}
          <div className="row">
            <button className="btn" onClick={() => setStage('practice')}>
              I’ve got it — let’s practice →
            </button>
          </div>
        </div>
      )}

      {/* PRACTICE */}
      {stage === 'practice' && (
        <div className="stack">
          <div className="card card-quiet">
            <h3 style={{ marginTop: 0 }}>Practice 🌿</h3>
            <p className="muted" style={{ marginBottom: 0 }}>
              Try each one — you’ll get instant feedback. Nothing here counts
              against your garden; it’s just for warming up.
            </p>
          </div>
          {lesson.exercises.map((q, i) => (
            <PracticeQuestion key={q.id} q={q} index={i + 1} />
          ))}
          <div className="row">
            <button className="btn btn-ghost" onClick={() => setStage('learn')}>
              ← Review
            </button>
            <button className="btn" onClick={() => setStage('quiz')}>
              Take the quiz →
            </button>
          </div>
        </div>
      )}

      {/* QUIZ */}
      {stage === 'quiz' && (
        <div className="stack">
          <div className="card card-quiet">
            <h3 style={{ marginTop: 0 }}>Short quiz 🌼</h3>
            <p className="muted" style={{ marginBottom: 0 }}>
              {lesson.quiz.length} questions. Score{' '}
              <strong>{Math.ceil(lesson.quiz.length * PASS_RATIO)}/{lesson.quiz.length}</strong>{' '}
              or better to plant flowers and feed a friend.
            </p>
          </div>
          {lesson.quiz.map((q, i) => (
            <QuizQuestion
              key={q.id}
              q={q}
              index={i + 1}
              value={quizAnswers[q.id] ?? ''}
              onChange={(v) => setQuizAnswers((prev) => ({ ...prev, [q.id]: v }))}
            />
          ))}
          <div className="row">
            <button className="btn btn-ghost" onClick={() => setStage('practice')}>
              ← Back
            </button>
            <button className="btn btn-sage" onClick={submitQuiz} disabled={!allQuizAnswered}>
              {allQuizAnswered ? 'Submit quiz 🌸' : 'Answer all to submit'}
            </button>
          </div>
        </div>
      )}

      {/* RESULTS */}
      {stage === 'results' && outcome && (
        <Results
          lesson={lesson}
          score={outcome.score}
          award={outcome.award}
          answers={quizAnswers}
          onRetry={() => {
            setQuizAnswers({})
            setOutcome(null)
            setStage('quiz')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onHome={() => navigate('/')}
        />
      )}

      <style>{styles}</style>
    </div>
  )
}

function SectionBlock({ section }: { section: Section }) {
  function speak(text: string) {
    if (!('speechSynthesis' in window)) return
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'es-ES'
    u.rate = 0.9
    speechSynthesis.cancel()
    speechSynthesis.speak(u)
  }

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>{section.heading}</h3>
      <p className="muted">{section.body}</p>

      {section.audioText && (
        <div className="audio-block">
          <button className="btn btn-sage btn-sm" onClick={() => speak(section.audioText!)}>
            🔊 Play the scene
          </button>
          <p className="spanish" style={{ marginTop: '0.7rem' }}>
            {section.audioText}
          </p>
        </div>
      )}

      {section.examples && section.examples.length > 0 && (
        <div className="examples">
          {section.examples.map((ex, i) => (
            <div key={i} className="example">
              <button
                className="example-speak"
                title="Listen"
                onClick={() => speak(ex.spanish)}
                aria-label={`Listen to ${ex.spanish}`}
              >
                🔊
              </button>
              <div>
                <div className="spanish">{ex.spanish}</div>
                <div className="muted example-en">{ex.english}</div>
                {ex.note && <div className="example-note">{ex.note}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function PracticeQuestion({ q, index }: { q: Question; index: number }) {
  const [value, setValue] = useState('')
  const [checked, setChecked] = useState(false)
  const [reveal, setReveal] = useState(false)
  const correct = checked && isCorrect(value, q.answer)

  return (
    <div className="card question">
      <div className="q-head">
        <span className="q-num">{index}</span>
        <p className="q-prompt">{q.prompt}</p>
      </div>

      {q.type === 'choice' ? (
        <div className="choices">
          {q.options!.map((opt) => (
            <button
              key={opt}
              className={
                'choice' +
                (value === opt ? ' selected' : '') +
                (checked && isCorrect(opt, q.answer) ? ' correct' : '') +
                (checked && value === opt && !correct ? ' wrong' : '')
              }
              disabled={checked}
              onClick={() => {
                setValue(opt)
                setChecked(true)
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <form
          className="fill"
          onSubmit={(e) => {
            e.preventDefault()
            if (value.trim()) setChecked(true)
          }}
        >
          <input
            className="text-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type your answer…"
            disabled={checked}
          />
          {!checked && (
            <button className="btn btn-sm" type="submit" disabled={!value.trim()}>
              Check
            </button>
          )}
        </form>
      )}

      {q.type === 'fill' && q.hint && !checked && (
        <button className="hint-btn" onClick={() => setReveal((r) => !r)}>
          {reveal ? '🙈 hide hint' : '💡 hint'}
        </button>
      )}
      {reveal && q.hint && <p className="hint-text">{q.hint}</p>}

      {checked && (
        <div className={'feedback ' + (correct ? 'ok' : 'no')}>
          <strong>{correct ? '¡Muy bien! 🌷' : 'Not quite.'}</strong>{' '}
          {!correct && (
            <>
              Answer:{' '}
              <span className="spanish">
                {Array.isArray(q.answer) ? q.answer[0] : q.answer}
              </span>
              .{' '}
            </>
          )}
          {q.explanation}
          {!correct && (
            <button
              className="hint-btn"
              onClick={() => {
                setChecked(false)
                setValue('')
              }}
            >
              ↺ try again
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function QuizQuestion({
  q,
  index,
  value,
  onChange,
}: {
  q: Question
  index: number
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="card question">
      <div className="q-head">
        <span className="q-num">{index}</span>
        <p className="q-prompt">{q.prompt}</p>
      </div>
      {q.type === 'choice' ? (
        <div className="choices">
          {q.options!.map((opt) => (
            <button
              key={opt}
              className={'choice' + (value === opt ? ' selected' : '')}
              onClick={() => onChange(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <input
          className="text-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your answer…"
        />
      )}
    </div>
  )
}

function Results({
  lesson,
  score,
  award,
  answers,
  onRetry,
  onHome,
}: {
  lesson: Lesson
  score: number
  award: AwardOutcome
  answers: Record<string, string>
  onRetry: () => void
  onHome: () => void
}) {
  const total = lesson.quiz.length
  const pct = Math.round((score / total) * 100)

  return (
    <div className="stack">
      <div className={'result-hero ' + (award.passed ? 'pass' : 'fail')}>
        <div className="result-emoji">
          {award.perfect ? '🌟' : award.passed ? '🌸' : '🌱'}
        </div>
        <h2 style={{ margin: '0.2rem 0' }}>
          {award.perfect
            ? '¡Perfecto! A perfect bloom!'
            : award.passed
              ? '¡Bien hecho! Your garden grew!'
              : 'A gentle start'}
        </h2>
        <div className="result-score">
          {score} / {total} <span className="faint">({pct}%)</span>
        </div>

        {award.passed ? (
          <div className="award-row">
            <span className="pill pill-butter">🌱 +{award.seedsEarned} seeds</span>
            <span className="pill pill-sage">🌼 +{award.flowersBloomed} flowers</span>
            {award.fed && (
              <span className="pill pill-blush">
                {award.fed.emoji} fed {award.fed.name}
              </span>
            )}
          </div>
        ) : (
          <p className="muted" style={{ maxWidth: '44ch', margin: '0.6rem auto 0' }}>
            You need {Math.ceil(total * PASS_RATIO)}/{total} to grow the garden.
            Review the answers below and try again — every gardener starts here. 🤍
          </p>
        )}
      </div>

      {/* Review */}
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Review</h3>
        <div className="stack" style={{ gap: '0.7rem' }}>
          {lesson.quiz.map((q, i) => {
            const ok = isCorrect(answers[q.id] ?? '', q.answer)
            return (
              <div key={q.id} className={'review-item ' + (ok ? 'ok' : 'no')}>
                <span className="review-mark">{ok ? '✓' : '✗'}</span>
                <div>
                  <div style={{ fontWeight: 700 }}>
                    {i + 1}. {q.prompt}
                  </div>
                  <div className="muted">
                    Your answer: <em>{answers[q.id] || '—'}</em>
                    {!ok && (
                      <>
                        {' '}· Correct:{' '}
                        <span className="spanish">
                          {Array.isArray(q.answer) ? q.answer[0] : q.answer}
                        </span>
                      </>
                    )}
                  </div>
                  {q.explanation && <div className="faint">{q.explanation}</div>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="row">
        <button className="btn btn-ghost" onClick={onRetry}>
          ↺ Retake quiz
        </button>
        <button className="btn btn-sage" onClick={onHome}>
          Visit my garden 🌿
        </button>
        <Link className="btn" to="/lessons">
          Next lesson →
        </Link>
      </div>
    </div>
  )
}

const styles = `
.lesson-intro { font-size: 1.12rem; line-height: 1.7; color: var(--ink-soft); }
.stepper { display: flex; gap: 0.5rem; margin: 1.2rem 0 1.6rem; flex-wrap: wrap; }
.step { display: flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.8rem; border-radius: 999px; background: var(--surface); border: 1px solid var(--line-soft); font-weight: 700; font-size: 0.85rem; color: var(--ink-faint); }
.step.active { background: var(--sage-soft); color: var(--sage-deep); border-color: transparent; }
.step.done { color: var(--sage-deep); }
.step-dot { display: inline-grid; place-items: center; width: 20px; height: 20px; border-radius: 999px; background: var(--parchment-deep); color: var(--ink-soft); font-size: 0.75rem; }
.step.active .step-dot { background: var(--sage-deep); color: #fff; }

.examples { display: grid; gap: 0.7rem; margin-top: 1rem; }
.example { display: flex; gap: 0.7rem; align-items: flex-start; padding: 0.8rem 1rem; background: var(--parchment); border-radius: var(--radius-sm); }
.example-speak, .example-emoji { background: none; border: none; font-size: 1.1rem; padding: 0; margin-top: 2px; opacity: 0.8; }
.example-speak:hover { opacity: 1; transform: scale(1.15); }
.example-en { font-size: 0.95rem; }
.example-note { font-size: 0.8rem; color: var(--sage-deep); font-weight: 700; margin-top: 0.15rem; }
.audio-block { background: var(--lavender-soft); border-radius: var(--radius-sm); padding: 1rem; margin: 0.6rem 0; }

.question { }
.q-head { display: flex; gap: 0.7rem; align-items: baseline; }
.q-num { display: inline-grid; place-items: center; min-width: 26px; height: 26px; border-radius: 999px; background: var(--butter); color: var(--terracotta-deep); font-weight: 800; font-size: 0.85rem; }
.q-prompt { font-weight: 700; font-size: 1.05rem; margin: 0 0 0.4rem; }
.choices { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 0.4rem; }
.choice { padding: 0.6rem 1.1rem; border-radius: 999px; border: 1.5px solid var(--line); background: var(--surface); font-weight: 700; color: var(--ink-soft); transition: all 0.15s; }
.choice:hover:not(:disabled) { border-color: var(--sage); background: var(--parchment); }
.choice.selected { border-color: var(--sage-deep); background: var(--sage-soft); color: var(--sage-deep); }
.choice.correct { border-color: var(--sage-deep); background: #dce6c8; color: var(--sage-deep); }
.choice.wrong { border-color: var(--rose); background: var(--blush-soft); color: var(--rose); }
.choice:disabled { cursor: default; }
.fill { display: flex; gap: 0.6rem; margin-top: 0.4rem; flex-wrap: wrap; }
.text-input { flex: 1; min-width: 200px; padding: 0.7rem 1rem; border-radius: 999px; border: 1.5px solid var(--line); background: var(--surface); font-family: var(--font-body); font-size: 1rem; color: var(--ink); }
.text-input:focus { outline: none; border-color: var(--sage); box-shadow: 0 0 0 3px var(--sage-soft); }
.hint-btn { background: none; border: none; color: var(--terracotta-deep); font-weight: 700; font-size: 0.85rem; cursor: pointer; padding: 0.3rem 0; margin-left: 0.4rem; }
.hint-text { color: var(--ink-faint); font-style: italic; margin: 0.3rem 0 0; }
.feedback { margin-top: 0.8rem; padding: 0.8rem 1rem; border-radius: var(--radius-sm); font-size: 0.98rem; }
.feedback.ok { background: #e4eed3; color: var(--sage-deep); }
.feedback.no { background: var(--blush-soft); color: #8a4a44; }

.result-hero { text-align: center; padding: 2rem 1.4rem; border-radius: var(--radius-lg); border: 1px solid var(--line-soft); box-shadow: var(--shadow-soft); }
.result-hero.pass { background: linear-gradient(160deg, #dde8c1, #f1ecca); }
.result-hero.fail { background: linear-gradient(160deg, #ecd8d2, #f1ecca); }
.result-emoji { font-size: 3.2rem; }
.result-score { font-family: var(--font-display); font-size: 2.4rem; font-weight: 700; color: var(--ink); }
.award-row { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin-top: 0.8rem; }
.review-item { display: flex; gap: 0.7rem; padding: 0.7rem 0.9rem; border-radius: var(--radius-sm); background: var(--parchment); }
.review-item.no { background: var(--blush-soft); }
.review-mark { font-weight: 800; }
.review-item.ok .review-mark { color: var(--sage-deep); }
.review-item.no .review-mark { color: var(--rose); }
`
