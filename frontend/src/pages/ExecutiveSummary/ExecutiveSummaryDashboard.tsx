import { StatCard, DataTable, Card, DetailItem, type Column } from '@quantaservices/quanta-ui-toolkit'
import { useSalesData } from '../../hooks/useSalesData'
import { groupSumBy } from '../../utils/aggregate'
import { formatDateShort } from '../../utils/date'
import { useFilters } from '../../context/FilterContext/FilterContext'
import { useCrossFilter } from '../../hooks/useCrossFilter'
import { DashboardLayout } from '../../design/DashboardLayout/DashboardLayout'
import { BarChartWidget } from '../../components/charts/BarChartWidget/BarChartWidget'
import { LineChartWidget } from '../../components/charts/LineChartWidget/LineChartWidget'
import { PieChartWidget } from '../../components/charts/PieChartWidget/PieChartWidget'
import './ExecutiveSummaryDashboard.css'

export function ExecutiveSummaryDashboard() {
  const { data, loading, error, lastUpdated } = useSalesData('/api/sales-sample')
  const { data: weeklyData } = useSalesData('/api/sales-weekly')
  const { selectedProducts } = useFilters()
  // Same cross-filter hook Battery Assets uses: clicking a bar/slice
  // highlights it and narrows the detail table, same as Power BI's default
  // click-to-filter. Clicking the same product again clears it. This is
  // independent of the header's "Product" dropdown above, which narrows the
  // underlying data before it's even aggregated into these charts.
  const { valueFor, onSelect, filterRows } = useCrossFilter<'product'>()

  if (loading) return <p className="es-status">Loading dashboard data…</p>
  if (error) return <p className="es-status">Error: {error}</p>
  if (!data) return null

  const GROUP_COLUMN = 'product'
  const VALUE_COLUMN = 'totalPrice'
  const filteredRows = selectedProducts.length === 0 ? data.rows : data.rows.filter(row => selectedProducts.includes(row[GROUP_COLUMN]))
  const byProduct = groupSumBy(filteredRows, GROUP_COLUMN, VALUE_COLUMN)
  const columns: Column<Record<string, any>>[] = data.columns.map(c => ({ key: c, header: c }))
  const weeklyLabels = weeklyData ? weeklyData.rows.map(r => formatDateShort(r.week_start)) : []
  const weeklyValues = weeklyData ? weeklyData.rows.map(r => Number(r.total_sales)) : []

  const selectedProductLabel = valueFor('product')
  const handleProductClick = (clickedLabel: string) => onSelect('product', clickedLabel)
  const tableRows = filterRows(filteredRows)

  return (
    <DashboardLayout
      searchBox={
        <Card>
          <Card.Header title="Quanta Executive Summary" />
          <Card.Body>
            <p>Non Reporting Unit Reports and Summary</p><p> by Company, Region, Vehicle Type and days NRU.</p>
          </Card.Body>
        </Card>
      }
      lastUpdated={<DetailItem primary="Last Updated Time" secondary={lastUpdated ? lastUpdated.toLocaleString() : undefined} />}
      kpis={[
        <StatCard label="Rows" value={String(tableRows.length)} />,
        <StatCard label="Products" value={String(byProduct.labels.length)} />,
        <StatCard label="Total Sales" value={`$${tableRows.reduce((s, r) => s + Number(r[VALUE_COLUMN] || 0), 0).toLocaleString()}`} />,
      ]}
      topChart={<LineChartWidget labels={weeklyLabels} values={weeklyValues} label="Weekly Sales" />}
      topChartTitle="Sales Trend"
      columns={[
        [
          { content: <BarChartWidget labels={byProduct.labels} values={byProduct.values} horizontal color="#CD0A1B" selectedLabel={selectedProductLabel} onBarClick={handleProductClick} />, span: 2, title: 'Sales by Product (Bar)' },
          { content: <BarChartWidget labels={byProduct.labels} values={byProduct.values} horizontal color="#8B8A8A" selectedLabel={selectedProductLabel} onBarClick={handleProductClick} />, span: 2, title: 'Sales by Product (Bar)' },
        ],
        [
          { content: <BarChartWidget labels={byProduct.labels} values={byProduct.values} color="#F0941C" selectedLabel={selectedProductLabel} onBarClick={handleProductClick} />, span: 1, title: 'Bar Chart' },
          { content: <PieChartWidget labels={byProduct.labels} values={byProduct.values} selectedLabel={selectedProductLabel} onSliceClick={handleProductClick} />, span: 1, title: 'Pie Chart' },
          { content: <BarChartWidget labels={byProduct.labels} values={byProduct.values} horizontal color="#CD0A1B" selectedLabel={selectedProductLabel} onBarClick={handleProductClick} />, span: 1, title: 'Bar Chart' },
          { content: <BarChartWidget labels={byProduct.labels} values={byProduct.values} color="#CA8A04" selectedLabel={selectedProductLabel} onBarClick={handleProductClick} />, span: 1, title: 'Bar Chart' },
        ],
        [
          { content: <BarChartWidget labels={byProduct.labels} values={byProduct.values} horizontal color="#CD0A1B" selectedLabel={selectedProductLabel} onBarClick={handleProductClick} />, span: 2, title: 'Sales by Product (Bar)' },
          { content: <BarChartWidget labels={byProduct.labels} values={byProduct.values} horizontal color="#8B8A8A" selectedLabel={selectedProductLabel} onBarClick={handleProductClick} />, span: 2, title: 'Sales by Product (Bar)' },
        ],
      ]}
      table={<DataTable columns={columns} data={tableRows} maxHeight="320px" />}
      tableTitle="All Sample Rows"
    />
  )
}
