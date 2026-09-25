type LastUpdatedProps = {
  timestamp: Date | null
}

export function LastUpdated({ timestamp }: LastUpdatedProps) {
  return (
    <div className="last-updated">
      <p className="lu-label">Last Updated Time</p>
      <p className="lu-value">
        {timestamp ? timestamp.toLocaleString() : '—'}
      </p>
    </div>
  )
}