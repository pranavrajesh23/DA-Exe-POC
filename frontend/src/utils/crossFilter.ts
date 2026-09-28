export type CrossFilterSelection<TField extends string = string> = { field: TField; value: string } | null

// Clicking the already-selected value clears it; clicking anything else
// replaces the selection -- the toggle rule every chart's click-to-filter
// should follow, in one place.
export function toggleCrossFilter<TField extends string>(
  current: CrossFilterSelection<TField>,
  field: TField,
  value: string,
): CrossFilterSelection<TField> {
  if (current && current.field === field && current.value === value) return null
  return { field, value }
}

export function applyCrossFilter<TField extends string>(
  rows: Record<string, any>[],
  selection: CrossFilterSelection<TField>,
): Record<string, any>[] {
  if (!selection) return rows
  return rows.filter(row => String(row[selection.field]) === selection.value)
}
