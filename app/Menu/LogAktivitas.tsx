"use client";

import { useState } from "react";

const logs = [
  { time: "14:02", id: "ID0001", type: "Sensor",  message: "Suhu 30°C",          status: "Normal" },
  { time: "14:05", id: "ID0001", type: "Sensor",  message: "Kelembapan 68%",      status: "Normal" },
  { time: "14:10", id: "ID0003", type: "Anomali", message: "Anomali terdeteksi",  status: "Bahaya" },
];

export default function LogAktivitas() {
  const [selectedId, setSelectedId] = useState("ID0001");
  const filtered = logs.filter(log => log.id === selectedId);

  const statusStyle = (s: string) =>
    s === "Bahaya"
      ? "bg-red-100 text-red-600"
      : "bg-green-100 text-green-600";

  return (
    <div className="flex flex-col h-full gap-3">

      {/* TITLE */}
      <div>
        <h1 className="text-base lg:text-xl font-bold text-gray-800">Log Aktivitas</h1>
        <p className="text-xs lg:text-sm text-gray-500">Riwayat aktivitas sensor, anomali, dan sistem</p>
      </div>

      {/* FILTER */}
      <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl p-2.5">
        <span className="text-xs text-gray-600 flex-shrink-0">ID Tanaman:</span>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="border rounded-lg px-2.5 py-1 text-xs focus:outline-none bg-white"
        >
          <option>ID0001</option>
          <option>ID0002</option>
          <option>ID0003</option>
        </select>
        <span className="text-[10px] text-gray-400 ml-auto">{filtered.length} entri</span>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden sm:block flex-1 overflow-auto">
        <table className="w-full border-collapse text-xs lg:text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              {["Waktu", "ID Tanaman", "Jenis", "Aktivitas", "Status"].map(h => (
                <th key={h} className="px-3 py-2.5 font-semibold first:rounded-l-lg last:rounded-r-lg">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400 text-xs">Tidak ada log untuk ID ini.</td>
              </tr>
            ) : filtered.map((log, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-3 py-2.5">{log.time}</td>
                <td className="px-3 py-2.5 font-medium">{log.id}</td>
                <td className="px-3 py-2.5">{log.type}</td>
                <td className="px-3 py-2.5">{log.message}</td>
                <td className="px-3 py-2.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] lg:text-xs font-medium ${statusStyle(log.status)}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD LIST */}
      <div className="sm:hidden flex-1 overflow-y-auto space-y-2">
        {filtered.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-400 text-xs">
            Tidak ada log untuk ID ini.
          </div>
        ) : filtered.map((log, idx) => (
          <div key={idx} className="bg-gray-50 rounded-xl p-3 flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-semibold text-gray-500">{log.time}</span>
                <span className="text-[10px] text-gray-400">·</span>
                <span className="text-[10px] font-medium text-gray-700">{log.id}</span>
                <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-medium ${statusStyle(log.status)}`}>
                  {log.status}
                </span>
              </div>
              <p className="text-xs text-gray-800">{log.message}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{log.type}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}