import { Select, FilterDropdown } from '@quantaservices/quanta-ui-toolkit'
import { useFilters } from '../../../context/FilterContext/FilterContext'
import './FilterBar.css'

type FilterBarProps = {
  years: string[]
  products: string[]
}

export function FilterBar({ years, products }: FilterBarProps) {
  const { selectedYear, setSelectedYear, selectedProducts, setSelectedProducts } = useFilters()

  return (
    <div className="filter-bar">
      <Select
        label="Year"
        value={selectedYear ?? ''}
        onChange={value => setSelectedYear(value || null)}
        placeholder="All"
        options={years.map(y => ({ label: y, value: y }))}
      />

      <FilterDropdown
        options={products.map(p => ({ label: p, value: p }))}
        selected={selectedProducts}
        onChange={setSelectedProducts}
      />
    </div>
  )
}
