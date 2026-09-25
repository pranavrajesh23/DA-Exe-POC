import { useState } from 'react'
import { PageHeader, Tabs, StatCard, DataTable, Card, DetailItem, DensityProvider, type Column } from '@quantaservices/quanta-ui-toolkit'
import { useSalesData } from '../../hooks/useSalesData'
import { groupSumBy } from '../../utils/aggregate'
import { formatDateShort } from '../../utils/date'
import { useFilters } from '../../context/FilterContext/FilterContext'
import { DashboardLayout } from '../../design/DashboardLayout/DashboardLayout'
import { BarChartWidget } from '../../components/charts/BarChartWidget/BarChartWidget'
import { LineChartWidget } from '../../components/charts/LineChartWidget/LineChartWidget'
import { PieChartWidget } from '../../components/charts/PieChartWidget/PieChartWidget'
import { FilterChip } from '../../components/filters/FilterChip/FilterChip'
import './FleetHealthDashboard.css'

export function FleetHealthDashboard() {
  const [activeTab, setActiveTab] = useState('exec-summary')
  const { data, loading, error, lastUpdated } = useSalesData('/api/sales-sample')
  const { data: weeklyData } = useSalesData('/api/sales-weekly')
  const { selectedProducts, setSelectedProducts } = useFilters()

  if (loading) return <p className="fh-status">Loading dashboard data…</p>
  if (error) return <p className="fh-status">Error: {error}</p>
  if (!data) return null

  const GROUP_COLUMN = 'product'
  const VALUE_COLUMN = 'totalPrice'
  const products = Array.from(new Set(data.rows.map(r => String(r[GROUP_COLUMN]))))
  const filteredRows = selectedProducts.length === 0 ? data.rows : data.rows.filter(row => selectedProducts.includes(row[GROUP_COLUMN]))
  const byProduct = groupSumBy(filteredRows, GROUP_COLUMN, VALUE_COLUMN)
  const columns: Column<Record<string, any>>[] = data.columns.map(c => ({ key: c, header: c }))
  const weeklyLabels = weeklyData ? weeklyData.rows.map(r => formatDateShort(r.week_start)) : []
  const weeklyValues = weeklyData ? weeklyData.rows.map(r => Number(r.total_sales)) : []

  // Clicking a bar/slice cross-filters every visual on the dashboard, same as
  // Power BI's default click-to-filter behavior. Clicking the same product again clears it.
  const selectedProductLabel = selectedProducts.length === 1 ? selectedProducts[0] : null
  const handleProductClick = (clickedLabel: string) => {
    setSelectedProducts(clickedLabel === selectedProductLabel ? [] : [clickedLabel])
  }

  return (
    <>
      <div className="fh-sticky">
        <PageHeader title="Fleet Health - Verizon Connect NRUs" disablePadding className="fh-header" />
        <div className="fh-filters">
          <FilterChip label="Product" options={products} selected={selectedProducts} onChange={setSelectedProducts} />
        </div>
      </div>

      <DensityProvider density="compact">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          items={[
            {
              value: 'exec-summary',
              label: 'Executive Summary',
              content: (
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
                    <StatCard label="Rows" value={String(filteredRows.length)} />,
                    <StatCard label="Products" value={String(byProduct.labels.length)} />,
                    <StatCard label="Total Sales" value={`$${filteredRows.reduce((s, r) => s + Number(r[VALUE_COLUMN] || 0), 0).toLocaleString()}`} />,
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
                  table={<DataTable columns={columns} data={filteredRows} maxHeight="320px" />}
                  tableTitle="All Sample Rows"
                />
              ),
            },
            // Add the next dashboard's tab here, e.g.:
            // { value: 'other-dashboard', label: 'Other Dashboard', content: <OtherDashboard /> },
          ]}
        />
      </DensityProvider>
    </>
  )
}