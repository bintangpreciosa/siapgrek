"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import { momoTrust } from "../../fonts";


export default function Profile() {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "Hailey Williams",
    email: "haileywilliams@gmail.com",
    gender: "Perempuan",
    domisili: "Bandung"
  });

  /* ================================
     IMAGE STATE
  ================================= */

  const [image, setImage] = useState("/images/User.png");
  const [tempImage, setTempImage] = useState<string | null>(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [showCrop, setShowCrop] = useState(false);


  /* ================================
     FORM CHANGE
  ================================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

  };


  /* ================================
     UPLOAD IMAGE
  ================================= */

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];

    if (file) {

      const reader = new FileReader();

      reader.onloadend = () => {

        setTempImage(reader.result as string);
        setShowCrop(true);

      };

      reader.readAsDataURL(file);

    }

  };


  /* ================================
     SAVE CROP
  ================================= */

  const handleSaveCrop = () => {

    if (tempImage) {
      setImage(tempImage);
    }

    setShowCrop(false);

  };


  return (

    <div className="w-full max-w-xl font-[var(--font-poppins)]">

      {/* TITLE */}
      <div className="mb-9">
        <h2 className={`${momoTrust.className} text-2xl font-bold text-primary mb-2`}>
          Profile Saya
        </h2>
        <p className="text-gray-600 text-[14px]">
          Atur detail profile kamu.
        </p>
      </div>


      {/* FOTO */}
      <div className="flex items-center gap-6 mb-8">

        <div className="relative w-24 h-24">

          <Image
            src={image}
            alt="profile"
            fill
            className="rounded-full object-cover"
          />

        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="rounded-full bg-primary px-6 py-3 text-white text-sm"
        >
          Ganti foto profil
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          className="hidden"
          accept="image/*"
        />

      </div>


      {/* ================================
         MODAL CROP
      ================================= */}

      {showCrop && tempImage && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-[400px]">

            <div className="relative w-full h-[300px]">

              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
              />

            </div>

            {/* ZOOM */}
            <div className="mt-4">

              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
              />

            </div>


            <div className="flex justify-end gap-3 mt-4">

              <button
                onClick={() => setShowCrop(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Batal
              </button>

              <button
                onClick={handleSaveCrop}
                className="px-4 py-2 bg-primary text-white rounded-lg"
              >
                Simpan
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ================================
         FORM (TIDAK DIUBAH)
      ================================= */}

      {/* NAMA */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2 text-sm font-medium">
          Nama Lengkap
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-full border border-gray-300 px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>


      {/* EMAIL */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2 text-sm font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-full border border-gray-300 px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>


      {/* JENIS KELAMIN */}
    <div className="mb-4">
    <label className="block text-gray-700 mb-2 text-sm font-medium">
        Jenis Kelamin
    </label>

    <div className="relative">

        <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        className="
            w-full
            rounded-full
            border border-gray-300
            px-4 py-3 pr-12
            text-[14px]
            appearance-none
            focus:outline-none
            focus:ring-2
            focus:ring-primary
        "
        >
        <option>Perempuan</option>
        <option>Laki-laki</option>
        </select>

        {/* ICON DROPDOWN */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
        </div>

    </div>

    </div>


      {/* DOMISILI */}
      <div className="mb-6">
        <label className="text-sm text-gray-600">
          Domisili
        </label>

        <input
          type="text"
          name="domisili"
          value={form.domisili}
          onChange={handleChange}
          className="w-full mt-2 px-5 py-3 rounded-full border outline-none"
        />
      </div>


      <button
        className="w-full rounded-full bg-primary py-3 text-white font-semibold text-lg hover:bg-primary/80 transition"
      >
        Simpan
      </button>

    </div>
  );
}