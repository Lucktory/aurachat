export interface RelationshipLevel {
  level: number
  label: string
  icon: string
  color: string
  progress: number
  nextAt: number | null
  current: number
}

const thresholds = [0, 10, 30, 60, 100]
const levelData = [
  { label: 'Desconhecida',  icon: 'UserMinus', color: '#6B7280' },
  { label: 'Conhecida',     icon: 'User',      color: '#60A5FA' },
  { label: 'Amiga',         icon: 'Users',     color: '#34D399' },
  { label: 'Amiga Especial',icon: 'Heart',     color: '#F472B6' },
  { label: 'Alma Gêmea',   icon: 'Gem',       color: '#A855F7' },
]

export function getRelationshipLevel(count: number): RelationshipLevel {
  let idx = 0
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (count >= thresholds[i]) { idx = i; break }
  }
  const isMax = idx === thresholds.length - 1
  const from = thresholds[idx]
  const to = isMax ? null : thresholds[idx + 1]
  const progress = isMax ? 100 : ((count - from) / (to! - from)) * 100

  return {
    level: idx,
    ...levelData[idx],
    progress: Math.min(100, Math.max(0, progress)),
    nextAt: to,
    current: count,
  }
}
