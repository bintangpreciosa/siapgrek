"use client";

import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";

type DiseaseRow = {
  id: number;
  imgUrl: string;
  result: string;
  accuracy: string;
  description: string;
  date: string;
};

export default function Penyakit() {
  const [rows, setRows] = useState<DiseaseRow[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    const today = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // sementara deteksinya dummy, nanti bisa diganti hasil dari API / model ML
    const newRow: DiseaseRow = {
      id: rows.length + 1,
      imgUrl: url,
      result: "Busuk Daun",
      accuracy: "98,83%",
      description: "Tidak ada deskripsi",
      date: today,
    };

    setRows((prev) => [...prev, newRow]);

    // reset input agar bisa upload file yang sama lagi kalau perlu
    e.target.value = "";
  };

  return (
    <div className="space-y-6">
      {/* TITLE */}
      <h1 className="text-2xl font-bold text-gray-900">
        Klasifikasi Penyakit
      </h1>

      {/* BUTTON + INPUT HIDDEN */}
      <div>
        <button
          type="button"
          onClick={handleUploadClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition"
        >
          <ImagePlus size={18} />
          Unggah Foto
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* TABEL */}
      <div className="mt-2 bg-white rounded-2xl p-4 shadow-sm">
        <table className="w-full text-sm text-left text-gray-700">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-3">No</th>
              <th className="py-3">Gambar</th>
              <th className="py-3">Hasil</th>
              <th className="py-3">Akurasi</th>
              <th className="py-3">Deskripsi</th>
              <th className="py-3">Tanggal</th>
              <th className="py-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-6 text-center text-gray-400 text-sm"
                >
                  Belum ada data. Unggah foto untuk mulai klasifikasi.
                </td>
              </tr>
            )}

            {rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-200">
                <td className="py-3">{row.id}</td>

                <td className="py-3">
                  <div className="w-20 h-14 rounded overflow-hidden border">
                    {/* pakai <img> biasa karena blob URL */}
                    <img
                      src={row.imgUrl}
                      alt={row.result}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>

                <td className="py-3">
                  <span className="inline-block rounded-full bg-green-600 text-white text-xs px-3 py-1">
                    {row.result}
                  </span>
                </td>

                <td className="py-3">{row.accuracy}</td>
                <td className="py-3">{row.description}</td>
                <td className="py-3 whitespace-pre-line">{row.date}</td>

                <td className="py-3 text-blue-600 text-xs font-medium">
                  Detail
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
