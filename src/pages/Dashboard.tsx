import { ArrowRight, BarChart3, Blocks, Route, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CampusGraph } from '../components/CampusGraph'
import { Sidebar } from '../components/Sidebar'
import { StatCard } from '../components/StatCard'
import { Topbar } from '../components/Topbar'
import { AlgorithmCard } from '../components/AlgorithmCard'
import { campusGraph } from '../data/campusGraph'

const stats = [
  { label: 'Total Locations', value: String(campusGraph.nodes.length), icon: Blocks, detail: 'Campus nodes' },
  { label: 'Total Connections', value: String(campusGraph.edges.length), icon: Route, detail: 'Road segments' },
  { label: 'Network Cost', value: `${campusGraph.edges.reduce((sum, edge) => sum + edge.weight, 0)} units`, icon: BarChart3, detail: 'MST total' },
  { label: 'Average Distance', value: `${Math.round(campusGraph.edges.reduce((sum, edge) => sum + edge.weight, 0) / campusGraph.edges.length)} units`, icon: Sparkles, detail: 'Per edge' }
]

const algorithmCards = [
  {
    title: 'Prim\'s Algorithm',
    purpose: 'Finds the minimum spanning tree by growing from a root node.',
    category: 'MST',
    time: 'O(E log V)',
    space: 'O(V + E)'
  },
  {
    title: 'Kruskal\'s Algorithm',
    purpose: 'Builds the MST by selecting the lowest-weight edge without cycles.',
    category: 'MST',
    time: 'O(E log E)',
    space: 'O(V + E)'
  },
  {
    title: 'Floyd-Warshall',
    purpose: 'Computes all-pairs shortest paths with dynamic programming.',
    category: 'Shortest Path',
    time: 'O(V³)',
    space: 'O(V²)'
  }
]

export default function Dashboard() {
  const routePath = ['main-gate', 'administration', 'academic', 'library', 'cs-block']

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="content-panel">
        <Topbar title="CampusGraph" description="Intelligent Campus Navigation & Network Optimization" />

        <section className="hero-panel">
          <div>
            <p className="eyebrow">Navigate Smarter. Optimize Better.</p>
            <h2>An interactive graph-algorithm platform for campus navigation and network optimization.</h2>
            <p className="hero-subtitle">
              Explore optimal campus routes, construct minimum-cost networks, and visualize classical graph algorithms interactively.
            </p>
            <div className="hero-actions">
              <Link to="/navigation" className="primary-button">Explore Campus</Link>
              <Link to="/lab" className="secondary-button">Open Algorithm Lab</Link>
            </div>
          </div>

          <div className="hero-visual">
            <CampusGraph nodes={campusGraph.nodes} edges={campusGraph.edges} startId="main-gate" destinationId="cs-block" routePath={routePath} dimmed />
          </div>
        </section>

        <section className="stats-grid">
          {stats.map((item) => (
            <StatCard key={item.label} label={item.label} value={item.value} icon={item.icon} detail={item.detail} />
          ))}
        </section>

        <section className="feature-grid">
          <div className="feature-card large">
            <div className="section-line"><span>Campus Network Overview</span></div>
            <CampusGraph nodes={campusGraph.nodes} edges={campusGraph.edges} startId="main-gate" destinationId="library" routePath={['main-gate', 'administration', 'academic', 'library']} dimmed />
          </div>
          <div className="feature-card mini">
            <div className="section-line"><span>Shortest Path</span></div>
            <p>Find the most efficient route between two campus locations.</p>
            <button className="small-button" type="button">View Route</button>
          </div>
          <div className="feature-card mini">
            <div className="section-line"><span>Minimum Spanning Tree</span></div>
            <p>Optimize the network backbone and reduce infrastructure cost.</p>
            <button className="small-button" type="button">Optimize</button>
          </div>
          <div className="feature-card mini">
            <div className="section-line"><span>Algorithm Lab</span></div>
            <p>Inspect the inner workings of classic graph algorithms.</p>
            <button className="small-button" type="button">Run Lab</button>
          </div>
        </section>

        <section className="algorithms-panel">
          <div className="section-header">
            <h3>Algorithms Available</h3>
            <span className="section-link">DAA Foundation</span>
          </div>
          <div className="algorithm-grid">
            {algorithmCards.map((item) => (
              <AlgorithmCard
                key={item.title}
                title={item.title}
                purpose={item.purpose}
                category={item.category}
                time={item.time}
                space={item.space}
                icon={<ArrowRight size={18} />}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
