import './TopTabs.css'

type Tab = { id: string; label: string }

type TopTabsProps = {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
}

export function TopTabs({ tabs, activeTab, onChange }: TopTabsProps) {
  return (
    <nav className="top-tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`top-tab${tab.id === activeTab ? ' active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}