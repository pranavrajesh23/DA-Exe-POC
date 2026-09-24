import { ReactNode } from 'react'
import './DashboardLayout.css'

type DashboardLayoutProps = {
  summary: ReactNode
  kpi1: ReactNode
  kpi2: ReactNode
  kpi3: ReactNode
  main: ReactNode
  barA: ReactNode
  barB: ReactNode
  barC: ReactNode
  barD: ReactNode
  pie: ReactNode
  barE: ReactNode
  barF: ReactNode
  barG: ReactNode
  table: ReactNode
}

/**
 * Fixed CSS Grid layout modeled on the Fleet Health dashboard:
 *   Row 1: summary panel, 3 KPI cards, 1 wide line chart
 *   Row 2: 3 side-by-side panels (horizontal bar / vertical bar / horizontal bar)
 *   Row 3: 3 side-by-side panels (horizontal bar / pie / horizontal bar)
 *   Row 4: 2 side-by-side panels (vertical bar / horizontal bar)
 *   Row 5: full-width data table
 *
 * Reusable across dashboards -- swap in different components per slot,
 * the arrangement itself stays the same.
 */
export function DashboardLayout({
  summary,
  kpi1,
  kpi2,
  kpi3,
  main,
  barA,
  barB,
  barC,
  barD,
  pie,
  barE,
  barF,
  barG,
  table,
}: DashboardLayoutProps) {
  return (
    <div className="dashboard-layout">
      <div className="dl-cell dl-summary">{summary}</div>
      <div className="dl-cell dl-kpi1">{kpi1}</div>
      <div className="dl-cell dl-kpi2">{kpi2}</div>
      <div className="dl-cell dl-kpi3">{kpi3}</div>
      <div className="dl-cell dl-main">{main}</div>

      <div className="dl-cell dl-barA">{barA}</div>
      <div className="dl-cell dl-barB">{barB}</div>
      <div className="dl-cell dl-barC">{barC}</div>

      <div className="dl-cell dl-barD">{barD}</div>
      <div className="dl-cell dl-pie">{pie}</div>
      <div className="dl-cell dl-barE">{barE}</div>

      <div className="dl-cell dl-barF">{barF}</div>
      <div className="dl-cell dl-barG">{barG}</div>

      <div className="dl-cell dl-table">{table}</div>
    </div>
  )
}
