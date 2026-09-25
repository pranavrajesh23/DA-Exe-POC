export function groupSumBy(rows: Record<string, any>[], groupKey: string, valueKey: string) {
  const totals: Record<string, number> = {}
  rows.forEach(row => {
    const key = String(row[groupKey])
    totals[key] = (totals[key] || 0) + Number(row[valueKey] || 0)
  })
  return { labels: Object.keys(totals), values: Object.values(totals) }
}
