import { BarChart, Bar, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Sidebar } from '../components/Sidebar'
import { Topbar } from '../components/Topbar'
import { campusGraph } from '../data/campusGraph'

const weightDistribution = campusGraph.edges.map((edge) => ({
  name: `${edge.from.slice(0, 3)}-${edge.to.slice(0, 3)}`,
  weight: edge.weight
}))

const algorithmComparison = [
  { name: 'Prim', problem: 'MST', time: 'O(E log V)', space: 'O(V + E)', result: 'Optimal spanning tree' },
  { name: 'Kruskal', problem: 'MST', time: 'O(E log E)', space: 'O(V + E)', result: 'Cycle-safe tree' },
  { name: 'Floyd-Warshall', problem: 'APSP', time: 'O(V³)', space: 'O(V²)', result: 'All-pair shortest paths' }
]

const costComparison = [
  { name: 'Prim', cost: 52 },
  { name: 'Kruskal', cost: 52 },
  { name: 'Floyd-Warshall', cost: 86 }
]

const routeDistances = [
  { name: 'Gate→Library', distance: 22 },
  { name: 'Gate→CS', distance: 30 },
  { name: 'Hostel→Research', distance: 41 },
  { name: 'Academic→Auditorium', distance: 30 }
]

export default function Analytics() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="content-panel">
        <Topbar title="Analytics" description="Insights into network cost, edge distribution, and algorithmic performance." />

        <section className="analytics-grid">
          <div className="chart-card wide">
            <h3>Edge Weight Distribution</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={weightDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="weight" fill="#60a5fa" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Algorithm Comparison</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={algorithmComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="time" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Network Cost Comparison</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={costComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cost" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card wide">
            <h3>Route Distance Comparison</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={routeDistances}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="distance" stroke="#22c55e" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel-card padded">
          <h3>Comparison Table</h3>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Algorithm</th>
                <th>Problem</th>
                <th>Time Complexity</th>
                <th>Space Complexity</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {algorithmComparison.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.problem}</td>
                  <td>{row.time}</td>
                  <td>{row.space}</td>
                  <td>{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="panel-card padded">
          <h3>Algorithm Insights</h3>
          <ul className="insight-list">
            <li>Prim's algorithm grows the MST from a starting vertex by greedily choosing the minimum-weight edge.</li>
            <li>Kruskal's algorithm repeatedly selects the lowest-weight edge while avoiding cycles through Union-Find.</li>
            <li>Floyd-Warshall computes shortest paths between all pairs of vertices using dynamic programming.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
