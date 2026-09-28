// Shared download helpers -- import either one to add an export/download
// action anywhere; neither depends on any specific chart or table component.

function triggerDownload(href: string, filename: string) {
  const link = document.createElement('a')
  link.href = href
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export function downloadDataUrl(filename: string, dataUrl: string) {
  triggerDownload(dataUrl, filename)
}

function csvEscape(value: unknown): string {
  const s = value == null ? '' : String(value)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function downloadCsv(filename: string, columns: string[], rows: Record<string, unknown>[]) {
  const header = columns.map(csvEscape).join(',')
  const body = rows.map(row => columns.map(c => csvEscape(row[c])).join(',')).join('\n')
  const blob = new Blob([`${header}\n${body}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  triggerDownload(url, filename.endsWith('.csv') ? filename : `${filename}.csv`)
  URL.revokeObjectURL(url)
}
