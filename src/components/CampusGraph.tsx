import type { CampusEdge, CampusNode } from '../data/campusGraph'

interface CampusGraphProps {
  nodes: CampusNode[]
  edges: CampusEdge[]
  startId?: string
  destinationId?: string
  routePath?: string[]
  mstEdges?: Set<string>
  selectedEdgeId?: string
  dimmed?: boolean
}

export function CampusGraph({
  nodes,
  edges,
  startId,
  destinationId,
  routePath = [],
  mstEdges = new Set(),
  selectedEdgeId,
  dimmed = false
}: CampusGraphProps) {
  const routeSet = new Set(routePath)

  return (
    <div className="graph-wrapper">
      <svg viewBox="0 0 900 520" className="campus-svg" role="img" aria-label="Campus map">
        {edges.map((edge) => {
          const fromNode = nodes.find((node) => node.id === edge.from)
          const toNode = nodes.find((node) => node.id === edge.to)

          if (!fromNode || !toNode) return null

          const isRouteEdge = routePath.includes(edge.from) && routePath.includes(edge.to)
          const isMstEdge = mstEdges.has(edge.id)
          const isSelected = selectedEdgeId === edge.id

          const opacity = dimmed && !isRouteEdge && !isMstEdge ? 0.18 : 1
          const stroke = isRouteEdge ? '#22c55e' : isMstEdge ? '#f59e0b' : isSelected ? '#ef4444' : '#9ca3af'
          const strokeWidth = isRouteEdge || isMstEdge ? 4 : 2

          return (
            <g key={edge.id}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={stroke}
                strokeWidth={strokeWidth}
                opacity={opacity}
                strokeDasharray={isSelected ? '6 5' : undefined}
              />
              <text
                x={(fromNode.x + toNode.x) / 2}
                y={(fromNode.y + toNode.y) / 2 - 5}
                textAnchor="middle"
                className="edge-label"
              >
                {edge.weight}
              </text>
            </g>
          )
        })}

        {nodes.map((node) => {
          const isStart = node.id === startId
          const isDestination = node.id === destinationId
          const isOnRoute = routeSet.has(node.id)

          return (
            <g key={node.id} className="graph-node-group">
              <circle
                cx={node.x}
                cy={node.y}
                r={isStart || isDestination ? 18 : 15}
                fill={isStart ? '#2563eb' : isDestination ? '#ef4444' : '#60a5fa'}
                stroke={isOnRoute ? '#16a34a' : '#dbeafe'}
                strokeWidth={isStart || isDestination ? 4 : 2}
                opacity={dimmed && !isStart && !isDestination && !isOnRoute ? 0.6 : 1}
              />
              <text x={node.x} y={node.y + 4} textAnchor="middle" className="node-label">
                {node.name}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
