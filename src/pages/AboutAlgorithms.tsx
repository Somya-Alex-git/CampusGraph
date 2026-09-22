import { Sidebar } from '../components/Sidebar'
import { Topbar } from '../components/Topbar'

const conceptCards = [
  {
    title: 'Graph',
    description: 'A graph is a mathematical structure used to model relationships between entities through vertices and edges.'
  },
  {
    title: 'Vertex',
    description: 'A vertex represents a node or location in the network, such as a building or a campus facility.'
  },
  {
    title: 'Edge',
    description: 'An edge represents a connection between two vertices, often annotated with a weight such as distance or cost.'
  },
  {
    title: 'Weighted Graph',
    description: 'A weighted graph assigns a numeric weight to every edge to reflect cost, distance, time, or capacity.'
  },
  {
    title: 'Minimum Spanning Tree',
    description: 'An MST connects all vertices with the minimum possible total edge weight without forming cycles.'
  },
  {
    title: 'Shortest Path',
    description: 'The shortest path is the route between two vertices with the least aggregate cost or distance.'
  }
]

export default function AboutAlgorithms() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="content-panel">
        <Topbar title="About Algorithms" description="A conceptual overview of the graph-theoretic ideas behind CampusGraph." />

        <section className="panel-card padded">
          <div className="concept-grid">
            {conceptCards.map((item) => (
              <div key={item.title} className="concept-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel-card padded">
          <h3>Prim's Algorithm</h3>
          <ul className="insight-list">
            <li><strong>Problem solved:</strong> Minimum spanning tree construction.</li>
            <li><strong>Idea:</strong> Grow a tree from a starting vertex by repeatedly choosing the cheapest connecting edge.</li>
            <li><strong>Time complexity:</strong> O(E log V)</li>
            <li><strong>Space complexity:</strong> O(V + E)</li>
            <li><strong>Use case:</strong> Network optimization and infrastructure design.</li>
          </ul>
        </section>

        <section className="panel-card padded">
          <h3>Kruskal's Algorithm</h3>
          <ul className="insight-list">
            <li><strong>Problem solved:</strong> Minimum spanning tree construction.</li>
            <li><strong>Idea:</strong> Sort edges by weight and select those that do not create a cycle.</li>
            <li><strong>Time complexity:</strong> O(E log E)</li>
            <li><strong>Space complexity:</strong> O(V + E)</li>
            <li><strong>Use case:</strong> Reliable campus network expansion and economic connectivity.</li>
          </ul>
        </section>

        <section className="panel-card padded">
          <h3>Floyd-Warshall Algorithm</h3>
          <ul className="insight-list">
            <li><strong>Problem solved:</strong> All-pairs shortest path computation.</li>
            <li><strong>Idea:</strong> Use dynamic programming to update shortest distances via intermediate vertices.</li>
            <li><strong>Time complexity:</strong> O(V³)</li>
            <li><strong>Space complexity:</strong> O(V²)</li>
            <li><strong>Use case:</strong> Multi-route planning and route matrix generation in large networks.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
