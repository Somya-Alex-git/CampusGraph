# CampusGraph Algorithm Details

## Graph Model
CampusGraph models the campus as a weighted undirected graph.
- Vertices represent buildings and campus locations.
- Edges represent roads or direct connections.
- Edge weights represent approximate distance or cost units.

## Prim's Algorithm
Prim's algorithm starts from a chosen root vertex and repeatedly selects the minimum-weight edge connecting the current tree to an unvisited vertex. This produces a minimum spanning tree with total minimum weight.

### Complexity
- Time: O(E log V)
- Space: O(V + E)

## Kruskal's Algorithm
Kruskal's algorithm sorts all edges by weight and adds them to the spanning tree if they do not create a cycle. The cycle check is performed with a Disjoint Set Union (DSU) structure.

### Complexity
- Time: O(E log E)
- Space: O(V + E)

## Floyd-Warshall Algorithm
Floyd-Warshall computes all-pairs shortest paths by considering every intermediate vertex. It updates the distance matrix until the optimal distances are known for each pair of nodes.

### Complexity
- Time: O(V³)
- Space: O(V²)

## Shortest Path Reconstruction
After the distance matrix is computed, the algorithm reconstructs the exact route from start to destination by following predecessor links and matrix updates.
