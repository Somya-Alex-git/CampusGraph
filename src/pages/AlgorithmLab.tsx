import { useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Topbar } from '../components/Topbar'

const tabs = {
  prim: {
    title: 'PRIM\'S',
    purpose: 'Find Minimum Spanning Tree.',
    how: 'Start from one vertex and repeatedly add the cheapest edge that connects a visited node to an unvisited node.',
    complexity: 'Time: O(E log V) for priority queue implementation. Space: O(V + E).',
    pseudocode: `Prim(G, start):
  visited = {start}
  priorityQueue = all edges from start
  while priorityQueue not empty:
    edge = minimum weight edge
    if edge connects to unvisited node:
      add edge to MST
      visited.add(newNode)
      push adjacent edges`
  },
  kruskal: {
    title: 'KRUSKAL\'S',
    purpose: 'Find Minimum Spanning Tree.',
    how: 'Sort all edges by weight and add the smallest edge that does not create a cycle.',
    complexity: 'Time: O(E log E). Space: O(V + E).',
    pseudocode: `Kruskal(G):
  sort edges by weight
  DSU.initialize(vertices)
  for edge in sortedEdges:
    if union(u, v) succeeds:
      add edge to MST
    if |MST| == V - 1:
      break`
  },
  floyd: {
    title: 'FLOYD-WARSHALL',
    purpose: 'Find shortest paths between every pair of vertices.',
    how: 'Use dynamic programming to relax paths through intermediate vertices.',
    complexity: 'Time: O(V³). Space: O(V²).',
    pseudocode: `FloydWarshall(G):
  dist[i][j] = w(i, j)
  for k in vertices:
    for i in vertices:
      for j in vertices:
        dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`
  }
}

export default function AlgorithmLab() {
  const [activeTab, setActiveTab] = useState<'prim' | 'kruskal' | 'floyd'>('prim')
  const selectedTab = tabs[activeTab]

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="content-panel">
        <Topbar title="Algorithm Lab" description="Interactive explanations of the core DAA graph algorithms behind CampusGraph." />

        <section className="panel-card padded">
          <div className="tab-row">
            {Object.entries(tabs).map(([key, tab]) => (
              <button
                key={key}
                type="button"
                className={`tab-button ${activeTab === key ? 'selected' : ''}`}
                onClick={() => setActiveTab(key as 'prim' | 'kruskal' | 'floyd')}
              >
                {tab.title}
              </button>
            ))}
          </div>

          <div className="lab-content">
            <div className="lab-info">
              <h3>{selectedTab.title}</h3>
              <p><strong>Purpose:</strong> {selectedTab.purpose}</p>
              <p><strong>How it works:</strong> {selectedTab.how}</p>
              <p><strong>Complexity:</strong> {selectedTab.complexity}</p>
              <pre>{selectedTab.pseudocode}</pre>
            </div>
            <div className="lab-visual">
              <div className="visual-surface">
                <div className="pulse-node node-a">A</div>
                <div className="pulse-node node-b">B</div>
                <div className="pulse-node node-c">C</div>
                <div className="pulse-node node-d">D</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
