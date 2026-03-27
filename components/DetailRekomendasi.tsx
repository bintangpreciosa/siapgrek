"use client"

import Image from "next/image"
import SensorCard from "./SensorCard"

type Props = {
  open: boolean
  onClose: () => void
}

function getScore(value:number,type:string){

  if(type==="temp"){
    if(value>=20 && value<=30) return 100
    if(value>30 && value<=33) return 70
    return 40
  }

  if(type==="moist"){
    if(value>=40 && value<=70) return 100
    if(value>70 && value<=80) return 70
    return 40
  }

  if(type==="ph"){
    if(value>=5.5 && value<=6.5) return 100
    if(value>6.5 && value<=7) return 70
    return 40
  }

  if(type==="ec"){
    if(value>=0.8 && value<=1.5) return 100
    if(value>1.5 && value<=2) return 70
    return 40
  }

  return 0
}

export default function DetailRekomendasi({ open, onClose }: Props) {

  if (!open) return null

  /** DATA SENSOR (sementara statis) */
  const temp = 35
  const moist = 75
  const ph = 6.5
  const ec = 1.8

  /** HITUNG SKOR */
  const score =
  (
    getScore(temp,"temp") +
    getScore(moist,"moist") +
    getScore(ph,"ph") +
    getScore(ec,"ec")
  ) / 4

  const kondisi = Math.round(score)

  let status="Anggrek Sehat"
  let color="green"

  if(kondisi<80){
    status="Perlu Perhatian"
    color="orange"
  }

  if(kondisi<60){
    status="Anggrek Terancam"
    color="red"
  }

  const badgeColor =
  color==="green"
  ? "bg-green-100 text-green-600"
  : color==="orange"
  ? "bg-orange-100 text-orange-600"
  : "bg-red-100 text-red-500"

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >

      {/* MODAL */}
      <div
        className="bg-gray-100 rounded-3xl pt-6 pb-6 px-6 w-[760px]"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CLOSE BUTTON */}
        <div className="flex justify-end pb-[20px]">
          <button onClick={onClose}>
            <Image
              src="/images/close.svg"
              alt="close"
              width={40}
              height={40}
            />
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-[20px]">

          {/* KONDISI TANAMAN */}
          <div className="bg-white rounded-2xl p-6 w-[225px]">

            <Image
              src="/images/kondisi.svg"
              alt="kondisi"
              width={25}
              height={25}
              className="mb-2"
            />

            <p className="text-gray-700 mb-10">
              Kondisi Tanaman
            </p>

            <div className="flex items-end gap-1">
              <span className="text-5xl tracking-[-0.09em]">
                {kondisi}
              </span>

              <span className="text-gray-400 text-2xl">
                %
              </span>
            </div>

            <span className={`inline-block mt-2.5 px-3 py-1 text-sm rounded-full ${badgeColor}`}>
              {status}
            </span>

          </div>


          {/* SUHU */}
          <SensorCard
            icon="/images/temp.svg"
            label="Suhu"
            value={temp.toString()}
            unit="°C"
          />


          {/* KELEMBAPAN */}
          <SensorCard
            icon="/images/moist.svg"
            label="Kelembapan Tanah"
            value={moist.toString()}
            unit="%"
          />


          {/* PH */}
          <SensorCard
            icon="/images/ph.svg"
            label="pH"
            value={ph.toString()}
          />


          {/* INSIGHT */}
          <div className="bg-white rounded-2xl p-6 col-span-2 row-span-2">

            <div className="flex flex-col gap-2">

              <Image
                src="/images/insight.svg"
                alt="insight"
                width={30}
                height={30}
              />

              <p className="text-gray-700 font-medium mb-10">
                Rekomendasi Perlakuan
              </p>
            </div>

            <div className="mt-6">
              <p className="text-gray-700 leading-relaxed">
                Tanaman menunjukkan kondisi yang perlu diperhatikan.
                Suhu lingkungan terlalu tinggi dan kelembapan tanah
                berlebih. Disarankan meningkatkan sirkulasi udara,
                mengurangi frekuensi penyiraman, serta memantau kondisi
                pH tanah secara berkala agar kondisi tanaman kembali
                optimal.
              </p>
            </div>
          </div>

          {/* KONDUKTIVITAS */}
          <SensorCard
            icon="/images/conductivity.svg"
            label="Conductivity"
            value={ec.toString()}
            unit="mS/Cm"
          />
        </div>
      </div>
    </div>
  )
}