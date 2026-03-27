"use client";
import { useState } from "react";
import Image from "next/image";

export default function ControlMenuFloating() {
  const [open, setOpen] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [manualWater, setManualWater] = useState(false);
  const [manualLight, setManualLight] = useState(false);

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-12 right-12 w-16 h-16 rounded-full bg-primary shadow-xl flex items-center justify-center hover:bg-black transition"
        >

        <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">

          <Image
            src="/images/settings.svg"
            alt="settings"
            width={35}
            height={35}
          />

        </div>

      </button>

      {/* PANEL */}
      {open && (
        <div className="fixed bottom-32 right-10 bg-black text-white rounded-2xl p-6 w-[350px] shadow-2xl">

          <h3 className="text-lg font-semibold mb-4">
            Menu Kontrol
          </h3>

          {/* MODE OTOMATIS */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg">Mode Otomatis</span>

            <button
              onClick={() => {
                setAutoMode(!autoMode);
                if (!autoMode === false) {
                  setManualWater(false);
                  setManualLight(false);
                }
              }}
              className={`w-10 h-5 flex items-center rounded-full p-[2px] transition ${
                autoMode ? "bg-green-500" : "bg-gray-500"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full transform transition ${
                  autoMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* PENYIRAMAN */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg">Penyiraman Manual</span>

            <button
              disabled={autoMode}
              onClick={() => setManualWater(!manualWater)}
              className={`w-10 h-5 flex items-center rounded-full p-[2px] transition ${
                manualWater ? "bg-green-500" : "bg-gray-500"
              } ${autoMode ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full transform transition ${
                  manualWater ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* PARANET */}
          <div className="flex justify-between items-center">
            <span className="text-lg">Tutup Paranet Manual</span>

            <button
              disabled={autoMode}
              onClick={() => setManualLight(!manualLight)}
              className={`w-10 h-5 flex items-center rounded-full p-[2px] transition ${
                manualLight ? "bg-green-500" : "bg-gray-500"
              } ${autoMode ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full transform transition ${
                  manualLight ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

        </div>
      )}
    </>
  );
}