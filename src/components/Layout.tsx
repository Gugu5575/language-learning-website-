import type { ReactNode } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useGarden } from '../state/garden'

const links = [
  { to: '/', label: 'Garden', end: true },
  { to: '/lessons', label: 'Daily Lesson' },
  { to: '/flashcards', label: 'Flashcards' },
  { to: '/wilson', label: 'Wilson' },
  { to: '/evaluator', label: 'Evaluator' },
]

export default function Layout({ children }: { children: ReactNode }) {
  const { seeds } = useGarden()

  return (
    <div className="app-shell">
      <header className="nav">
        <div className="nav-inner">
          <Link to="/" className="brand">
            <span className="brand-mark">🌸</span>
            Florecer
          </Link>
          <nav className="nav-links">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' active' : '')
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <span className="nav-seed" title="Seeds earned from passing quizzes">
            🌱 {seeds}
          </span>
        </div>
      </header>

      <main className="container">{children}</main>

      <footer className="footer">
        <div className="brand-mark">🌿</div>
        <p>
          Florecer · <em>to bloom, to flourish</em> — study a little each day and
          watch your garden grow.
        </p>
      </footer>
    </div>
  )
}
