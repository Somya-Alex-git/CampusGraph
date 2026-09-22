import { useMemo, useState } from 'react'
import { campusGraph, campusNodeMap } from '../data/campusGraph'
import { CampusGraph } from '../components/CampusGraph'
import { RoutePanel } from '../components/RoutePanel'
import { Sidebar } from '../components/Sidebar'
import { Topbar } from '../components/Topbar'
import { floydWarshall, reconstructShortestPath } from '../algorithms/floydWarshall'

export default function Navigation() {
  const [startId, setStartId] = useState('main-gate')
  const [destinationId, setDestinationId] = useState('cs-block')
  const [error, setError] = useState('')

  const result = useMemo(() => {
    if (!startId || !destinationId) {
      return { path: [], distance: Number.POSITIVE_INFINITY }
    }

    const matrix = floydWarshall(campusGraph)
    const reconstruction = reconstructShortestPath(matrix, startId, destinationId)

    return {
      path: reconstruction.pathIds,
      distance: reconstruction.distance
    }
  }, [startId, destinationId])

  const handleFindRoute = () => {
    if (!startId) {
      setError('Please choose a valid start location.')
      return
    }

    if (!destinationId) {
      setError('Please choose a valid destination.')
      return
    }

    if (startId === destinationId) {
      setError('Start and destination cannot be the same.')
      return
    }

    const path = result.path
    if (path.length === 0 || !Number.isFinite(result.distance)) {
      setError('No route is available between the selected locations.')
      return
    }

    setError('')
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="content-panel">
        <Topbar title="Campus Navigation" description="Find shortest routes across the optimized campus network." />

        <section className="panel-card padded">
          <div className="controls-row">
            <label>
              <span>Start Location</span>
              <select value={startId} onChange={(event) => setStartId(event.target.value)}>
                {campusGraph.nodes.map((node) => (
                  <option key={node.id} value={node.id}>{node.name}</option>
                ))}
              </select>
            </label>

            <label>
              <span>Destination</span>
              <select value={destinationId} onChange={(event) => setDestinationId(event.target.value)}>
                {campusGraph.nodes.map((node) => (
                  <option key={node.id} value={node.id}>{node.name}</option>
                ))}
              </select>
            </label>

            <button type="button" className="primary-button" onClick={handleFindRoute}>Find Route</button>
          </div>

          <div className="algorithm-selector">
            <span>Algorithm Selector</span>
            <strong>Floyd-Warshall</strong>
          </div>

          {error ? <div className="form-message error">{error}</div> : null}

          <CampusGraph
            nodes={campusGraph.nodes}
            edges={campusGraph.edges}
            startId={startId}
            destinationId={destinationId}
            routePath={result.path}
            dimmed
          />

          <RoutePanel
            route={result.path.map((id) => campusNodeMap.get(id)?.name ?? id)}
            distance={result.distance}
            startLabel={campusNodeMap.get(startId)?.name ?? 'Unknown'}
            destinationLabel={campusNodeMap.get(destinationId)?.name ?? 'Unknown'}
          />
        </section>
      </main>
    </div>
  )
}
