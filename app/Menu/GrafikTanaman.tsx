"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  selectedId: string | null;
  setActiveMenu: (menu: string) => void;
};

/* ===============================
   🔹 DATA GENERATOR
   =============================== */
function generateData(range: "7d" | "30d" | "1y") {
  const data = [];
  const today = new Date();

  // 📅 7 HARI
  if (range === "7d") {
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      data.push({
        label: date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
        }),
        suhu: 26 + Math.floor(Math.random() * 5),
        kelembapan: 60 + Math.floor(Math.random() * 10),
      });
    }
  }

  // 📅 1 BULAN
  if (range === "30d") {
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      data.push({
        label: date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
        }),
        suhu: 26 + Math.floor(Math.random() * 5),
        kelembapan: 60 + Math.floor(Math.random() * 10),
      });
    }
  }

  // 📅 1 TAHUN (PER BULAN – 12 DATA)
  if (range === "1y") {
    const year = today.getFullYear();

    for (let month = 0; month < 12; month++) {
      const date = new Date(year, month, 1);

      data.push({
        label: date.toLocaleDateString("id-ID", {
          month: "short",
        }),
        suhu: 25 + Math.floor(Math.random() * 6),
        kelembapan: 55 + Math.floor(Math.random() * 15),
      });
    }
  }

  return data;
}

/* ===============================
   🔹 COMPONENT
   =============================== */
export default function GrafikTanaman({
  selectedId,
  setActiveMenu,
}: Props) {
  const [range, setRange] = useState<"7d" | "30d" | "1y">("7d");

  const chartData = generateData(range);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Grafik Suhu & Kelembapan
          </h1>
          <p className="text-sm text-gray-500">
            ID Tanaman: <b>{selectedId ?? "-"}</b>
          </p>
        </div>

        <button
          onClick={() => setActiveMenu("log")}
          className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          ← Kembali ke Log
        </button>
      </div>

      {/* FILTER */}
      <div className="flex gap-2">
        <button
          onClick={() => setRange("7d")}
          className={`px-4 py-2 rounded-lg text-sm font-medium border ${
            range === "7d"
              ? "bg-primary text-white"
              : "bg-white text-gray-600"
          }`}
        >
          7 Hari
        </button>

        <button
          onClick={() => setRange("30d")}
          className={`px-4 py-2 rounded-lg text-sm font-medium border ${
            range === "30d"
              ? "bg-primary text-white"
              : "bg-white text-gray-600"
          }`}
        >
          1 Bulan
        </button>

        <button
          onClick={() => setRange("1y")}
          className={`px-4 py-2 rounded-lg text-sm font-medium border ${
            range === "1y"
              ? "bg-primary text-white"
              : "bg-white text-gray-600"
          }`}
        >
          1 Tahun
        </button>
      </div>

      {/* GRAFIK */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-6xl bg-white rounded-xl p-6 shadow-sm">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="label"
                tickMargin={12}
                padding={{ left: 20, right: 20 }}
              />

              <YAxis
                width={55}
                domain={[0, "dataMax + 5"]}
                tickMargin={10}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="suhu"
                stroke="#7C3AED"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Suhu (°C)"
              />

              <Line
                type="monotone"
                dataKey="kelembapan"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Kelembapan (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
