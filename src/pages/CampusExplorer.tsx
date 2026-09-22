import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Topbar } from '../components/Topbar'
import { campusGraph } from '../data/campusGraph'

export default function CampusExplorer() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')

  const filteredLocations = useMemo(() => {
    return campusGraph.nodes.filter((node) => {
      const matchesSearch = node.name.toLowerCase().includes(search.toLowerCase())
      const matchesType = typeFilter === 'All' || node.type === typeFilter
      return matchesSearch && matchesType
    })
  }, [search, typeFilter])

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="content-panel">
        <Topbar title="Campus Explorer" description="Browse every campus location and understand how the graph is structured." />

        <section className="panel-card padded">
          <div className="explorer-controls">
            <div className="search-box broad">
              <Search size={16} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search buildings..."
              />
            </div>

            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
              <option value="All">All Types</option>
              {Array.from(new Set(campusGraph.nodes.map((node) => node.type))).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="explorer-grid">
            {filteredLocations.map((node) => {
              const connected = campusGraph.edges.filter(
                (edge) => edge.from === node.id || edge.to === node.id
              )

              return (
                <article key={node.id} className="explorer-card">
                  <div className="explorer-card-head">
                    <h3>{node.name}</h3>
                    <span>{node.type}</span>
                  </div>
                  <p>{node.description}</p>
                  <div className="explorer-meta">
                    <span>Connected: {connected.length}</span>
                    <span>Coordinates: {node.coordinates.join(', ')}</span>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
