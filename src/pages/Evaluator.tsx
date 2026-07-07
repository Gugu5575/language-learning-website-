import { Link } from 'react-router-dom'
import { useGarden } from '../state/garden'
import { ComingSoon } from './Flashcards'

export default function Evaluator() {
  const { completedLessons } = useGarden()

  return (
    <div className="page">
      <ComingSoon
        emoji="📜"
        title="Progress Evaluator"
        blurb="A 10-question check-up drawn from the quizzes in the lessons you’ve completed — a gentle way to see how much you’ve bloomed and what to revisit."
        planned={[
          '10 questions, mixing multiple-choice and fill-ins',
          'Pulled from your own completed-lesson quizzes',
          'A friendly breakdown by skill',
          'Suggestions for what to plant next',
        ]}
        next="This is Feature 4 — it builds on your lesson history, so the more lessons you finish, the richer it gets."
      />
      <div className="center" style={{ marginTop: '1.4rem' }}>
        <p className="faint">
          So far you’ve completed <strong>{completedLessons.length}</strong>{' '}
          {completedLessons.length === 1 ? 'lesson' : 'lessons'}.{' '}
          <Link to="/lessons">Do more lessons</Link> to fill the evaluator’s question pool.
        </p>
      </div>
    </div>
  )
}
