export function formatDateShort(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = String(date.getFullYear()).slice(-2)
  return `${month}/${day}/${year}`
}
