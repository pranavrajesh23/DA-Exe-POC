import { useEffect, useState } from 'react'

type SalesResponse = { columns: string[]; rows: Record<string, any>[] }

export function useSalesData(endpoint: string = '/api/sales-sample') {
  const [data, setData] = useState<SalesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        return res.json()
      })
      .then(json => {
        setData(json)
        setLastUpdated(new Date())   // real moment the fetch actually completed
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [endpoint])

  return { data, loading, error, lastUpdated }
}