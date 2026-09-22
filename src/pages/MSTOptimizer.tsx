import { useMemo, useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Topbar } from '../components/Topbar'
import { CampusGraph } from '../components/CampusGraph'
import { StepViewer } from '../components/StepViewer'
import { campusGraph } from '../data/campusGraph'
import { primMST } from '../algorithms/prim'
import { kruskalMST } from '../algorithms/kruskal'

export default function MSTOptimizer() {
  const [algorithm, setAlgorithm] = useState<'prim' | 'kruskal'>('prim')
  const [startNodeId, setStartNodeId] = useState('main-gate')

  const mstResult = useMemo(() => {
    if (algorithm === 'prim') {
      return primMST(campusGraph, startNodeId)
    }

    return kruskalMST(campusGraph)
  }, [algorithm, startNodeId])

  const selectedEdgeIds = new Set(mstResult.edges.map((edge) => edge.id))
  const steps = mstResult.steps.map((step) => ({
    description: step.description,
    selectedEdge: step.selectedEdge
  }))
  const connectedNodeCount =
    algorithm === 'prim'
      ? (mstResult as { visitedNodes?: string[] }).visitedNodes?.length ?? campusGraph.nodes.length
      : campusGraph.nodes.length

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="content-panel">
        <Topbar title="Minimum Spanning Tree Optimizer" description="Compare Prim's and Kruskal's algorithms for constructing a minimum-cost campus network." />

        <section className="panel-card padded">
          <div className="controls-row">
            <label>
              <span>Algorithm</span>
              <select value={algorithm} onChange={(event) => setAlgorithm(event.target.value as 'prim' | 'kruskal')}>
                <option value="prim">Prim's</option>
                <option value="kruskal">Kruskal's</option>
              </select>
            </label>

            {algorithm === 'prim' ? (
              <label>
                <span>Start Node</span>
                <select value={startNodeId} onChange={(event) => setStartNodeId(event.target.value)}>
                  {campusGraph.nodes.map((node) => (
                    <option key={node.id} value={node.id}>{node.name}</option>
                  ))}
                </select>
              </label>
            ) : null}

            <button type="button" className="primary-button">Generate MST</button>
          </div>

          <div className="metrics-row">
            <div className="metric-box">
              <span>Total Network Cost</span>
              <strong>{mstResult.totalWeight}</strong>
            </div>
            <div className="metric-box">
              <span>Edges Selected</span>
              <strong>{mstResult.edges.length}</strong>
            </div>
            <div className="metric-box">
              <span>Nodes Connected</span>
              <strong>{connectedNodeCount}</strong>
            </div>
          </div>

          <CampusGraph
            nodes={campusGraph.nodes}
            edges={campusGraph.edges}
            mstEdges={selectedEdgeIds}
            startId={startNodeId}
            destinationId={campusGraph.nodes[0]?.id}
            dimmed
          />

          <StepViewer title="Execution Steps" steps={steps} activeStep={Math.max(steps.length - 1, 0)} />
        </section>
      </main>
    </div>
  )
}
