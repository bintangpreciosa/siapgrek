'use client'

import Image from 'next/image'

type Props = {
  active: string
  setActive: (menu: string) => void
}

export default function Sidebar({ active, setActive }: Props) {

  const menu = [
    { name: 'dashboard', label: 'Dashboard', icon: '/images/Dashboard.png' },
    { name: 'penyakit', label: 'Penyakit', icon: '/images/Penyakit.png' },
    { name: 'anomali', label: 'Deteksi Anomali', icon: '/images/DeteksiAnomali.png' },
    { name: 'log', label: 'Log Aktivitas', icon: '/images/Log Aktivitas.png' },
    { name: 'chat', label: 'Chat', icon: '/images/Chat.png' },
  ]

  return (
    <aside className="w-72 bg-white rounded-3xl  p-6 flex flex-col">
      <nav className="space-y-4">
        {menu.map(item => {
          const isActive = active === item.name

          return (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-4 px-6 py-3 rounded-xl w-full text-left font-medium transition
                ${isActive
                  ? 'bg-selected text-primary'
                  : 'text-gray-500 hover:bg-gray-100'}
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
    </aside>
  )
}
