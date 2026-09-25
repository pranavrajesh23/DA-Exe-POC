import { ReactNode } from 'react'
import './DashboardLayout.css'

type ColumnPanel = { content: ReactNode; span: number; title?: string }

type DashboardLayoutProps = {
  searchBox: ReactNode
  lastUpdated: ReactNode
  kpis: ReactNode[]
  topChart: ReactNode
  topChartTitle?: string
  columns: ColumnPanel[][]
  table: ReactNode
  tableTitle?: string
}

export function DashboardLayout({
  searchBox,
  lastUpdated,
  kpis,
  topChart,
  topChartTitle,
  columns,
  table,
  tableTitle,
}: DashboardLayoutProps) {
  return (
    <div className="dl-wrap">
      <div className="dl-top-row">
        <div className="dl-top-left">
          <div className="dl-panel dl-search">{searchBox}</div>
          <div className="dl-panel dl-updated">{lastUpdated}</div>
        </div>

        {kpis.map((kpi, i) => (
          <div className="dl-panel dl-kpi" key={i}>{kpi}</div>
        ))}

        <div className="dl-panel dl-top-chart">
          {topChartTitle && <h3 className="dl-panel-title">{topChartTitle}</h3>}
          <div className="dl-panel-body">{topChart}</div>
        </div>
      </div>

      <div className="dl-columns">
        {columns.map((col, colIndex) => {
          let rowCursor = 1
          return col.map((item, i) => {
            const rowStart = rowCursor
            rowCursor += item.span
            return (
              <div
                className="dl-panel"
                style={{
                  gridColumn: colIndex + 1,
                  gridRow: `${rowStart} / span ${item.span}`,
                }}
                key={`${colIndex}-${i}`}
              >
                {item.title && <h3 className="dl-panel-title">{item.title}</h3>}
                <div className="dl-panel-body">{item.content}</div>
              </div>
            )
          })
        })}
      </div>

      <div className="dl-panel dl-table">
        {tableTitle && <h3 className="dl-panel-title">{tableTitle}</h3>}
        <div className="dl-panel-body">{table}</div>
      </div>
    </div>
  )
}