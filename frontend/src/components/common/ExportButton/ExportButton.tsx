import './ExportButton.css'

type ExportButtonProps = {
  onClick: () => void
  label?: string
  /** Renders in-flow next to a title instead of overlaid on a chart's corner. */
  inline?: boolean
}

// A small, reusable download affordance -- the per-visual "export" action
// every chart/table panel gets, matching Power BI's visual-level "Export
// data" / "Export to image" menu item. Self-contained: any panel can drop
// this in without knowing about CSV or image export internals.
export function ExportButton({ onClick, label = 'Download', inline = false }: ExportButtonProps) {
  return (
    <button
      type="button"
      className={inline ? 'export-button export-button-inline' : 'export-button'}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
