"use client"

import { useEffect, useState } from "react"

export default function WeatherCard() {
  const [weather, setWeather] = useState<any>(null)
  const [location, setLocation] = useState("Mendeteksi lokasi...")
  const [icon, setIcon] = useState("🌤️")

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation("Browser tidak mendukung lokasi")
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude

        try {
          /** ✅ AMBIL DATA CUACA + HUMIDITY */
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weathercode,windspeed_10m`
          )
          const weatherData = await weatherRes.json()

          const current = weatherData.current
          setWeather(current)

          /** ✅ TENTUKAN ICON */
          setIcon(getWeatherIcon(current.weathercode))

          /** ✅ AMBIL NAMA LOKASI */
          const locRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          )

          const locData = await locRes.json()
          const addr = locData.address

          const city =
            addr.city ||
            addr.town ||
            addr.village ||
            addr.county ||
            "Lokasi tidak diketahui"

          const province = addr.state || ""

          setLocation(`${city}, ${province}`)
        } catch (error) {
          console.error(error)
          setLocation("Gagal memuat lokasi")
        }
      },
      () => {
        setLocation("Izin lokasi ditolak")
      }
    )
  }, [])

  const getWeatherIcon = (code: number) => {
    if (code === 0) return "☀️"
    if (code <= 2) return "🌤️"
    if (code <= 45) return "🌫️"
    if (code <= 55) return "🌧️"
    if (code <= 65) return "🌧️"
    if (code <= 75) return "❄️"
    if (code <= 86) return "🌨️"
    if (code >= 95) return "⛈️"
    return "🌡️"
  }

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-4 text-white w-[360px]">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Informasi Cuaca</h3>
        <span className="text-2xl">{icon}</span>
      </div>

      {weather ? (
        <>
          <p className="text-3xl font-bold mt-2">
            {weather.temperature_2m}°C
          </p>

          <p className="text-xs opacity-90">
            {location}
          </p>

          <div className="flex mt-3 text-xs">
            <span>💨 {weather.windspeed_10m} km/h</span>
            <span className="mx-4">|</span>
            <span>💧 {weather.relative_humidity_2m}%</span>
          </div>
        </>
      ) : (
        <p className="text-sm mt-3">Loading cuaca...</p>
      )}
    </div>
  )
}
