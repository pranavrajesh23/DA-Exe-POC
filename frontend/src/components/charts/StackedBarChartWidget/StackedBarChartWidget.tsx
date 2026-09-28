import { Bar } from 'react-chartjs-2'
import type { ChartEvent, ActiveElement } from 'chart.js'
import { stackedCartesianChartOptions, stackedHorizontalCartesianChartOptions } from '../chartOptions'
import { useChartImageExport } from '../../../hooks/useChartImageExport'
import { ExportButton } from '../../common/ExportButton/ExportButton'

export type StackedSeries = {
  label: string
  values: number[]
  color: string
}

type StackedBarChartWidgetProps = {
  labels: string[]
  series: StackedSeries[]
  title?: string
  horizontal?: boolean
  selectedLabel?: string | null
  onBarClick?: (label: string) => void
}

// A multi-series stacked bar chart -- reused for both a stacked breakdown by
// category (horizontal) and a stacked time series (vertical), the two new
// visual shapes the Battery Assets export needed that the single-series
// BarChartWidget can't render.
export function StackedBarChartWidget({ labels, series, title = 'stacked-chart', horizontal = false, selectedLabel, onBarClick }: StackedBarChartWidgetProps) {
  const { chartRef, exportImage } = useChartImageExport(title)
  // Same dimming rule as BarChartWidget/PieChartWidget: a click-to-filter
  // selection dims every non-matching category across all stacked series.
  // Always build backgroundColor as a fresh array (never fall back to the
  // plain `s.color` string) so Chart.js repaints every bar back to full
  // color once a selection is cleared -- see BarChartWidget for details.
  const data = {
    labels,
    datasets: series.map(s => ({
      label: s.label,
      data: s.values,
      backgroundColor: labels.map(l => (!selectedLabel || l === selectedLabel ? s.color : `${s.color}40`)),
    })),
  }

  const baseOptions = horizontal ? stackedHorizontalCartesianChartOptions : stackedCartesianChartOptions
  const options = onBarClick
    ? {
        ...baseOptions,
        onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
          const index = elements[0]?.index
          if (index != null) onBarClick(labels[index])
        },
        onHover: (event: ChartEvent, elements: ActiveElement[]) => {
          const target = event.native?.target as HTMLElement | undefined
          if (target) target.style.cursor = elements.length ? 'pointer' : 'default'
        },
      }
    : baseOptions

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Bar ref={chartRef} data={data} options={options} />
      <ExportButton onClick={exportImage} label="Download chart as image" />
    </div>
  )
}
