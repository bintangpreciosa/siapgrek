'use client'

import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

import Dashboard from './Menu/Dashboard'
import Penyakit from './Menu/Penyakit'
import LogAktivitas from './Menu/LogAktivitas'
import DeteksiAnomali from "./Menu/DeteksiAnomali"
import Chat from "./Menu/Chat"
import GrafikTanaman from "./Menu/GrafikTanaman"

export default function Page() {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [selectedGrafikId, setSelectedGrafikId] = useState<string | null>(null)

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />
      case 'penyakit':
        return <Penyakit />
      case 'anomali':
        return <DeteksiAnomali />
      case 'log':
        return (
          <LogAktivitas
            setActiveMenu={setActiveMenu}
            setSelectedGrafikId={setSelectedGrafikId}
          />
        )
      case 'grafik':
        return (
          <GrafikTanaman
            selectedId={selectedGrafikId}
            setActiveMenu={setActiveMenu}
          />
        )
      case 'chat':
        return <Chat />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <div className="flex flex-col h-full p-6 gap-6">
        <Navbar />

        <div className="flex flex-1 gap-6">
          <Sidebar active={activeMenu} setActive={setActiveMenu} />

          <main className="flex-1 bg-white rounded-3xl p-6 overflow-hidden">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  )
}
