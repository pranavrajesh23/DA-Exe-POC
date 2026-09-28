import { StatCard, DataTable, type Column } from '@quantaservices/quanta-ui-toolkit'
import { useBatteryAssetsSummary } from '../../hooks/useBatteryAssetsSummary'
import { useSalesData } from '../../hooks/useSalesData'
import { useCrossFilter } from '../../hooks/useCrossFilter'
import { formatDateShort } from '../../utils/date'
import { downloadCsv } from '../../utils/downloadFile'
import { SplitDashboardLayout } from '../../design/SplitDashboardLayout/SplitDashboardLayout'
import { StackedBarChartWidget } from '../../components/charts/StackedBarChartWidget/StackedBarChartWidget'
import { BarChartWidget } from '../../components/charts/BarChartWidget/BarChartWidget'
import { PieChartWidget } from '../../components/charts/PieChartWidget/PieChartWidget'
import { ExportButton } from '../../components/common/ExportButton/ExportButton'
import './BatteryAssetsDashboard.css'

// Same 5-slot color order the reference export used for both the hierarchy
// and the weekly stacked charts: grey majority, dark red, bright red, then
// two Bolt-orange slivers on top.
const STACK_COLORS = ['#8B8A8A', '#AA0011', '#CD0A1B', '#F0941C', '#FFAE4D']
const MAKEUP_COLORS = ['#8B8A8A', '#CD0A1B', '#AA0011', '#F0941C', '#FFAE4D']

// Detail table columns each clickable chart cross-filters by.
type BatteryAssetsField = 'Region' | 'Category' | 'NRU Timeframe Bucket' | 'Device Category'

export function BatteryAssetsDashboard() {
  const { data, loading, error } = useBatteryAssetsSummary()
  const { data: detail } = useSalesData('/api/battery-assets-detail')
  const { onSelect, valueFor, filterRows } = useCrossFilter<BatteryAssetsField>()

  if (loading) return <p className="ba-status">Loading Battery Assets dashboard…</p>
  if (error) return <p className="ba-status">Error: {error}</p>
  if (!data) return null

  const weeklyLabels = data.weekly.weekStarts.map(formatDateShort)
  const detailColumns: Column<Record<string, any>>[] = detail ? detail.columns.map(c => ({ key: c, header: c })) : []
  const detailRows = detail ? filterRows(detail.rows) : []

  return (
    <SplitDashboardLayout
      kpis={[
        <StatCard label="Total Battery Assets" value={data.kpis.totalBatteryAssets.toLocaleString()} />,
        <StatCard label="Current NRUs - Battery Assets" value={data.kpis.currentNrus.toLocaleString()} />,
        <StatCard label="NRU % - Battery Assets" value={`${data.kpis.nruPercent}%`} />,
      ]}
      splitRow={[
        {
          title: 'NRU Count by Hierarchy',
          flex: 2,
          content: (
            <StackedBarChartWidget
              horizontal
              title="NRU Count by Hierarchy"
              labels={data.hierarchy.labels}
              series={data.hierarchy.series.map((s, i) => ({ label: s.label, values: s.values, color: STACK_COLORS[i % STACK_COLORS.length] }))}
              selectedLabel={valueFor('Region')}
              onBarClick={label => onSelect('Region', label)}
            />
          ),
        },
        {
          title: 'Weekly NRU Count (Completed Periods)',
          flex: 3,
          content: (
            <StackedBarChartWidget
              title="Weekly NRU Count"
              labels={weeklyLabels}
              series={data.weekly.series.map((s, i) => ({ label: s.label, values: s.values, color: STACK_COLORS[i % STACK_COLORS.length] }))}
            />
          ),
        },
      ]}
      columns={[
        {
          title: 'Total NRU Makeup',
          content: (
            <PieChartWidget
              title="Total NRU Makeup"
              labels={data.makeup.labels}
              values={data.makeup.values}
              colors={MAKEUP_COLORS}
              selectedLabel={valueFor('Device Category')}
              onSliceClick={label => onSelect('Device Category', label)}
            />
          ),
        },
        {
          title: 'NRUs by NRU Category',
          content: (
            <BarChartWidget
              label="NRUs by NRU Category"
              labels={data.category.labels}
              values={data.category.values}
              color="#F0941C"
              selectedLabel={valueFor('Category')}
              onBarClick={label => onSelect('Category', label)}
            />
          ),
        },
        {
          title: 'NRUs by Days Not Reporting',
          content: (
            <BarChartWidget
              label="NRUs by Days Not Reporting"
              labels={data.daysNotReporting.labels}
              values={data.daysNotReporting.values}
              color="#AA0011"
              selectedLabel={valueFor('NRU Timeframe Bucket')}
              onBarClick={label => onSelect('NRU Timeframe Bucket', label)}
            />
          ),
        },
      ]}
      table={detail ? <DataTable columns={detailColumns} data={detailRows} maxHeight="320px" /> : <p className="ba-status">Loading detail rows…</p>}
      tableTitle={
        <>
          Detail NRU Report - Battery Assets
          {detail && (
            <ExportButton
              inline
              label="Download table as CSV"
              onClick={() => downloadCsv('detail-nru-report-battery-assets.csv', detail.columns, detailRows)}
            />
          )}
        </>
      }
    />
  )
}
