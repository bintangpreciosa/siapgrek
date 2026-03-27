"use client";

import { useState, useMemo } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

import RangeGrafik from "../../components/RangeGrafik";
import IntervalGrafik from "../../components/IntervalGrafik";
import ParameterGrafik from "../../components/ParameterGrafik";

type Props = {
  setActiveMenu: (menu: string) => void;
};

/* ===============================
   PARAMETER CONFIG
================================ */
const parameterMap: any = {
  "Env temp": { key: "envTemp", color: "#7C3AED" },
  "Env hum": { key: "envHum", color: "#10B981" },
  "Soil temp": { key: "soilTemp", color: "#F97316" },
  "Soil hum": { key: "soilHum", color: "#0EA5E9" },
  "Soil pH": { key: "soilPH", color: "#EC4899" },
  "Soil conductivity": { key: "soilEC", color: "#F43F5E" },
  Light: { key: "light", color: "#EAB308" }
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
   GENERATE DATA DINAMIS
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
   COMPONENT
================================ */
export default function GrafikTanaman({
  setActiveMenu
}: Props) {

  const [range, setRange] = useState("today");
  const [interval, setInterval] = useState("1 hour");

  const [parameters, setParameters] = useState<string[]>([
    "Env temp",
    "Env hum"
  ]);

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
        <ParameterGrafik value={parameters} onChange={setParameters} />
      </div>

      {/* CHART */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-6xl bg-white rounded-2xl p-6 shadow-sm">

          <ResponsiveContainer width="100%" height={450}>
            <AreaChart data={chartData}>

              {/* 🔥 GRADIENT */}
              <defs>
                <linearGradient id="gradientZone" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.7} />
                  <stop offset="50%" stopColor="#facc15" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0.7} />
                </linearGradient>
              </defs>

              {/* GRID */}
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
              />

              {/* X */}
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />

              {/* Y */}
              <YAxis
                tick={{ fontSize: 12 }}
                domain={["auto", "auto"]}
              />

              {/* TOOLTIP */}
              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                }}
              />

              {/* LEGEND */}
              <Legend />

              {/* 🔥 AREA + LINE */}
              {parameters.map((param) => {
                const config = parameterMap[param];

                return (
                  <Area
                    key={param}
                    type="monotone"
                    dataKey={config.key}
                    stroke={config.color}
                    strokeWidth={3}
                    fill="url(#gradientZone)"
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                );
              })}

            </AreaChart>
          </ResponsiveContainer>

        </div>
      </div>
    </div>
  );
}