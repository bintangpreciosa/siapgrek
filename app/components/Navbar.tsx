'use client'

import Image from 'next/image'

export default function Navbar() {
  return (
    <header className="w-full h-20 bg-white rounded-2xl px-6 flex items-center justify-between">

      {/* LEFT - LOGO */}
      <div className="flex items-center gap-3">
        <Image
          src="/images/Logo Navbar.png"
          alt="SIAPGrek"
          width={150}
          height={40}
        />
      </div>

      {/* RIGHT - ADMIN */}
      <div className="flex items-center gap-4">
        <span className="font-semibold text-gray-700">
          User
        </span>

        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <Image
            src="/images/User.png"
            alt="User"
            width={22}
            height={22}
            
          />
        </div>
      </div>

    </header>
  )
}
