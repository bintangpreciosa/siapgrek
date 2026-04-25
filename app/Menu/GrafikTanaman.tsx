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
  envTemp: { label: "Temperature (Env)", color: "#7C3AED", unit: "°C" },
  envHum: { label: "Humidity (Env)", color: "#10B981", unit: "%" },
  light: { label: "Light", color: "#EAB308", unit: "lux" },

  soilTemp: { label: "Temperature (Soil)", color: "#F97316", unit: "°C" },
  soilHum: { label: "Humidity (Soil)", color: "#0EA5E9", unit: "%" },
  soilPH: { label: "pH", color: "#EC4899", unit: "" },
  soilEC: { label: "Conductivity", color: "#F43F5E", unit: "mS/cm" }
};

/* ===============================
   HELPER TIME
================================ */

function getRangeHours(range: string) {
  switch (range) {
    case "last_1h": return 1;
    case "last_6h": return 6;
    case "last_24h": return 24;
    case "today": return 24;
    default: return 6;
  }
}

function getIntervalMinutes(interval: string) {
  switch (interval) {
    case "1 minute": return 1;
    case "5 minutes": return 5;
    case "10 minutes": return 10;
    case "1 hour": return 60;
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

    const label = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit"
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
   VALUE CARD
================================ */

function ValueCard({ title, value, unit, color }: any) {

  return (
    <div className="bg-white rounded-xl p-3 border-l-4" style={{ borderColor: color }}>
      <p className="text-xs text-gray-500">{title}</p>

      <div className="flex items-end gap-1 mt-1">
        <span className="text-lg font-semibold" style={{ color }}>
          {value?.toFixed(1)}
        </span>

        <span className="text-xs text-gray-400">
          {unit}
        </span>
      </div>
    </div>
  );
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Area
            dataKey={dataKey}
            stroke={color}
            fill={color}
            fillOpacity={0.2}
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

  const latest = chartData[chartData.length - 1];

  return (

    <div className="flex flex-col h-full">

      {/* HEADER */}
      <div className="flex justify-between mb-4">

        <h1 className="text-xl font-bold">
          Grafik Monitoring Sensor
        </h1>

        <button
          onClick={() => setActiveMenu("dashboard")}
          className="px-4 py-2 border rounded-lg"
        >
          Kembali
        </button>

      </div>

      {/* SCROLL CONTAINER */}
      <div className="flex-1 overflow-y-auto pr-2 h-[calc(100vh-180px)]">

        {/* FILTER */}
        <div className="flex gap-4 mb-4">
          <RangeGrafik value={range} onChange={setRange}/>
          <IntervalGrafik value={interval} onChange={setInterval}/>
        </div>


        {/* ENV */}
        <div>

          <h2 className="font-semibold mb-2">
            Environment Sensor
          </h2>

          <div className="grid grid-cols-3 gap-3 mb-3">

            <ValueCard
              title="Temperature"
              value={latest?.envTemp}
              unit="°C"
              color="#7C3AED"
            />

            <ValueCard
              title="Humidity"
              value={latest?.envHum}
              unit="%"
              color="#10B981"
            />

            <ValueCard
              title="Light"
              value={latest?.light}
              unit="lux"
              color="#EAB308"
            />

          </div>

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
              title="Light"
              dataKey="light"
              color="#EAB308"
              data={chartData}
            />

          </div>

        </div>


        {/* SOIL */}
        <div className="mt-6">

          <h2 className="font-semibold mb-2">
            Soil Sensor
          </h2>

          <div className="grid grid-cols-4 gap-3 mb-3">

            <ValueCard
              title="Temperature"
              value={latest?.soilTemp}
              unit="°C"
              color="#F97316"
            />

            <ValueCard
              title="Humidity"
              value={latest?.soilHum}
              unit="%"
              color="#0EA5E9"
            />

            <ValueCard
              title="pH"
              value={latest?.soilPH}
              color="#EC4899"
            />

            <ValueCard
              title="Conductivity"
              value={latest?.soilEC}
              unit="mS/cm"
              color="#F43F5E"
            />

          </div>

          <div className="grid grid-cols-4 gap-3">

            <ChartCard
              title="Temperature"
              dataKey="soilTemp"
              color="#F97316"
              data={chartData}
            />

            <ChartCard
              title="Humidity"
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

    </div>

  );
}