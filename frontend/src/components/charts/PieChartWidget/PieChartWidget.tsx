import { Pie } from 'react-chartjs-2'
import type { ChartEvent, ActiveElement } from 'chart.js'
import { radialChartOptions } from '../chartOptions'

type PieChartWidgetProps = {
  labels: string[]
  values: number[]
  colors?: string[]
  selectedLabel?: string | null
  onSliceClick?: (label: string) => void
}

const defaultColors = ['#CD0A1B', '#221F1F', '#8B8A8A', '#F0941C', '#AA0011', '#C0BFBF']

export function PieChartWidget({ labels, values, colors = defaultColors, selectedLabel, onSliceClick }: PieChartWidgetProps) {
  const backgroundColor = selectedLabel
    ? labels.map((l, i) => (l === selectedLabel ? colors[i % colors.length] : `${colors[i % colors.length]}40`))
    : colors

  const data = {
    labels,
    datasets: [{ data: values, backgroundColor }],
  }

  const options = onSliceClick
    ? {
        ...radialChartOptions,
        onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
          const index = elements[0]?.index
          if (index != null) onSliceClick(labels[index])
        },
        onHover: (event: ChartEvent, elements: ActiveElement[]) => {
          const target = event.native?.target as HTMLElement | undefined
          if (target) target.style.cursor = elements.length ? 'pointer' : 'default'
        },
      }
    : radialChartOptions

  return <Pie data={data} options={options} />
}
