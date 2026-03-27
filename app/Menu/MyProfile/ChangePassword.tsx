"use client";

import Image from "next/image";

export default function Profile() {

  return (

    <div className="bg-gray-100 rounded-3xl p-8 h-full">

      <div className="mb-8">
        <h1 className="text-xl font-semibold text-gray-800">
          Profile Saya
        </h1>
        <p className="text-gray-500 text-sm">
          Atur detail profile kamu.
        </p>
      </div>


      {/* FOTO */}
      <div className="flex items-center gap-4 mb-8">

        <Image
          src="/images/profile.svg"
          alt="profile"
          width={60}
          height={60}
          className="rounded-full"
        />

        <button className="bg-primary text-white px-4 py-2 rounded-full text-sm">
          Ganti foto profil
        </button>

      </div>


      {/* FORM */}
      <div className="space-y-5 max-w-xl">

        <div>
          <label className="text-sm text-gray-600">
            Nama Lengkap
          </label>

          <input
            type="text"
            defaultValue="Hailey Williams"
            className="w-full mt-2 px-5 py-3 rounded-full border outline-none"
          />
        </div>


        <div>
          <label className="text-sm text-gray-600">
            Email
          </label>

          <input
            type="email"
            defaultValue="haileywilliams@gmail.com"
            className="w-full mt-2 px-5 py-3 rounded-full border outline-none"
          />
        </div>


        <div>
          <label className="text-sm text-gray-600">
            Jenis Kelamin
          </label>

          <select
            className="w-full mt-2 px-5 py-3 rounded-full border outline-none"
          >
            <option>Perempuan</option>
            <option>Laki-laki</option>
          </select>

        </div>


        <div>
          <label className="text-sm text-gray-600">
            Domisili
          </label>

          <input
            type="text"
            defaultValue="Bandung"
            className="w-full mt-2 px-5 py-3 rounded-full border outline-none"
          />
        </div>


        <button
          className="w-full bg-primary text-white py-4 rounded-full mt-6"
        >
          Simpan
        </button>

      </div>

    </div>

  );
}