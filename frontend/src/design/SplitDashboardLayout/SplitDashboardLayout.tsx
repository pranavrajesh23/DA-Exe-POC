import { ReactNode } from 'react'
import './SplitDashboardLayout.css'

type Panel = { content: ReactNode; title?: string; flex?: number }

type SplitDashboardLayoutProps = {
  kpis: ReactNode[]
  splitRow: [Panel, Panel]
  columns: Panel[]
  table: ReactNode
  tableTitle?: string
}

// A second reusable grid template, alongside DashboardLayout: a KPI band,
// then one row of two UNEQUAL-width charts, then a row of equal panels,
// then a table. The Battery Assets export uses this shape instead of
// DashboardLayout's search-box + single top-chart row, so it gets its own
// template rather than being forced into one that doesn't fit.
export function SplitDashboardLayout({ kpis, splitRow, columns, table, tableTitle }: SplitDashboardLayoutProps) {
  return (
    <div className="sdl-wrap">
      <div className="sdl-kpi-row">
        {kpis.map((kpi, i) => (
          <div className="sdl-kpi" key={i}>{kpi}</div>
        ))}
      </div>

      <div className="sdl-split-row">
        {splitRow.map((panel, i) => (
          <div className="sdl-panel" style={{ flex: panel.flex ?? 1 }} key={i}>
            {panel.title && <h3 className="sdl-panel-title">{panel.title}</h3>}
            <div className="sdl-panel-body">{panel.content}</div>
          </div>
        ))}
      </div>

      <div className="sdl-columns-row">
        {columns.map((panel, i) => (
          <div className="sdl-panel" key={i}>
            {panel.title && <h3 className="sdl-panel-title">{panel.title}</h3>}
            <div className="sdl-panel-body">{panel.content}</div>
          </div>
        ))}
      </div>

      <div className="sdl-panel sdl-table">
        {tableTitle && <h3 className="sdl-panel-title">{tableTitle}</h3>}
        <div className="sdl-panel-body">{table}</div>
      </div>
    </div>
  )
}
