'use client'

import { useState } from "react"

import WeatherCard from "../../components/WeatherCard"
import EnvironmentCard from "../../components/EnvironmentCard"
import RecommendationCard from "../../components/RecommendationCard"
import ControlMenu from "../../components/ControlMenu"
import SensorCard from "../../components/SensorCard"

type Props = {
  setActiveMenu: (menu: string) => void
}

export default function Dashboard({ setActiveMenu }: Props) {

  const [selectedPlant, setSelectedPlant] = useState("ID001")

  /* ===============================
     DATA SENSOR PER TANAMAN
  ============================== */
  const soilData: any = {
    ID001: {
      temp: 35,
      humidity: 75,
      ph: 6.7,
      ec: 1.8
    },
    ID002: {
      temp: 28,
      humidity: 60,
      ph: 6.2,
      ec: 1.3
    },
    ID003: {
      temp: 30,
      humidity: 68,
      ph: 6.5,
      ec: 1.5
    }
  }

  const handleLihatGrafik = () => {
    setActiveMenu("grafik")
  }

  const currentData = soilData[selectedPlant]

  return (
    <div className="space-y-6">

      {/* TITLE */}
      <h1 className="text-xl font-bold">Dashboard Monitoring</h1>

      {/* CARD ATAS */}
      <div className="flex gap-4 items-stretch">

        <WeatherCard />

        <EnvironmentCard />

        <RecommendationCard setActiveMenu={setActiveMenu} />

        {/* MENU KONTROL */}
        <div className="w-[260px]">
          <ControlMenu />
        </div>

      </div>


      {/* DROPDOWN + BUTTON */}
      <div className="flex items-center gap-4">

        <select
          value={selectedPlant}
          onChange={(e) => setSelectedPlant(e.target.value)}
          className="px-3 py-2 border rounded-lg bg-white"
        >
          <option value="ID001">ID 001</option>
          <option value="ID002">ID 002</option>
          <option value="ID003">ID 003</option>
        </select>

        <button
          onClick={handleLihatGrafik}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Lihat Grafik
        </button>

      </div>


      {/* STATUS AKTUATOR */}
      <div className="bg-gray-100 rounded-2xl p-3 w-fit">

        <div className="flex gap-3">

          {/* MISTING */}
          <div className="bg-white rounded-xl px-3 py-2 w-[120px] shadow-sm">

            <div className="flex items-center gap-2 mb-1">
              <img src="/images/misting.svg" className="w-4" />
              <span className="text-xs">Misting</span>
            </div>

            <div className="text-lg font-semibold text-green-600">
              ON
            </div>

          </div>


          {/* WATERING */}
          <div className="bg-white rounded-xl px-3 py-2 w-[120px] shadow-sm">

            <div className="flex items-center gap-2 mb-1">
              <img src="/images/watering.svg" className="w-4" />
              <span className="text-xs">Watering</span>
            </div>

            <div className="text-lg font-semibold text-red-700">
              OFF
            </div>

          </div>

        </div>

      </div>
      <div className="bg-gray-100 rounded-3xl p-6 w-fit">

        <div className="flex gap-[20px]">

          <SensorCard
            icon="/images/temp.svg"
            label="Suhu"
            value={currentData.temp}
            unit="°C"
          />

          <SensorCard
            icon="/images/moist.svg"
            label="Kelembapan Tanah"
            value={currentData.humidity}
            unit="%"
          />

          <SensorCard
            icon="/images/ph.svg"
            label="pH"
            value={currentData.ph}
          />

          <SensorCard
            icon="/images/conductivity.svg"
            label="Conductivity"
            value={currentData.ec}
            unit="mS/Cm"
          />

        </div>

      </div>

    </div>
  )
}

