'use client'

import WeatherCard from "../../components/WeatherCard"
import EnvironmentCard from "../../components/EnvironmentCard"
import RecommendationCard from "../../components/RecommendationCard"
import ControlMenu from "../../components/ControlMenu"
import SensorCard from "../../components/SensorCard"

type Props = {
  setActiveMenu: (menu: string) => void
}

export default function Dashboard({ setActiveMenu }: Props) {

  const handleLihatGrafik = () => {
    setActiveMenu("grafik")
  }

  return (
    <div className="space-y-6">

      {/* TITLE */}
      <h1 className="text-xl font-bold">Dashboard Monitoring</h1>

      {/* CARD ATAS */}
      <div className="flex gap-4 items-stretch">

        <WeatherCard />

        <EnvironmentCard />

        <RecommendationCard />

        {/* MENU KONTROL */}
        <div className="w-[260px]">
          <ControlMenu />
        </div>

      </div>

      {/* BUTTON */}
      <button
        onClick={handleLihatGrafik}
        className="px-4 py-2 bg-primary text-white rounded-lg"
      >
        Lihat Grafik
      </button>

      {/* CONTAINER SENSOR */}
      <div className="bg-gray-100 rounded-3xl p-6 w-fit">

        <div className="flex gap-[20px]">

          <SensorCard
            icon="/images/temp.svg"
            label="Suhu"
            value="35"
            unit="°C"
          />

          <SensorCard
            icon="/images/moist.svg"
            label="Kelembapan Tanah"
            value="75"
            unit="%"
          />

          <SensorCard
            icon="/images/ph.svg"
            label="pH"
            value="6.5"
          />

          <SensorCard
            icon="/images/conductivity.svg"
            label="Conductivity"
            value="1.8"
            unit="mS/Cm"
          />

        </div>

      </div>

    </div>
  )
}