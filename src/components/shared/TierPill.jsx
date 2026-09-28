import React from 'react'
import { getScoreTier } from '../../lib/scoreTiers'

// Small inline pill for table rows — tier label only, no number.
export default function TierPill({ score, className = '' }) {
  const tier = getScoreTier(score)
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${tier.bgColor} ${tier.textColor} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${tier.dotColor}`} />
      {tier.label}
    </span>
  )
}