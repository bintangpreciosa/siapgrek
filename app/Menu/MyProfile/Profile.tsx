'use client'

import Image from "next/image"

export default function Profile() {

  return (

    <div className="bg-gray-100 rounded-3xl p-8 w-full">

      <h2 className="text-lg font-semibold mb-1">
        Profile Saya
      </h2>

      <p className="text-gray-500 mb-6">
        Atur detail profile kamu.
      </p>

      <div className="flex items-center gap-6 mb-8">

        <Image
          src="/images/profile.svg"
          alt="profile"
          width={70}
          height={70}
        />

        <button className="bg-primary text-white px-6 py-2 rounded-full">
          Ganti foto profil
        </button>

      </div>


      <div className="space-y-4">

        <input
          placeholder="Nama Lengkap"
          className="w-full p-4 rounded-full border"
        />

        <input
          placeholder="Email"
          className="w-full p-4 rounded-full border"
        />

        <input
          placeholder="Jenis Kelamin"
          className="w-full p-4 rounded-full border"
        />

        <input
          placeholder="Domisili"
          className="w-full p-4 rounded-full border"
        />

      </div>


      <button className="mt-8 w-full bg-primary text-white py-4 rounded-full">
        Simpan
      </button>

    </div>

  )
}