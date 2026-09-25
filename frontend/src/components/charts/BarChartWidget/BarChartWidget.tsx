import { Bar } from 'react-chartjs-2'
import type { ChartEvent, ActiveElement } from 'chart.js'
import { cartesianChartOptions, horizontalCartesianChartOptions } from '../chartOptions'

type BarChartWidgetProps = {
  labels: string[]
  values: number[]
  label?: string
  color?: string
  horizontal?: boolean
  selectedLabel?: string | null
  onBarClick?: (label: string) => void
}

export function BarChartWidget({
  labels,
  values,
  label = 'Value',
  color = '#CD0A1B',
  horizontal = false,
  selectedLabel,
  onBarClick,
}: BarChartWidgetProps) {
  // Dim non-selected bars so a click-to-filter selection is visible on the chart,
  // matching the cross-filter highlight behavior of Power BI.
  const backgroundColor = selectedLabel
    ? labels.map(l => (l === selectedLabel ? color : `${color}40`))
    : color

  const data = {
    labels,
    datasets: [{ label, data: values, backgroundColor }],
  }

  const baseOptions = horizontal ? horizontalCartesianChartOptions : cartesianChartOptions
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

  return <Bar data={data} options={options} />
}
