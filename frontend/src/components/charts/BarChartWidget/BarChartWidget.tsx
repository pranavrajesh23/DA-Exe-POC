import { Bar } from 'react-chartjs-2'
import { cartesianChartOptions, horizontalCartesianChartOptions } from '../chartOptions'

type BarChartWidgetProps = {
  labels: string[]
  values: number[]
  label?: string
  color?: string
  horizontal?: boolean
}

export function BarChartWidget({
  labels,
  values,
  label = 'Value',
  color = '#4C9AFF',
  horizontal = false,
}: BarChartWidgetProps) {
  const data = {
    labels,
    datasets: [{ label, data: values, backgroundColor: color }],
  }

  const options = horizontal ? horizontalCartesianChartOptions : cartesianChartOptions

  return <Bar data={data} options={options} />
}
