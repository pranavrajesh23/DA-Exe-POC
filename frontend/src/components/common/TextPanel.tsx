import './TextPanel.css'

type TextPanelProps = {
  title: string
  lines: string[]
}

export function TextPanel({ title, lines }: TextPanelProps) {
  return (
    <div className="text-panel">
      <h3 className="text-panel-title">{title}</h3>
      {lines.map((line, i) => (
        <p className="text-panel-line" key={i}>{line}</p>
      ))}
    </div>
  )
}