import { Menu, Sparkles, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { toolItems } from '../config/tools.js'

function DashboardLayout() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const currentTool = useMemo(
    () => toolItems.find((tool) => location.pathname === `/${tool.slug}`) ?? toolItems[0],
    [location.pathname],
  )

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <div className="dashboard-shell">
      <div className="dashboard-noise" aria-hidden="true" />
      <button
        type="button"
        className="mobile-menu-button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open dashboard navigation"
      >
        <Menu size={20} />
      </button>

      <aside className={`dashboard-sidebar ${mobileOpen ? 'is-open' : ''}`}>
        <div className="sidebar-brand-row">
          <div className="sidebar-brand-mark">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="sidebar-kicker">Adheesha Suite</p>
            <h1 className="sidebar-title">Multi-Tool Dashboard</h1>
          </div>
          <button
            type="button"
            className="mobile-close-button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close dashboard navigation"
          >
            <X size={20} />
          </button>
        </div>

        <p className="sidebar-copy">
          Fixed navigation on the left, live tool workspace on the right, and your signature yellow
          theme across the entire experience.
        </p>

        <div className="sidebar-summary">
          <span>7 tools</span>
          <span>React Router</span>
          <span>Responsive</span>
        </div>

        <nav className="sidebar-nav" aria-label="Dashboard tools">
          {toolItems.map((tool) => {
            const Icon = tool.icon

            return (
              <NavLink
                key={tool.slug}
                to={`/${tool.slug}`}
                className={({ isActive }) =>
                  `sidebar-link${isActive ? ' is-active' : ''}`
                }
              >
                <span className="sidebar-link-icon">
                  <Icon size={18} />
                </span>
                <span className="sidebar-link-copy">
                  <strong>{tool.label}</strong>
                  <small>{tool.eyebrow}</small>
                </span>
              </NavLink>
            )
          })}
        </nav>
      </aside>

      {mobileOpen ? (
        <button
          type="button"
          className="mobile-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation overlay"
        />
      ) : null}

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <p className="topbar-kicker">{currentTool.eyebrow}</p>
            <h2 className="topbar-title">{currentTool.label}</h2>
          </div>
          <div className="topbar-pill">
            <span>{currentTool.statsLabel}</span>
            <strong>{currentTool.statsValue}</strong>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
