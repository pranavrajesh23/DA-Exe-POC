import { Line } from 'react-chartjs-2'
import type { Chart, ChartDataset } from 'chart.js'

type LineChartWidgetProps = {
  labels: string[]
  values: number[]
  label?: string
  color?: string
}

function formatCompact(value: number): string {
  if (Math.abs(value) >= 1000) return `${Math.round(value / 1000)}K`
  return String(Math.round(value))
}

// Draws the value directly above each point, matching the reference sparkline
// style (no y-axis, labels sit on the line itself instead).
const valueLabelPlugin = {
  id: 'valueLabels',
  afterDatasetsDraw(chart: Chart) {
    const { ctx } = chart
    chart.data.datasets.forEach((dataset: ChartDataset<'line'>, datasetIndex: number) => {
      const meta = chart.getDatasetMeta(datasetIndex)
      meta.data.forEach((point, index) => {
        const value = dataset.data[index]
        if (typeof value !== 'number') return
        ctx.save()
        ctx.fillStyle = '#1a1a1a'
        ctx.font = 'bold 10px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(formatCompact(value), point.x, point.y - 10)
        ctx.restore()
      })
    })
  },
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 24, bottom: 4 } },
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 10 }, color: '#595959', autoSkip: true, maxRotation: 0, minRotation: 0, maxTicksLimit: 6 },
    },
    y: {
      display: false,
    },
  },
}

export function LineChartWidget({ labels, values, label = 'Value', color = '#595959' }: LineChartWidgetProps) {
  const data = {
    labels,
    datasets: [
      {
        label,
        data: values,
        borderColor: color,
        backgroundColor: color,
        tension: 0.3,
        fill: false,
        pointRadius: 3,
        pointBackgroundColor: color,
      },
    ],
  }
  return <Line data={data} options={options} plugins={[valueLabelPlugin]} />
}
