import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  icon: LucideIcon
  detail: string
}

export function StatCard({ label, value, icon: Icon, detail }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <Icon size={18} />
      </div>
      <div>
        <p>{label}</p>
        <h3>{value}</h3>
      </div>
      <span>{detail}</span>
    </div>
  )
}
