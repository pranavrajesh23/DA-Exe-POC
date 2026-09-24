import './TextPanel.css'

type TextPanelProps = {
  title?: string
  text: string
}

export function TextPanel({ title, text }: TextPanelProps) {
  return (
    <div className="text-panel">
      {title && <h3 className="text-panel-title">{title}</h3>}
      <div className="text-panel-body">{text}</div>
    </div>
  )
}
