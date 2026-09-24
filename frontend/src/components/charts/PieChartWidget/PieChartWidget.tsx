import { Pie } from 'react-chartjs-2'
import { radialChartOptions } from '../chartOptions'

type PieChartWidgetProps = {
  labels: string[]
  values: number[]
  colors?: string[]
}

const defaultColors = ['#4C9AFF', '#36B37E', '#FFAB00', '#FF5630', '#6554C0', '#00B8D9']

export function PieChartWidget({ labels, values, colors = defaultColors }: PieChartWidgetProps) {
  const data = {
    labels,
    datasets: [{ data: values, backgroundColor: colors }],
  }
  return <Pie data={data} options={radialChartOptions} />
}
