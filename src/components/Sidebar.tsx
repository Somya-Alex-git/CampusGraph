import { BarChart3, Compass, GitBranch, Map, Route, Sigma, Sparkles } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard', icon: BarChart3 },
  { to: '/navigation', label: 'Campus Navigation', icon: Route },
  { to: '/mst', label: 'MST Optimizer', icon: GitBranch },
  { to: '/lab', label: 'Algorithm Lab', icon: Sigma },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/explorer', label: 'Campus Explorer', icon: Map },
  { to: '/about', label: 'About Algorithms', icon: Sparkles }
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand-box">
        <div className="brand-mark">
          <Compass size={20} />
        </div>
        <div>
          <div className="brand-title">CampusGraph</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">DAA Project • Graph Algorithms</div>
    </aside>
  )
}
