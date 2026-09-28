import { useState } from 'react'
import { DensityProvider } from '@quantaservices/quanta-ui-toolkit'
import { useSalesData } from '../hooks/useSalesData'
import { useFilters } from '../context/FilterContext/FilterContext'
import { Header } from '../components/layout/Header/Header'
import { Footer } from '../components/layout/Footer/Footer'
import { FilterChip } from '../components/filters/FilterChip/FilterChip'
import { ExecutiveSummaryDashboard } from './ExecutiveSummary/ExecutiveSummaryDashboard'
import { BatteryAssetsDashboard } from './BatteryAssets/BatteryAssetsDashboard'

const TABS = [
  { value: 'exec-summary', label: 'Executive Summary' },
  { value: 'battery-assets', label: 'Battery Assets' },
  // Add the next dashboard's tab here, e.g.:
  // { value: 'other-dashboard', label: 'Other Dashboard' },
]

// The report shell: it owns the title, the tab strip, and which tab is
// active, and renders the shared Header. "Product" is the one filter that
// applies across every tab -- it doesn't change per dashboard. Executive
// Summary and Battery Assets are separate report pages/tabs -- siblings
// registered here, not nested inside one another.
export function Home() {
  const [activeTab, setActiveTab] = useState('exec-summary')
  const { data } = useSalesData('/api/sales-sample')
  const { selectedProducts, setSelectedProducts } = useFilters()

  const products = data ? Array.from(new Set(data.rows.map(r => String(r.product)))) : []
  const filters = <FilterChip label="Product" options={products} selected={selectedProducts} onChange={setSelectedProducts} />

  return (
    <>
      <Header title="Fleet Health - Verizon Connect NRUs" filters={filters} tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <DensityProvider density="compact">
        {activeTab === 'exec-summary' && <ExecutiveSummaryDashboard />}
        {activeTab === 'battery-assets' && <BatteryAssetsDashboard />}
      </DensityProvider>

      <Footer />
    </>
  )
}
