"use client";

import { useState } from "react";

type Props = {
  setActiveMenu: (menu: string) => void;
  setSelectedGrafikId: (id: string) => void;
};

const logs = [
  {
    time: "14:02",
    id: "ID0001",
    type: "Sensor",
    message: "Suhu 30°C",
    status: "Normal",
  },
  {
    time: "14:05",
    id: "ID0001",
    type: "Sensor",
    message: "Kelembapan 68%",
    status: "Normal",
  },
  {
    time: "14:10",
    id: "ID0003",
    type: "Anomali",
    message: "Anomali terdeteksi",
    status: "Bahaya",
  },
];

export default function LogAktivitas({
  setActiveMenu,
  setSelectedGrafikId,
}: Props) {
  const [selectedId, setSelectedId] = useState("ID0001");

  const handleLihatGrafik = () => {
    setSelectedGrafikId(selectedId);
    setActiveMenu("grafik");
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* TITLE */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">Log Aktivitas</h1>
        <p className="text-sm text-gray-500">
          Riwayat aktivitas sensor, anomali, dan sistem
        </p>
      </div>

      {/* CONTROL BAR */}
      <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">ID Tanaman:</span>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="border rounded-lg px-3 py-1 text-sm focus:outline-none"
          >
            <option>ID0001</option>
            <option>ID0002</option>
            <option>ID0003</option>
          </select>
        </div>

        <button
          onClick={handleLihatGrafik}
          className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary"
        >
          Lihat Grafik
        </button>
      </div>

      {/* TABLE */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="p-3">Waktu</th>
              <th className="p-3">ID Tanaman</th>
              <th className="p-3">Jenis</th>
              <th className="p-3">Aktivitas</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {logs
              .filter((log) => log.id === selectedId)
              .map((log, idx) => (
                <tr key={idx} className="border-b text-sm hover:bg-gray-50">
                  <td className="p-3">{log.time}</td>
                  <td className="p-3 font-medium">{log.id}</td>
                  <td className="p-3">{log.type}</td>
                  <td className="p-3">{log.message}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.status === "Bahaya"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
