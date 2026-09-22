import type { ReactNode } from 'react'

interface AlgorithmCardProps {
  title: string
  purpose: string
  category: string
  time: string
  space: string
  icon: ReactNode
}

export function AlgorithmCard({ title, purpose, category, time, space, icon }: AlgorithmCardProps) {
  return (
    <div className="algorithm-card">
      <div className="algorithm-card-header">
        <div className="small-icon">{icon}</div>
        <div>
          <h3>{title}</h3>
        </div>
      </div>
      <p>{purpose}</p>
      <div className="algorithm-meta">
        <span>{category}</span>
        <span>{time}</span>
        <span>{space}</span>
      </div>
    </div>
  )
}
