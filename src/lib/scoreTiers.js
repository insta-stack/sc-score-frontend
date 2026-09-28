// Client-side score bands. Backend (score_service.py) returns a raw
// 0-900 credibility_score (base 750 = no history yet) — no tier
// concept exists server-side. These bands are a frontend decision.
export const SCORE_MIN = 0
export const SCORE_MAX = 900

export const SCORE_TIERS = [
  { key: 'excellent', label: 'Excellent', min: 800, max: 900, textColor: 'text-emerald-700', bgColor: 'bg-emerald-100', dotColor: 'bg-emerald-500' },
  { key: 'good',      label: 'Good',      min: 700, max: 799, textColor: 'text-blue-700',    bgColor: 'bg-blue-100',    dotColor: 'bg-blue-500' },
  { key: 'fair',      label: 'Fair',      min: 550, max: 699, textColor: 'text-amber-700',   bgColor: 'bg-amber-100',   dotColor: 'bg-amber-500' },
  { key: 'poor',      label: 'Poor',      min: 350, max: 549, textColor: 'text-orange-700',  bgColor: 'bg-orange-100',  dotColor: 'bg-orange-500' },
  { key: 'high_risk', label: 'High Risk', min: 0,   max: 349, textColor: 'text-red-700',     bgColor: 'bg-red-100',     dotColor: 'bg-red-500' },
]

export function getScoreTier(score) {
  const s = Number(score)
  return SCORE_TIERS.find((t) => s >= t.min && s <= t.max) || SCORE_TIERS[SCORE_TIERS.length - 1]
}

export function getScorePercent(score) {
  const s = Math.max(SCORE_MIN, Math.min(SCORE_MAX, Number(score) || 0))
  return ((s - SCORE_MIN) / (SCORE_MAX - SCORE_MIN)) * 100
}