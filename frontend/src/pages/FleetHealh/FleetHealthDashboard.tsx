import { useState } from 'react'
import { useSalesData } from '../../hooks/useSalesData'
import { groupSumBy } from '../../utils/aggregate'
import { useFilters } from '../../context/FilterContext/FilterContext'
import { DashboardLayout } from '../../design/DashboardLayout/DashboardLayout'
import { StatCard } from '../../components/charts/StatCard/StatCard'
import { BarChartWidget } from '../../components/charts/BarChartWidget/BarChartWidget'
import { LineChartWidget } from '../../components/charts/LineChartWidget/LineChartWidget'
import { PieChartWidget } from '../../components/charts/PieChartWidget/PieChartWidget'
import { DataTable } from '../../components/common/DataTable'
import { LastUpdated } from '../../components/common/LastUpdated'
import { TextPanel } from '../../components/common/TextPanel'
import { MultiSelectDropdown } from '../../components/filters/MultiSelectDropdown/MultiSelectDropdown'
import { Header } from '../../components/layout/Header/Header'
import { TopTabs } from '../../components/layout/TopTabs/TopTabs'
import './FleetHealthDashboard.css'

const tabs = [{ id: 'exec-summary', label: 'Executive Summary' }]

export function FleetHealthDashboard() {
  const [activeTab, setActiveTab] = useState('exec-summary')
  const { data, loading, error, lastUpdated } = useSalesData('/api/sales-sample')
  const { selectedProducts, setSelectedProducts } = useFilters()

  if (loading) return <p className="fh-status">Loading dashboard data…</p>
  if (error) return <p className="fh-status">Error: {error}</p>
  if (!data) return null

  const GROUP_COLUMN = 'product'
  const VALUE_COLUMN = 'totalPrice'
  const products = Array.from(new Set(data.rows.map(r => String(r[GROUP_COLUMN]))))
  const filteredRows = selectedProducts.length === 0 ? data.rows : data.rows.filter(row => selectedProducts.includes(row[GROUP_COLUMN]))
  const byProduct = groupSumBy(filteredRows, GROUP_COLUMN, VALUE_COLUMN)

  return (
    <>
      <div className="fh-sticky">
        <Header title="Fleet Health - Verizon Connect NRUs" />
        <div className="fh-filters">
          <MultiSelectDropdown label="Product" options={products} selected={selectedProducts} onChange={setSelectedProducts} />
        </div>
        <TopTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {activeTab === 'exec-summary' && (
        <DashboardLayout
          searchBox={
            <TextPanel
              title="Quanta Executive Summary"
              lines={[
                'Non Reporting Unit Reports and Summary',
                'by Company, Region, Vehicle Type and days NRU.',
              ]}
            />
          }
          lastUpdated={<LastUpdated timestamp={lastUpdated} />}
          kpis={[
            <StatCard label="Rows" value={filteredRows.length} />,
            <StatCard label="Products" value={byProduct.labels.length} />,
            <StatCard label="Total Sales" value={`$${filteredRows.reduce((s, r) => s + Number(r[VALUE_COLUMN] || 0), 0).toLocaleString()}`} />,
          ]}
          topChart={<LineChartWidget labels={byProduct.labels} values={byProduct.values} label="Sales Trend" />}
          topChartTitle="Sales Trend"
          columns={[
            [
              { content: <BarChartWidget labels={byProduct.labels} values={byProduct.values} horizontal color="#4C9AFF" />, span: 2, title: 'Sales by Product (Bar)' },
              { content: <BarChartWidget labels={byProduct.labels} values={byProduct.values} horizontal color="#4C9AFF" />, span: 2, title: 'Sales by Product (Bar)' },
            ],
            [
              { content: <BarChartWidget labels={byProduct.labels} values={byProduct.values} color="#4C9AFF" />, span: 1, title: 'Bar Chart' },
              { content: <PieChartWidget labels={byProduct.labels} values={byProduct.values} />, span: 1, title: 'Pie Chart' },
              { content: <BarChartWidget labels={byProduct.labels} values={byProduct.values} horizontal color="#4C9AFF" />, span: 1, title: 'Bar Chart' },
              { content: <BarChartWidget labels={byProduct.labels} values={byProduct.values} color="#4C9AFF" />, span: 1, title: 'Bar Chart' },
            ],
            [
              { content: <BarChartWidget labels={byProduct.labels} values={byProduct.values} horizontal color="#4C9AFF" />, span: 2, title: 'Sales by Product (Bar)' },
              { content: <BarChartWidget labels={byProduct.labels} values={byProduct.values} horizontal color="#4C9AFF" />, span: 2, title: 'Sales by Product (Bar)' },
            ],
          ]}
          table={<DataTable columns={data.columns} rows={filteredRows} maxHeight={320} />}
          tableTitle="All Sample Rows"
        />
      )}
    </>
  )
}