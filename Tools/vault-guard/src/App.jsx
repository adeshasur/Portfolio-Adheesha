import React from 'react'
import VaultGuard from './components/VaultGuard'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-[#FBFBFF] flex flex-col p-6 overflow-hidden relative selection:bg-yellow-200">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none -z-10"></div>
      <div className="flex-1 flex items-center justify-center">
        <VaultGuard />
      </div>
    </div>
  )
}

export default App
