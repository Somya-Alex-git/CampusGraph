import { Activity, Bell, Search } from 'lucide-react'

interface TopbarProps {
  title: string
  description: string
}

export function Topbar({ title, description }: TopbarProps) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">CampusGraph</p>
        <h1>{title}</h1>
        <p className="subtitle">{description}</p>
      </div>

      <div className="topbar-actions">
        <div className="search-box">
          <Search size={16} />
          <span>System Ready</span>
        </div>
        <div className="status-pill">
          <Activity size={14} />
          Graph Ready
        </div>
        <button className="icon-button" type="button" aria-label="Notifications">
          <Bell size={16} />
        </button>
      </div>
    </header>
  )
}
