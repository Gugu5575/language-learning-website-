import { ComingSoon } from './Flashcards'

export default function Conversation() {
  return (
    <div className="page">
      <ComingSoon
        emoji="🧑‍🌾"
        title="Talk with Wilson"
        blurb="Wilson is your friendly native speaker who lives in the garden. Chat about simple, cozy topics — and he’ll gently correct your Spanish as you go, right in the flow of conversation."
        planned={[
          'Natural back-and-forth about everyday topics',
          'Wilson replies like a patient native speaker',
          'Gentle, inline corrections of your mistakes',
          'Difficulty that grows with you',
        ]}
        next="This is Feature 3 — it needs a small AI backend (the Claude API), which we’ll wire up when we get here."
      />
    </div>
  )
}
