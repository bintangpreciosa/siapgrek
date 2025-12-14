'use client'

import { useState } from "react"
import WeatherCard from "../components/WeatherCard"
import EnvironmentCard from "../components/EnvironmentCard"
import Gauge from "../components/Gauge"
import ControlMenu from "../components/ControlMenu";


/** ✅ DAFTAR DEVICE ID */
const IDS = ["ID0001","ID0002","ID0003","ID0004","ID0005","ID0006","ID0007"]

export default function Dashboard() {
  const [activeId, setActiveId] = useState("ID0001")

  return (
    <div className="space-y-4">

      {/* TITLE */}
      <h1 className="text-xl font-bold">Dashboard Monitoring</h1>

      {/* WEATHER + ENVIRONMENT */}
      <div className="flex gap-4">
        <WeatherCard />
        <EnvironmentCard />
      </div>

      {/* ✅ SELECTOR ID */}
      <div className="flex gap-2 mt-2 overflow-x-auto">
        {IDS.map(id => (
          <button
            key={id}
            onClick={() => setActiveId(id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition
              ${activeId === id
                ? "bg-purple-100 text-purple-700 border-purple-400"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"}
            `}
          >
            🌱 {id}
          </button>
        ))}
      </div>

      {/* ✅ KONTEN DINAMIS (GAUGE & KONTROL) */}
      <div className="flex gap-5 mt-10">
        <Gauge value={28} label="Suhu" />
        <Gauge value={80} label="Kelembapan" />
        <ControlMenu />
      </div>
    </div>
  )
}
