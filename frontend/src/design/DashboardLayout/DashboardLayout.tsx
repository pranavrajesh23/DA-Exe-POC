import { ReactNode } from 'react'
import './DashboardLayout.css'

type ColumnPanel = { content: ReactNode; span: number }

type DashboardLayoutProps = {
  searchBox: ReactNode
  lastUpdated: ReactNode
  kpis: ReactNode[]
  topChart: ReactNode
  columns: ColumnPanel[][]
  table: ReactNode
}

export function DashboardLayout({ searchBox, lastUpdated, kpis, topChart, columns, table }: DashboardLayoutProps) {
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

        <div className="dl-panel dl-top-chart">{topChart}</div>
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
                {item.content}
              </div>
            )
          })
        })}
      </div>

      <div className="dl-panel dl-table">{table}</div>
    </div>
  )
}