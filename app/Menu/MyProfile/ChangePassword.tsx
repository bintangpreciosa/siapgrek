"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { momoTrust } from "../../fonts";

export default function ChangePassword() {

  const [form, setForm] = useState({
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState<any>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

  };

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    const newErrors: any = {};

    if (!form.password) {
      newErrors.password = "Password wajib diisi";
    }

    if (form.password.length < 6) {
      newErrors.password = "Minimal 6 karakter";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Password tidak sama";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Password berhasil diubah");
    }

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl font-[var(--font-poppins)]"
    >

      <div className="mb-9">

        <h2 className={`${momoTrust.className} text-2xl font-bold text-primary mb-2`}>
          Ganti Password
        </h2>

        <p className="text-gray-600 text-[14px]">
          Ingin mengganti password?
        </p>

      </div>


      {/* PASSWORD */}
      <div className="relative mb-4">

        <label className="block text-gray-700 mb-2 text-sm font-medium">
          Password Baru
        </label>

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full rounded-full border border-gray-300 px-4 py-3 pr-12 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-5 top-[40px]"
        >
          {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
        </button>

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password}
          </p>
        )}

      </div>


      {/* CONFIRM */}
      <div className="relative mb-6">

        <label className="block text-gray-700 mb-2 text-sm font-medium">
          Konfirmasi Password
        </label>

        <input
          type={showConfirm ? "text" : "password"}
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full rounded-full border border-gray-300 px-4 py-3 pr-12 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-5 top-[40px]"
        >
          {showConfirm ? <Eye size={22} /> : <EyeOff size={22} />}
        </button>

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword}
          </p>
        )}

      </div>


      <button
        type="submit"
        className="w-full rounded-full bg-primary py-3 text-white font-semibold text-lg hover:bg-primary/80 transition"
      >
        Simpan
      </button>

    </form>
  );
}