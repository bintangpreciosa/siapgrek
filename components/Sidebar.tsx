'use client'

import Image from 'next/image'
import { useState } from 'react'

type Props = {
  active: string
  setActive: (menu: string) => void
}

export default function Sidebar({ active, setActive }: Props) {

  const [showLogout, setShowLogout] = useState(false)

  const mainMenu = [
    { name: 'dashboard', label: 'Dashboard', icon: '/images/Dashboard.png' },
    { name: 'penyakit', label: 'Penyakit', icon: '/images/Penyakit.png' },
    { name: 'log', label: 'Log Aktivitas', icon: '/images/Log Aktivitas.png' },
    { name: 'chat', label: 'Chat', icon: '/images/Chat.png' },
  ]

  const profileMenu = [
    { name: 'profile', label: 'Profile', icon: '/images/profile.svg' },
    { name: 'password', label: 'Ganti Password', icon: '/images/password.svg' },
    { name: 'main', label: 'Halaman Utama', icon: '/images/main_page.svg' },
  ]

  const isProfile =
    active === "myprofile" ||
    active === "profile" ||
    active === "password"

  const menu = isProfile ? profileMenu : mainMenu

  const handleClick = (name: string) => {

    if (name === "main") {
      setActive("dashboard")
      return
    }

    setActive(name)
  }

  return (

    <>
    
      <aside className="w-72 bg-white rounded-3xl p-6 flex flex-col justify-between">

        <nav className="space-y-4">

          {menu.map(item => {

            const isActive = active === item.name
            return (
              <button
                key={item.name}
                onClick={() => handleClick(item.name)}
                className={`
                  flex items-center gap-4 px-6 py-3 
                  rounded-xl w-full text-left font-medium transition
                  ${isActive
                    ? 'bg-selected text-primary'
                    : 'text-gray-500 hover:bg-gray-100'
                  }
                `}
              >

                <Image
                  src={item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                  className={isActive ? '' : 'grayscale opacity-40'}
                />

                {item.label}

              </button>
            )
          })}

        </nav>

        {/* LOGOUT BUTTON */}
        {isProfile && (
          <button
            onClick={() => setShowLogout(true)}
            className="flex items-center gap-4 px-6 py-3 rounded-xl w-full text-left font-medium bg-red-600 text-white hover:bg-red-700 transition"
          >
            <Image
              src="/images/logout.svg"
              alt="logout"
              width={24}
              height={24}
            />
            Keluar
          </button>
        )}

      </aside>


      {/* LOGOUT MODAL */}
      {showLogout && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-[320px]">

            <h2 className="text-lg font-semibold mb-2">
              Konfirmasi Logout
            </h2>

            <p className="text-gray-600 text-sm mb-6">
              Apakah anda yakin ingin keluar?
            </p>

            <div className="flex gap-3 justify-end">

              <button
                onClick={() => setShowLogout(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Batal
              </button>

              <button
                onClick={() => {
                  window.location.href = "/login"
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}