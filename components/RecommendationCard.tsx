"use client"

import { useState } from "react"
import Image from "next/image"
import DetailRekomendasi from "./DetailRekomendasi"

export default function RecommendationCard() {

  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="relative bg-gradient-to-br from-[#AE2D7B] to-[#64003C] 
      rounded-xl p-4 text-white w-[360px] overflow-hidden">

        <Image
          src="/images/rekomendasi.svg"
          alt="bg"
          width={200}
          height={200}
          className="absolute right-[-30px] bottom-[-30px] opacity-10 scale-x-[-1]"
        />

        <div className="relative z-10 flex flex-col justify-between h-full">

          <div className="flex items-start gap-2">
            <Image src="/images/rekomendasi.svg" alt="" width={30} height={30} />
            <h3 className="font-semibold text-base">
              Rekomendasi
            </h3>
          </div>

          <p className="text-sm opacity-90 mt-1">
            Lihat saran perlakuan untuk tiap tanaman anggrek kamu
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-4 bg-white text-[#64003C] text-sm font-medium
            rounded-lg py-2 hover:bg-gray-100 transition"
          >
            Lihat Rekomendasi
          </button>

        </div>
      </div>

      <DetailRekomendasi open={open} onClose={() => setOpen(false)} />

    </>
  )
}