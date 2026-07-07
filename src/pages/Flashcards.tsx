import { useEffect, useMemo, useState, useCallback } from 'react'
import {
  CATEGORIES,
  POS_LABEL,
  getDailySet,
  getByCategory,
  type CategoryId,
  type Flashcard,
} from '../data/flashcards'
import './flashcards.css'

type DeckId = 'daily' | CategoryId
type Mark = 'known' | 'review'

function speak(text: string) {
  if (!('speechSynthesis' in window)) return
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'es-ES'
  u.rate = 0.9
  speechSynthesis.cancel()
  speechSynthesis.speak(u)
}

function buildDeck(deck: DeckId): Flashcard[] {
  return deck === 'daily' ? getDailySet(8) : getByCategory(deck)
}

export default function Flashcards() {
  const [deck, setDeck] = useState<DeckId>('daily')
  const [queue, setQueue] = useState<Flashcard[]>(() => buildDeck('daily'))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [marks, setMarks] = useState<Record<string, Mark>>({})

  const total = queue.length
  const done = index >= total
  const card = done ? null : queue[index]

  const startDeck = useCallback((d: DeckId) => {
    setDeck(d)
    setQueue(buildDeck(d))
    setIndex(0)
    setFlipped(false)
    setMarks({})
  }, [])

  const go = useCallback(
    (dir: 1 | -1) => {
      setFlipped(false)
      setIndex((i) => Math.min(Math.max(i + dir, 0), total))
    },
    [total],
  )

  const mark = useCallback(
    (m: Mark) => {
      if (!card) return
      setMarks((prev) => ({ ...prev, [card.id]: m }))
      // Words you're still learning come back around at the end of the deck.
      if (m === 'review') {
        setQueue((q) => [...q, card])
      }
      setFlipped(false)
      setIndex((i) => i + 1)
    },
    [card],
  )

  // Keyboard: space/enter flip, arrows navigate.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (done) return
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault()
        setFlipped((f) => !f)
      } else if (e.code === 'ArrowRight') {
        go(1)
      } else if (e.code === 'ArrowLeft') {
        go(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [done, go])

  const knownCount = useMemo(
    () => Object.values(marks).filter((m) => m === 'known').length,
    [marks],
  )
  const reviewCount = useMemo(
    () => Object.values(marks).filter((m) => m === 'review').length,
    [marks],
  )

  const progress = total > 0 ? Math.round((Math.min(index, total) / total) * 100) : 0

  return (
    <div className="page">
      <span className="eyebrow">Instant Flashcards</span>
      <h1>A handful of everyday words</h1>
      <p className="muted" style={{ maxWidth: '54ch' }}>
        Flip each card to reveal the meaning and a real sentence that uses it.
        Tap 🔊 to hear it, then tell the card whether it stuck. Words you’re
        still learning quietly come back around.
      </p>

      {/* Deck picker */}
      <div className="deck-picker">
        <button
          className={'deck-chip' + (deck === 'daily' ? ' active' : '')}
          onClick={() => startDeck('daily')}
        >
          🌞 Today’s words
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={'deck-chip' + (deck === c.id ? ' active' : '')}
            onClick={() => startDeck(c.id)}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {!done && card ? (
        <>
          {/* Progress */}
          <div className="fc-progress">
            <div className="bar" style={{ flex: 1 }}>
              <span style={{ width: `${progress}%` }} />
            </div>
            <span className="faint fc-count">
              {Math.min(index + 1, total)} / {total}
            </span>
          </div>

          {/* Card */}
          <div className={'flashcard' + (flipped ? ' flipped' : '')}>
            <div className="flashcard-inner" onClick={() => setFlipped((f) => !f)}>
              {/* Front */}
              <div className="flashcard-face front">
                <span className="fc-emoji">{card.emoji}</span>
                <span className="pill pill-sage fc-pos">{POS_LABEL[card.pos]}</span>
                <div className="fc-word">
                  {card.article && <span className="fc-article">{card.article} </span>}
                  {card.word}
                </div>
                <button
                  className="fc-speak"
                  onClick={(e) => {
                    e.stopPropagation()
                    speak(card.article ? `${card.article} ${card.word}` : card.word)
                  }}
                  aria-label="Listen to the word"
                >
                  🔊
                </button>
                <span className="fc-hint faint">tap to flip · space</span>
              </div>

              {/* Back */}
              <div className="flashcard-face back">
                <div className="fc-translation">{card.translation}</div>
                <hr className="divider" style={{ width: '60%' }} />
                <div className="fc-example-block">
                  <button
                    className="fc-speak inline"
                    onClick={(e) => {
                      e.stopPropagation()
                      speak(card.example)
                    }}
                    aria-label="Listen to the example"
                  >
                    🔊
                  </button>
                  <div>
                    <p className="spanish fc-example">{card.example}</p>
                    <p className="muted fc-example-en">{card.exampleEn}</p>
                  </div>
                </div>
                <span className="fc-hint faint">tap to flip back</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="fc-controls">
            <button className="btn btn-ghost btn-sm" onClick={() => go(-1)} disabled={index === 0}>
              ← Prev
            </button>
            <button className="btn btn-sm" onClick={() => setFlipped((f) => !f)}>
              ↻ Flip
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => go(1)}>
              Skip →
            </button>
          </div>

          {/* Self-assessment */}
          <div className="fc-mark">
            <button className="btn btn-ghost mark-review" onClick={() => mark('review')}>
              🌱 Still learning
            </button>
            <button className="btn btn-sage mark-known" onClick={() => mark('known')}>
              ✓ Got it
            </button>
          </div>
        </>
      ) : (
        <DoneCard
          knownCount={knownCount}
          reviewCount={reviewCount}
          total={new Set(queue.map((c) => c.id)).size}
          onRestart={() => startDeck(deck)}
        />
      )}

      <style>{`.fc-count{min-width:52px;text-align:right;font-weight:700}`}</style>
    </div>
  )
}

function DoneCard({
  knownCount,
  reviewCount,
  total,
  onRestart,
}: {
  knownCount: number
  reviewCount: number
  total: number
  onRestart: () => void
}) {
  const allKnown = reviewCount === 0
  return (
    <div className="card fc-done">
      <div className="fc-done-emoji">{allKnown ? '🌻' : '🌿'}</div>
      <h2 style={{ margin: '0.3rem 0' }}>
        {allKnown ? '¡Fantástico! You knew them all.' : 'Nicely done — that’s a set!'}
      </h2>
      <p className="muted">
        You reviewed <strong>{total}</strong> {total === 1 ? 'word' : 'words'}.
      </p>
      <div className="row" style={{ justifyContent: 'center' }}>
        <span className="pill pill-sage">✓ {knownCount} got it</span>
        {reviewCount > 0 && <span className="pill pill-blush">🌱 {reviewCount} to revisit</span>}
      </div>
      <div className="row" style={{ justifyContent: 'center', marginTop: '1.2rem' }}>
        <button className="btn btn-sage" onClick={onRestart}>
          ↺ Go through again
        </button>
      </div>
    </div>
  )
}
