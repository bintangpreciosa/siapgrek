"use client"

import Image from "next/image"

type Props = {
  icon: string
  label: "Suhu" | "Kelembapan Tanah" | "pH" | "Conductivity"
  value: string
  unit?: string
}

export default function SensorCard({
  icon,
  label,
  value,
  unit
}: Props) {

  const val = parseFloat(value)

  let color: "green" | "yellow" | "red" = "green"
  let status = ""

  if (label === "Suhu") {
    if (val < 18) {
      color = "yellow"
      status = "Terlalu dingin"
    } else if (val <= 30) {
      color = "green"
      status = "Suhu ideal"
    } else {
      color = "red"
      status = "Terlalu panas"
    }
  }

  if (label === "Kelembapan Tanah") {
    if (val < 40) {
      color = "red"
      status = "Tanah terlalu kering"
    } else if (val <= 70) {
      color = "green"
      status = "Kelembapan ideal"
    } else {
      color = "yellow"
      status = "Terlalu lembap"
    }
  }

  if (label === "pH") {
    if (val < 5.5) {
      color = "red"
      status = "pH terlalu asam"
    } else if (val <= 6.5) {
      color = "green"
      status = "pH ideal"
    } else {
      color = "yellow"
      status = "pH terlalu basa"
    }
  }

  if (label === "Conductivity") {
    if (val < 0.8) {
      color = "yellow"
      status = "Nutrisi rendah"
    } else if (val <= 1.5) {
      color = "green"
      status = "Nutrisi ideal"
    } else {
      color = "red"
      status = "Nutrisi berlebih"
    }
  }

  const statusIcon = {
    green: "/images/green.svg",
    yellow: "/images/yellow.svg",
    red: "/images/red.svg"
  }

  return (
    <div className="bg-white rounded-2xl p-6 w-[225px]">

      {/* ICON */}
      <Image
        src={icon}
        alt={label}
        width={30}
        height={30}
        className="mb-1"
      />

      {/* TITLE */}
      <p className="text-gray-700 mb-10">
        {label}
      </p>

      {/* VALUE */}
      <div className="flex items-end gap-1">

        <span className="text-5xl font-normal leading-none tracking-[-0.09em] tabular-nums">
          {value}
        </span>

        {unit && (
          <span className="text-gray-400 text-2xl">
            {unit}
          </span>
        )}

      </div>

      {/* STATUS */}
      <div className="flex items-center gap-2 mt-2.5">

        <Image
          src={statusIcon[color]}
          alt={color}
          width={20}
          height={20}
        />

        <p className="text-gray-600 text-base">
          {status}
        </p>

      </div>

    </div>
  )
}