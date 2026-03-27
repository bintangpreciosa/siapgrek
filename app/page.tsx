'use client'

import { useState } from 'react'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

import Dashboard from './Menu/Dashboard'
import Penyakit from './Menu/Penyakit'
import LogAktivitas from './Menu/LogAktivitas'
import Chat from "./Menu/Chat"
import GrafikTanaman from "./Menu/GrafikTanaman"
import MyProfile from "./Menu/MyProfile/MyProfile"

export default function Page() {

  const [activeMenu, setActiveMenu] = useState("dashboard")

  const renderContent = () => {

    switch (activeMenu) {

      case "dashboard":
        return <Dashboard  setActiveMenu={setActiveMenu} />

      case "penyakit":
        return <Penyakit />

      case "log":
        return <LogAktivitas />

      case "grafik":
        return (
          <GrafikTanaman
            setActiveMenu={setActiveMenu}
          />
        )

      case "chat":
        return <Chat />

      case "myprofile":
      case "profile":
      case "password":
        return (
          <MyProfile
            active={activeMenu}
          />
        )

      default:
        return <Dashboard setActiveMenu={setActiveMenu} />
    }
  }

  return (

    <div className="h-screen bg-gray-100 overflow-hidden">

      <div className="flex flex-col h-full p-6 gap-6">

        <Navbar
          setActiveMenu={setActiveMenu}
        />

        <div className="flex flex-1 gap-6">

          <Sidebar
            active={activeMenu}
            setActive={setActiveMenu}
          />

          <main className="flex-1 bg-white rounded-3xl p-6 overflow-hidden">
            {renderContent()}
          </main>

        </div>

      </div>

    </div>

  )
}