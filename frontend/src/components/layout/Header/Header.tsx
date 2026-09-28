import './Header.css'

type HeaderTab = { value: string; label: string }

type HeaderProps = {
  title: string
  filters?: React.ReactNode
  tabs: HeaderTab[]
  activeTab: string
  onTabChange: (value: string) => void
}

// The reusable app-shell header: report title, the active tab's filter
// chips, and the tab strip -- everything the reference export shows
// stacked above the dashboard content, in one place instead of scattered
// across each page. Only the strip of tab labels lives here; the tab
// *content* renders below, in the (non-sticky) page body.
export function Header({ title, filters, tabs, activeTab, onTabChange }: HeaderProps) {
  return (
    <div className="app-header">
      <h1 className="app-header-title">{title}</h1>
      {filters && <div className="app-header-filters">{filters}</div>}
      <div className="app-header-tabs">
        {tabs.map(tab => (
          <button
            key={tab.value}
            type="button"
            className={`app-header-tab${tab.value === activeTab ? ' active' : ''}`}
            onClick={() => onTabChange(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
