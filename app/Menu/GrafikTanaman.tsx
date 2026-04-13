"use client";

import { useState, useMemo } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import RangeGrafik from "../../components/RangeGrafik";
import IntervalGrafik from "../../components/IntervalGrafik";

type Props = {
  setActiveMenu: (menu: string) => void;
};

/* ===============================
   PARAMETER CONFIG
================================ */
const parameterMap: any = {
  envTemp: { label: "Temperature (Env)", color: "#7C3AED" },
  envHum: { label: "Humidity (Env)", color: "#10B981" },
  light: { label: "Light Intensity", color: "#EAB308" },

  soilTemp: { label: "Temperature (Soil)", color: "#F97316" },
  soilHum: { label: "Humidity (Soil)", color: "#0EA5E9" },
  soilPH: { label: "pH", color: "#EC4899" },
  soilEC: { label: "Conductivity", color: "#F43F5E" }
};

/* ===============================
   HELPER TIME
================================ */
function getRangeHours(range: string) {
  switch (range) {
    case "last_5m": return 5 / 60;
    case "last_15m": return 15 / 60;
    case "last_1h": return 1;
    case "last_6h": return 6;
    case "last_24h": return 24;
    case "last_7d": return 24 * 7;
    case "last_30d": return 24 * 30;
    case "today": return 24;
    default: return 6;
  }
}

function getIntervalMinutes(interval: string) {
  switch (interval) {
    case "10 seconds": return 1 / 6;
    case "30 seconds": return 0.5;
    case "1 minute": return 1;
    case "5 minutes": return 5;
    case "10 minutes": return 10;
    case "15 minutes": return 15;
    case "30 minutes": return 30;
    case "1 hour": return 60;
    case "6 hours": return 360;
    case "12 hours": return 720;
    case "1 day": return 1440;
    default: return 60;
  }
}

/* ===============================
   GENERATE DATA
================================ */
function generateData(range: string, interval: string) {
  const data: any[] = [];

  const totalHours = getRangeHours(range);
  const stepMinutes = getIntervalMinutes(interval);

  const now = new Date();
  const totalPoints = Math.floor((totalHours * 60) / stepMinutes);

  for (let i = totalPoints; i >= 0; i--) {
    const date = new Date(now);
    date.setMinutes(now.getMinutes() - i * stepMinutes);

    const label =
      totalHours <= 24
        ? date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit"
          })
        : date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short"
          });

    data.push({
      label,
      envTemp: 26 + Math.random() * 4,
      envHum: 60 + Math.random() * 10,
      soilTemp: 25 + Math.random() * 4,
      soilHum: 50 + Math.random() * 15,
      soilPH: 5.5 + Math.random(),
      soilEC: 1 + Math.random(),
      light: 500 + Math.random() * 200
    });
  }

  return data;
}

/* ===============================
   CHART CARD
================================ */
function ChartCard({
  title,
  dataKey,
  color,
  data
}: any) {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm">
      <h3 className="text-xs font-semibold mb-1">
        {title}
      </h3>

      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={data}>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="label"
            tick={{ fontSize: 10 }}
          />

          <YAxis
            tick={{ fontSize: 10 }}
            domain={["auto", "auto"]}
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fill={color}
            fillOpacity={0.2}
            strokeWidth={2}
            dot={false}
          />

        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ===============================
   COMPONENT
================================ */
export default function GrafikTanaman({
  setActiveMenu
}: Props) {

  const [range, setRange] = useState("today");
  const [interval, setInterval] = useState("1 hour");

  const chartData = useMemo(
    () => generateData(range, interval),
    [range, interval]
  );

  return (
    <div className="flex flex-col gap-4 h-full">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">
          Grafik Monitoring Sensor
        </h1>

        <button
          onClick={() => setActiveMenu("dashboard")}
          className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Kembali
        </button>
      </div>

      {/* FILTER */}
      <div className="flex gap-4 items-start">
        <RangeGrafik value={range} onChange={setRange} />
        <IntervalGrafik value={interval} onChange={setInterval} />
      </div>

      {/* ENV SECTION */}
      <div>
        <h2 className="text-lg font-semibold mb-3">
          Environment Sensor
        </h2>

        <div className="grid grid-cols-3 gap-3">

          <ChartCard
            title="Temperature (Env)"
            dataKey="envTemp"
            color="#7C3AED"
            data={chartData}
          />

          <ChartCard
            title="Humidity (Env)"
            dataKey="envHum"
            color="#10B981"
            data={chartData}
          />

          <ChartCard
            title="Light Intensity"
            dataKey="light"
            color="#EAB308"
            data={chartData}
          />

        </div>
      </div>

      {/* SOIL SECTION */}
      <div>
        <h2 className="text-lg font-semibold mt-4 mb-3">
          Soil Sensor
        </h2>

        <div className="grid grid-cols-4 gap-3">

          <ChartCard
            title="Temperature (Soil)"
            dataKey="soilTemp"
            color="#F97316"
            data={chartData}
          />

          <ChartCard
            title="Humidity (Soil)"
            dataKey="soilHum"
            color="#0EA5E9"
            data={chartData}
          />

          <ChartCard
            title="pH"
            dataKey="soilPH"
            color="#EC4899"
            data={chartData}
          />

          <ChartCard
            title="Conductivity"
            dataKey="soilEC"
            color="#F43F5E"
            data={chartData}
          />

        </div>
      </div>

    </div>
  );
}
