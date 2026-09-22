# CampusGraph

CampusGraph is an intelligent campus navigation and network optimization system designed to demonstrate classical graph algorithms in a professional product-style interface.
Link : http://localhost:5173/mst


## Features
- Campus route optimization and shortest path visualization
- Prim's and Kruskal's minimum spanning tree comparison
- Floyd-Warshall all-pairs shortest path analysis
- Interactive SVG campus graph with weighted edges
- Dashboard analytics and algorithm insights
- Responsive SaaS-style layout for desktop and tablet screens

## Technology Stack
- React
- TypeScript
- Vite
- React Router
- Recharts
- Lucide React

## Algorithms
- Prim's MST: O(E log V)
- Kruskal's MST: O(E log E)
- Floyd-Warshall: O(V³)

## Project Structure
- src/data/campusGraph.ts
- src/algorithms/prim.ts
- src/algorithms/kruskal.ts
- src/algorithms/floydWarshall.ts
- src/pages/
- src/components/

## Install
```bash
npm install
```

## Run
```bash
npm run dev
```

## Screenshot Placeholder
Add project screenshots here after running the app locally.

## Future Enhancements
- Add real-time route API integration
- Add drag-and-drop node editing
- Expand the graph editor for custom campus layouts
- Add persistence and export feature for graph states


