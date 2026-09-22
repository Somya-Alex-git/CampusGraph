interface RoutePanelProps {
  route: string[]
  distance: number
  startLabel: string
  destinationLabel: string
}

export function RoutePanel({ route, distance, startLabel, destinationLabel }: RoutePanelProps) {
  return (
    <div className="route-panel">
      <div className="route-header">
        <h3>Optimal Route Found</h3>
      </div>
      <div className="route-summary">
        <div>
          <span>Route</span>
          <strong>{route.length > 0 ? route.join(' → ') : 'No route available'}</strong>
        </div>
        <div>
          <span>Distance</span>
          <strong>{Number.isFinite(distance) ? `${distance} units` : 'Unavailable'}</strong>
        </div>
        <div>
          <span>Stops</span>
          <strong>{route.length}</strong>
        </div>
      </div>
      <div className="route-meta">
        <span>{startLabel}</span>
        <span>→</span>
        <span>{destinationLabel}</span>
      </div>
    </div>
  )
}
