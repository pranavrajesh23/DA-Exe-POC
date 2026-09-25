import { Outlet } from 'react-router-dom'
import './Layout.css'

export function Layout() {
  return (
    <div className="app-shell">
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  )
}