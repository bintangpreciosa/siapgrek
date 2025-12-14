"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function EnvironmentCard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/sensor").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white w-[420px]">
      <h3 className="font-semibold mb-6">Informasi Lingkungan</h3>

      {data ? (
        <div className="flex justify-between">
          <div>
            <p className="text-sm">Suhu</p>
            <p className="text-xl font-bold">{data.suhu}°C</p>
          </div>
          <div>
            <p className="text-sm">Kelembapan</p>
            <p className="text-xl font-bold">{data.kelembapan}%</p>
          </div>
          <div>
            <p className="text-sm">Cahaya</p>
            <p className="text-xl font-bold">{data.cahaya}</p>
          </div>
        </div>
      ) : (
        <p>Loading lingkungan...</p>
      )}
    </div>
  );
}
