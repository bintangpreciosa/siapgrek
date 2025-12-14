"use client";
import { useState } from "react";

export default function ControlMenu() {
  const [autoMode, setAutoMode] = useState(true);
  const [manualWater, setManualWater] = useState(false);
  const [manualLight, setManualLight] = useState(false);

  return (
    <div className="bg-pink-50 p-6 rounded-2xl w-[350px] mt-5">
      <h3 className="font-bold text-lg mb-4 text-purple-900">
        Menu Kontrol
      </h3>

      {/* MODE OTOMATIS */}
      <div className="flex justify-between items-center mb-4">
        <span className="font-medium text-purple-900">
          Mode Otomatis
        </span>

        <button
          onClick={() => {
            setAutoMode(!autoMode);
            if (!autoMode === false) {
              setManualWater(false);
              setManualLight(false);
            }
          }}
          className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
            autoMode ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow transform transition ${
              autoMode ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* PENYIRAMAN MANUAL */}
      <div className="flex justify-between items-center mb-4">
        <span className="font-medium text-purple-900">
          Penyiraman Manual
        </span>

        <button
          disabled={autoMode}
          onClick={() => setManualWater(!manualWater)}
          className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
            manualWater ? "bg-green-500" : "bg-gray-400"
          } ${autoMode ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow transform transition ${
              manualWater ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* LAMPU MANUAL */}
      <div className="flex justify-between items-center">
        <span className="font-medium text-purple-900">
          Tutup Paranet
        </span>

        <button
          disabled={autoMode}
          onClick={() => setManualLight(!manualLight)}
          className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
            manualLight ? "bg-green-500" : "bg-gray-400"
          } ${autoMode ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow transform transition ${
              manualLight ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
