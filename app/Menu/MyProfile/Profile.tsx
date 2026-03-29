"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import { momoTrust } from "../../fonts";
import { useUser } from "@/app/context/UserContext";
import Snackbar from "@/components/Snackbar";

export default function Profile() {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { profileImage, setProfileImage, username, setUsername } = useUser();

  const [form, setForm] = useState({
    name: username,
    email: "haileywilliams@gmail.com",
    gender: "Perempuan",
    domisili: "Bandung"
  });

  const [image, setImage] = useState(profileImage);
  const [tempImage, setTempImage] = useState<string | null>(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const [showCrop, setShowCrop] = useState(false);

  useEffect(() => {
  setForm(prev => ({
    ...prev,
    name: username
  }));

  setImage(profileImage);

}, [username, profileImage]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error"
  });


  /* ================================
     HANDLE FORM
  ================================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

  };


  /* ================================
     HANDLE UPLOAD
  ================================= */

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {

      setSnackbar({
        open: true,
        message: "Format foto harus JPG, PNG, atau WEBP",
        type: "error"
      });

      return;
    }

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {

      setSnackbar({
        open: true,
        message: "Ukuran foto maksimal 2MB",
        type: "error"
      });

      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {

      setTempImage(reader.result as string);
      setShowCrop(true);

    };

    reader.readAsDataURL(file);

  };


  /* ================================
     CROP
  ================================= */

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);


const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = document.createElement("img");

    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);

    image.src = url;
  });


  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: any
  ) => {

    const image = await createImage(imageSrc);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx?.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return canvas.toDataURL("image/jpeg");

  };


  /* ================================
     SAVE CROP
  ================================= */

  const handleSaveCrop = async () => {

    try {

      const croppedImage = await getCroppedImg(
        tempImage!,
        croppedAreaPixels
      );

      setImage(croppedImage);
      setProfileImage(croppedImage);

      setSnackbar({
        open: true,
        message: "Foto profil berhasil diperbarui",
        type: "success"
      });

      setShowCrop(false);

    } catch (e) {

      setSnackbar({
        open: true,
        message: "Gagal crop gambar",
        type: "error"
      });

    }

  };


  /* ================================
     SAVE FORM
  ================================= */

  const handleSave = () => {

    if (!form.name || !form.email) {

      setSnackbar({
        open: true,
        message: "Data belum lengkap",
        type: "error"
      });

      return;
    }

    setUsername(form.name);

    setSnackbar({
      open: true,
      message: "Profil berhasil disimpan",
      type: "success"
    });

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


      {/* MODAL CROP */}

      {showCrop && tempImage && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">

          <div className="bg-white rounded-2xl p-6 w-[420px]">

            <div className="relative w-full h-[320px]">

              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />

            </div>

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


      {/* FORM */}

      <div className="mb-4">

        <label className="block text-gray-700 mb-2 text-sm font-medium">
          Nama Lengkap
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-full border px-4 py-3"
        />

      </div>


      <div className="mb-4">

        <label className="block text-gray-700 mb-2 text-sm font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-full border px-4 py-3"
        />

      </div>


      <div className="mb-4">

        <label className="block text-gray-700 mb-2 text-sm font-medium">
          Jenis Kelamin
        </label>

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full rounded-full border px-4 py-3"
        >
          <option>Perempuan</option>
          <option>Laki-laki</option>
        </select>

      </div>


      <div className="mb-6">

        <label className="block text-gray-700 mb-2 text-sm font-medium">
          Domisili
        </label>

        <input
          type="text"
          name="domisili"
          value={form.domisili}
          onChange={handleChange}
          className="w-full rounded-full border px-4 py-3"
        />

      </div>


      <button
        onClick={handleSave}
        className="w-full rounded-full bg-primary py-3 text-white"
      >
        Simpan
      </button>


      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() =>
          setSnackbar({ ...snackbar, open: false })
        }
      />

    </div>
  );
}