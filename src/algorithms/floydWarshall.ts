import type { Graph } from '../data/campusGraph'

export interface FloydStep {
  k: string
  description: string
}

export interface FloydResult {
  distanceMatrix: number[][]
  nextMatrix: number[][]
  pathMatrix: number[][]
  steps: FloydStep[]
  nodeIds: string[]
}

export function floydWarshall(graph: Graph): FloydResult {
  const nodeIds = graph.nodes.map((node) => node.id)
  const indexMap = new Map<string, number>(nodeIds.map((id, index) => [id, index]))
  const distanceMatrix = Array.from({ length: nodeIds.length }, () =>
    Array(nodeIds.length).fill(Number.POSITIVE_INFINITY)
  )
  const nextMatrix = Array.from({ length: nodeIds.length }, () => Array(nodeIds.length).fill(-1))

  for (let i = 0; i < nodeIds.length; i += 1) {
    distanceMatrix[i][i] = 0
    nextMatrix[i][i] = i
  }

  for (const edge of graph.edges) {
    const fromIndex = indexMap.get(edge.from)
    const toIndex = indexMap.get(edge.to)

    if (fromIndex === undefined || toIndex === undefined) {
      continue
    }

    if (edge.weight < distanceMatrix[fromIndex][toIndex]) {
      distanceMatrix[fromIndex][toIndex] = edge.weight
      nextMatrix[fromIndex][toIndex] = toIndex
    }

    if (edge.weight < distanceMatrix[toIndex][fromIndex]) {
      distanceMatrix[toIndex][fromIndex] = edge.weight
      nextMatrix[toIndex][fromIndex] = fromIndex
    }
  }

  const steps: FloydStep[] = []

  for (let k = 0; k < nodeIds.length; k += 1) {
    const midNode = nodeIds[k]
    for (let i = 0; i < nodeIds.length; i += 1) {
      for (let j = 0; j < nodeIds.length; j += 1) {
        if (i === j || distanceMatrix[i][k] === Number.POSITIVE_INFINITY || distanceMatrix[k][j] === Number.POSITIVE_INFINITY) {
          continue
        }

        const candidate = distanceMatrix[i][k] + distanceMatrix[k][j]
        if (candidate < distanceMatrix[i][j]) {
          distanceMatrix[i][j] = candidate
          nextMatrix[i][j] = nextMatrix[i][k]
        }
      }
    }

    steps.push({
      k: midNode,
      description: `Relaxed paths through ${midNode} to improve the shortest-path matrix.`
    })
  }

  const pathMatrix = Array.from({ length: nodeIds.length }, (_, row) =>
    Array(nodeIds.length).fill(0).map((_, column) => {
      if (row === column) return 0
      if (distanceMatrix[row][column] === Number.POSITIVE_INFINITY) return Number.POSITIVE_INFINITY
      return distanceMatrix[row][column]
    })
  )

  return {
    distanceMatrix,
    nextMatrix,
    pathMatrix,
    steps,
    nodeIds
  }
}

export function reconstructShortestPath(
  result: FloydResult,
  startId: string,
  destinationId: string
): { pathIds: string[]; distance: number } {
  const startIndex = result.nodeIds.indexOf(startId)
  const destinationIndex = result.nodeIds.indexOf(destinationId)

  if (startIndex === -1 || destinationIndex === -1) {
    return { pathIds: [], distance: Number.POSITIVE_INFINITY }
  }

  if (startIndex === destinationIndex) {
    return { pathIds: [startId], distance: 0 }
  }

  const pathIndexes: number[] = [startIndex]
  let currentIndex = startIndex

  while (currentIndex !== destinationIndex) {
    const nextIndex = result.nextMatrix[currentIndex][destinationIndex]

    if (nextIndex === -1 || nextIndex === currentIndex) {
      return { pathIds: [], distance: Number.POSITIVE_INFINITY }
    }

    pathIndexes.push(nextIndex)
    currentIndex = nextIndex
  }

  return {
    pathIds: pathIndexes.map((index) => result.nodeIds[index]),
    distance: result.distanceMatrix[startIndex][destinationIndex]
  }
}
