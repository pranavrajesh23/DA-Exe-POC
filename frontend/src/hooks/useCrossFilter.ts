import { useState } from 'react'
import { toggleCrossFilter, applyCrossFilter, type CrossFilterSelection } from '../utils/crossFilter'

// Click-to-filter for a dashboard's own visuals, same behavior Power BI's
// default click-to-filter has: click a bar/slice to select it (dimming the
// rest and filtering the detail table), click it again to clear it. A
// dashboard just names which field each chart clicked into.
export function useCrossFilter<TField extends string = string>() {
  const [selection, setSelection] = useState<CrossFilterSelection<TField>>(null)

  const onSelect = (field: TField, value: string) => setSelection(prev => toggleCrossFilter(prev, field, value))
  const valueFor = (field: TField) => (selection?.field === field ? selection.value : null)
  const filterRows = (rows: Record<string, any>[]) => applyCrossFilter(rows, selection)

  return { selection, onSelect, valueFor, filterRows }
}
