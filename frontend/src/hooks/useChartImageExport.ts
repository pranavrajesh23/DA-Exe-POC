import { useRef } from 'react'
import { downloadDataUrl } from '../utils/downloadFile'

// One shared way for any chart widget to get a "download as image" action --
// grabs the underlying Chart.js instance via `ref` and reads its canvas back
// out as a PNG data URL, matching Power BI's per-visual "Export to image".
export function useChartImageExport(filename: string) {
  // Typed loosely: this ref is handed straight to react-chartjs-2's `ref`
  // prop, whose exact instance type differs per chart kind (Bar/Pie/Line) --
  // all of them expose `toBase64Image()` on the underlying Chart.js instance.
  const chartRef = useRef<any>(null)

  const exportImage = () => {
    const chart = chartRef.current
    if (!chart) return
    downloadDataUrl(`${filename}.png`, chart.toBase64Image())
  }

  return { chartRef, exportImage }
}
