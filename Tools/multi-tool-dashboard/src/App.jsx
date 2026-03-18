import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './components/DashboardLayout.jsx'
import ToolFrame from './components/ToolFrame.jsx'
import { toolItems } from './config/tools.js'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate replace to={`/${toolItems[0].slug}`} />} />
          {toolItems.map((tool) => (
            <Route
              key={tool.slug}
              path={tool.slug}
              element={
                <ToolFrame tool={tool}>
                  <tool.component embedded />
                </ToolFrame>
              }
            />
          ))}
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
