import { DisjointSetUnion } from './dsu'
import type { CampusEdge, Graph } from '../data/campusGraph'

export interface KruskalStep {
  selectedNode: string
  selectedEdge: CampusEdge | null
  edgeWeight: number | null
  currentMSTWeight: number
  description: string
}

export interface KruskalResult {
  edges: CampusEdge[]
  totalWeight: number
  steps: KruskalStep[]
  rejectedEdges: Array<{ edge: CampusEdge; reason: string }>
  connected: boolean
}

export function kruskalMST(graph: Graph): KruskalResult {
  const sortedEdges = [...graph.edges].sort((left, right) => left.weight - right.weight)
  const nodeIndexMap = new Map(graph.nodes.map((node, index) => [node.id, index]))
  const dsu = new DisjointSetUnion(graph.nodes.length)
  const mstEdges: CampusEdge[] = []
  const steps: KruskalStep[] = []
  const rejectedEdges: Array<{ edge: CampusEdge; reason: string }> = []
  let totalWeight = 0

  for (const edge of sortedEdges) {
    const leftIndex = nodeIndexMap.get(edge.from)
    const rightIndex = nodeIndexMap.get(edge.to)

    if (leftIndex === undefined || rightIndex === undefined) {
      continue
    }

    if (dsu.find(leftIndex) === dsu.find(rightIndex)) {
      rejectedEdges.push({
        edge,
        reason: 'Rejected because this edge creates a cycle in the current forest.'
      })
      steps.push({
        selectedNode: edge.to,
        selectedEdge: edge,
        edgeWeight: edge.weight,
        currentMSTWeight: totalWeight,
        description: `Rejected edge ${edge.from} - ${edge.to} because it creates a cycle.`
      })
      continue
    }

    dsu.union(leftIndex, rightIndex)
    mstEdges.push(edge)
    totalWeight += edge.weight

    steps.push({
      selectedNode: edge.to,
      selectedEdge: edge,
      edgeWeight: edge.weight,
      currentMSTWeight: totalWeight,
      description: `Selected edge ${edge.from} - ${edge.to} with weight ${edge.weight}.`
    })
  }

  return {
    edges: mstEdges,
    totalWeight,
    steps,
    rejectedEdges,
    connected: mstEdges.length === graph.nodes.length - 1
  }
}
