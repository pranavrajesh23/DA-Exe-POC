import './Header.css'

export function Header({ title }: { title: string }) {
  return (
    <header className="dashboard-header">
      <h1>{title}</h1>
    </header>
  )
}