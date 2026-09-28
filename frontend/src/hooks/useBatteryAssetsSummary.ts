import { useEffect, useState } from 'react'

export type BatteryAssetsSummary = {
  kpis: { totalBatteryAssets: number; currentNrus: number; nruPercent: number }
  hierarchy: { labels: string[]; series: { label: string; values: number[] }[] }
  weekly: { weekStarts: string[]; series: { label: string; values: number[] }[] }
  makeup: { labels: string[]; values: number[] }
  category: { labels: string[]; values: number[] }
  daysNotReporting: { labels: string[]; values: number[] }
}

export function useBatteryAssetsSummary(endpoint: string = '/api/battery-assets-summary') {
  const [data, setData] = useState<BatteryAssetsSummary | null>(null)
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
        setLastUpdated(new Date())
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [endpoint])

  return { data, loading, error, lastUpdated }
}
