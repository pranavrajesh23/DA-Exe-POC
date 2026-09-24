import './DataTable.css'

type DataTableProps = {
  columns: string[]
  rows: Record<string, any>[]
  maxHeight?: number
}

export function DataTable({ columns, rows, maxHeight = 320 }: DataTableProps) {
  return (
    <div className="data-table-wrap" style={{ maxHeight }}>
      <table className="data-table">
        <thead>
          <tr>{columns.map(c => <th key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>{columns.map(c => <td key={c}>{String(row[c])}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
