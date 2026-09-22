interface StepViewerProps {
  title: string
  steps: Array<{ description: string; selectedEdge?: { from: string; to: string; weight: number } | null }>
  activeStep: number
}

export function StepViewer({ title, steps, activeStep }: StepViewerProps) {
  return (
    <div className="step-viewer">
      <div className="step-header">
        <h3>{title}</h3>
        <span>Step {Math.min(activeStep + 1, steps.length)} of {steps.length}</span>
      </div>
      <div className="step-list">
        {steps.map((step, index) => (
          <div
            key={`${step.description}-${index}`}
            className={`step-item ${index === activeStep ? 'active' : ''}`}
          >
            <span className="step-number">{index + 1}</span>
            <div>
              <p>{step.description}</p>
              {step.selectedEdge ? (
                <small>
                  {step.selectedEdge.from} — {step.selectedEdge.to} ({step.selectedEdge.weight})
                </small>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
