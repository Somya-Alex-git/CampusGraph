import type { CampusEdge, Graph } from '../data/campusGraph'

export interface PrimStep {
  selectedNode: string
  selectedEdge: CampusEdge | null
  edgeWeight: number | null
  currentMSTWeight: number
  description: string
}

export interface PrimResult {
  edges: CampusEdge[]
  totalWeight: number
  steps: PrimStep[]
  visitedNodes: string[]
  connected: boolean
}

export function primMST(graph: Graph, startNodeId: string): PrimResult {
  const visited = new Set<string>([startNodeId])
  const mstEdges: CampusEdge[] = []
  const steps: PrimStep[] = []
  let totalWeight = 0

  while (visited.size < graph.nodes.length) {
    let bestEdge: CampusEdge | null = null

    for (const edge of graph.edges) {
      const isFromVisited = visited.has(edge.from)
      const isToVisited = visited.has(edge.to)

      if ((isFromVisited && !isToVisited) || (!isFromVisited && isToVisited)) {
        if (!bestEdge || edge.weight < bestEdge.weight) {
          bestEdge = edge
        }
      }
    }

    if (!bestEdge) {
      break
    }

    const newNode = visited.has(bestEdge.from) ? bestEdge.to : bestEdge.from
    visited.add(newNode)
    mstEdges.push(bestEdge)
    totalWeight += bestEdge.weight

    steps.push({
      selectedNode: newNode,
      selectedEdge: bestEdge,
      edgeWeight: bestEdge.weight,
      currentMSTWeight: totalWeight,
      description: `Selected edge ${bestEdge.from} - ${bestEdge.to} with weight ${bestEdge.weight}.`
    })
  }

  return {
    edges: mstEdges,
    totalWeight,
    steps,
    visitedNodes: Array.from(visited),
    connected: visited.size === graph.nodes.length
  }
}
