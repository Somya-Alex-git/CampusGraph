import { campusGraph, campusNodeMap } from '../data/campusGraph'

export function getNodeById(id: string) {
  return campusNodeMap.get(id)
}

export function getShortestPathDetails(startId: string, endId: string) {
  const graph = campusGraph
  const adjacency = new Map<string, Map<string, number>>()

  for (const node of graph.nodes) {
    adjacency.set(node.id, new Map())
  }

  for (const edge of graph.edges) {
    const fromMap = adjacency.get(edge.from)
    const toMap = adjacency.get(edge.to)

    if (!fromMap || !toMap) continue

    fromMap.set(edge.to, (fromMap.get(edge.to) ?? Number.POSITIVE_INFINITY) < edge.weight ? fromMap.get(edge.to) ?? edge.weight : edge.weight)
    toMap.set(edge.from, (toMap.get(edge.from) ?? Number.POSITIVE_INFINITY) < edge.weight ? toMap.get(edge.from) ?? edge.weight : edge.weight)
  }

  const distances = new Map<string, number>()
  const previous = new Map<string, string | null>()
  const visited = new Set<string>()

  for (const node of graph.nodes) {
    distances.set(node.id, node.id === startId ? 0 : Number.POSITIVE_INFINITY)
    previous.set(node.id, null)
  }

  const queue = [...graph.nodes.map((node) => node.id)]

  while (queue.length > 0) {
    queue.sort((first, second) => (distances.get(first) ?? Number.POSITIVE_INFINITY) - (distances.get(second) ?? Number.POSITIVE_INFINITY))
    const current = queue.shift()

    if (!current || visited.has(current)) continue
    visited.add(current)

    const neighbors = adjacency.get(current)
    if (!neighbors) continue

    for (const [neighbor, weight] of neighbors.entries()) {
      const candidate = (distances.get(current) ?? Number.POSITIVE_INFINITY) + weight
      if (candidate < (distances.get(neighbor) ?? Number.POSITIVE_INFINITY)) {
        distances.set(neighbor, candidate)
        previous.set(neighbor, current)
      }
    }
  }

  const pathIds: string[] = []
  let current: string | null = endId

  while (current) {
    pathIds.unshift(current)
    if (current === startId) break
    current = previous.get(current) ?? null
  }

  if (pathIds[0] !== startId || pathIds[pathIds.length - 1] !== endId) {
    return { path: [], totalDistance: Number.POSITIVE_INFINITY, routeFound: false }
  }

  const totalDistance = distances.get(endId) ?? Number.POSITIVE_INFINITY

  return {
    path: pathIds,
    totalDistance,
    routeFound: totalDistance !== Number.POSITIVE_INFINITY
  }
}
