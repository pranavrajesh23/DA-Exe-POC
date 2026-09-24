import { Line } from 'react-chartjs-2'
import { cartesianChartOptions } from '../chartOptions'

type LineChartWidgetProps = {
  labels: string[]
  values: number[]
  label?: string
  color?: string
}

export function LineChartWidget({ labels, values, label = 'Value', color = '#36B37E' }: LineChartWidgetProps) {
  const data = {
    labels,
    datasets: [
      {
        label,
        data: values,
        borderColor: color,
        backgroundColor: `${color}22`,
        tension: 0.3,
        fill: true,
        pointRadius: 2,
      },
    ],
  }
  return <Line data={data} options={cartesianChartOptions} />
}
