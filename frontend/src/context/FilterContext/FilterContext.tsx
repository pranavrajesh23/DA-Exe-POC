import { createContext, useContext, useState, ReactNode } from 'react'

type FilterState = {
  selectedYear: string | null
  setSelectedYear: (year: string | null) => void
  selectedProducts: string[]
  setSelectedProducts: (products: string[]) => void
}

const FilterContext = createContext<FilterState | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  return (
    <FilterContext.Provider value={{ selectedYear, setSelectedYear, selectedProducts, setSelectedProducts }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error('useFilters must be used inside a FilterProvider')
  return ctx
}
