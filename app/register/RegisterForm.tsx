"use client";

import { useState } from "react";
import { momoTrust } from "../fonts";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Nama wajib diisi.";
    if (!form.email.trim()) newErrors.email = "Email wajib diisi.";
    if (!form.password) newErrors.password = "Password wajib diisi.";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Konfirmasi password tidak cocok.";
    if (!form.terms) newErrors.terms = "Anda harus menyetujui syarat dan ketentuan.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Data dikirim:", form);
    setSuccess("Registrasi berhasil!");
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto font-[var(--font-poppins)]">
      <div className="text-center mb-9">
        <h2 className={`${momoTrust.className} text-4xl font-bold text-primary mb-2`}>
          Daftar Sekarang
        </h2>
        <p className="text-gray-600 text-[14px]">Ayo buat akun dan mulai langkah besarmu sekarang.</p>
      </div>

      {success && <div className="mb-4 text-primary font-medium text-center">{success}</div>}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2 text-sm font-medium">Nama Lengkap</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Masukkan nama lengkap"
          className="w-full rounded-full border border-gray-300 px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.name && <span className="text-sm text-red-600">{errors.name}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Masukkan email anda"
          className="w-full rounded-full border border-gray-300 px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.email && <span className="text-sm text-red-600">{errors.email}</span>}
      </div>

      <div className="relative mb-4">
        <label className="block text-gray-700 mb-2 text-sm font-medium">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Masukkan password anda"
          className="w-full rounded-full border border-gray-300 px-4 py-3 pr-12 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}
          className="absolute right-5 top-[40px] text-gray-600">
          {showPassword ? <Eye size={23} /> : <EyeOff size={23} />}
        </button>
        {errors.password && <span className="text-sm text-red-600">{errors.password}</span>}
      </div>

      <div className="relative mb-4">
        <label className="block text-gray-700 mb-2 text-sm font-medium">Konfirmasi Password</label>
        <input
          type={showConfirm ? "text" : "password"}
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Konfirmasi password anda"
          className="w-full rounded-full border border-gray-300 px-4 py-3 pr-12 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button type="button" onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-5 top-[40px] text-gray-600">
          {showConfirm ? <Eye size={23} /> : <EyeOff size={23} />}
        </button>
        {errors.confirmPassword && <span className="text-sm text-red-600">{errors.confirmPassword}</span>}
      </div>

      <div className="mb-6">
        <label className="inline-flex items-center cursor-pointer select-none relative">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
            className="
              peer appearance-none
              w-5 h-5 rounded-full 
              border border-gray-300
              transition-all duration-200
              checked:bg-primary checked:border-primary
            "
          />

          {/* SVG centang real, premium */}
          <svg
            className="absolute left-0.5 top-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>

          <span className="ml-3 text-[14px] text-gray-700">
            Saya menyetujui semua syarat dan ketentuan.
          </span>
        </label>

        {errors.terms && (
          <span className="block text-sm text-red-600 mt-1">{errors.terms}</span>
        )}
      </div>



      <button type="submit"
        className="w-full rounded-full bg-primary py-3 text-white font-semibold text-lg hover:bg-primary/80 transition">
        Daftar Sekarang
      </button>

      <p className="mt-4 text-center text-sm text-gray-700">
        Sudah memiliki akun?{" "}
        <a href="/login" className="font-semibold text-primary hover:underline">
          Masuk
        </a>
      </p>
    </form>
  );
}
