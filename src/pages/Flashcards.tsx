export default function Flashcards() {
  return (
    <div className="page">
      <ComingSoon
        emoji="🃏"
        title="Instant Flashcards"
        blurb="Everyday Spanish words, each with a real usage example, ready to flip whenever you have a spare minute."
        planned={[
          'A fresh set of daily-use words',
          'A sentence showing each word in context',
          'Tap to flip, swipe to keep going',
          'Words you miss come back around',
        ]}
        next="This is Feature 2 — up next after the daily lesson."
      />
    </div>
  )
}

export function ComingSoon({
  emoji,
  title,
  blurb,
  planned,
  next,
}: {
  emoji: string
  title: string
  blurb: string
  planned: string[]
  next: string
}) {
  return (
    <div className="coming-soon">
      <div className="cs-emoji">{emoji}</div>
      <span className="eyebrow">Coming soon to the garden</span>
      <h1>{title}</h1>
      <p className="muted" style={{ maxWidth: '52ch', margin: '0 auto 1.4rem' }}>
        {blurb}
      </p>
      <div className="card cs-card">
        <h3 style={{ marginTop: 0 }}>What it will do</h3>
        <ul className="cs-list">
          {planned.map((p) => (
            <li key={p}>🌷 {p}</li>
          ))}
        </ul>
        <p className="faint" style={{ marginBottom: 0 }}>
          {next}
        </p>
      </div>
      <style>{`
        .coming-soon { text-align: center; padding-top: 1rem; }
        .cs-emoji { font-size: 3.4rem; }
        .cs-card { max-width: 460px; margin: 0 auto; text-align: left; }
        .cs-list { list-style: none; padding: 0; margin: 0 0 1rem; display: grid; gap: 0.5rem; }
        .cs-list li { font-weight: 600; color: var(--ink-soft); }
      `}</style>
    </div>
  )
}
