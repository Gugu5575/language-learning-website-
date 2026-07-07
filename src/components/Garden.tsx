import { useGarden } from '../state/garden'
import './garden.css'

const FLOWER_GLYPHS = ['🌷', '🌸', '🌼', '🌻', '🏵️', '💐', '🌹']

/** A cozy meadow that fills with blooms as you pass quizzes. */
export default function Garden() {
  const { flowers, animals } = useGarden()

  // Show up to a tidy meadow of blooms; each real flower is one glyph.
  const shown = Math.min(flowers, 36)
  const blooms = Array.from({ length: shown }, (_, i) => FLOWER_GLYPHS[i % FLOWER_GLYPHS.length])

  return (
    <div className="meadow" role="img" aria-label={`A garden with ${flowers} flowers`}>
      <div className="meadow-sky">
        <span className="sun">☀️</span>
        <span className="cloud cloud-1">☁️</span>
        <span className="cloud cloud-2">☁️</span>
        <span className="butterfly">🦋</span>
      </div>

      <div className="meadow-ground">
        {shown === 0 ? (
          <p className="meadow-empty">
            Your meadow is bare soil for now — pass a daily quiz to plant your
            first blooms. 🌱
          </p>
        ) : (
          <div className="blooms">
            {blooms.map((b, i) => (
              <span
                key={i}
                className="bloom"
                style={{ animationDelay: `${(i % 8) * 0.12}s` }}
              >
                {b}
              </span>
            ))}
          </div>
        )}

        <div className="critters">
          {animals.map((a) => (
            <div key={a.id} className="critter" title={`${a.name} — ${a.happiness}% happy`}>
              <span
                className="critter-emoji"
                style={{
                  filter: a.happiness < 20 ? 'grayscale(0.6) opacity(0.75)' : 'none',
                }}
              >
                {a.emoji}
              </span>
              <span className="critter-name">{a.name}</span>
              <span className="critter-bar">
                <span style={{ width: `${a.happiness}%` }} />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* A lily pond, where the ducks glide */}
      <div className="pond" aria-hidden="true">
        <span className="lily lily-1">🪷</span>
        <span className="lily-pad pad-1" />
        <span className="lily-pad pad-2" />
        <span className="lily-pad pad-3" />
        <span className="pond-duck duck-1">🦆</span>
        <span className="pond-duck duck-2">🦆</span>
        <span className="sparkle sparkle-1">✦</span>
        <span className="sparkle sparkle-2">✦</span>
        <span className="sparkle sparkle-3">✦</span>
      </div>
    </div>
  )
}
