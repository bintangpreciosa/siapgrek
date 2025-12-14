"use client";

import { useState } from "react";
import { momoTrust } from "../fonts";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation"; // TAMBAHAN

export default function LoginForm() {
  const router = useRouter(); // TAMBAHAN

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const newErrors: { [key: string]: string } = {};
    if (!form.email.trim()) newErrors.email = "Email wajib diisi.";
    if (!form.password) newErrors.password = "Password wajib diisi.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Login Data:", form);
    setSuccess("Login berhasil!");

    // 🔥 REDIRECT ke dashboard (app/page.tsx)
    setTimeout(() => {
      router.push("/");
    }, 800); // Delay 0.8 detik biar pesan sukses keliatan dulu
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto font-[var(--font-poppins)]">
      <div className="text-center mb-9">
        <h2 className={`${momoTrust.className} text-4xl font-bold text-primary mb-2`}>
          Selamat Datang Kembali
        </h2>
        <p className="text-gray-600 text-[14px]">
          Selamat datang kembali, ayo lanjutkan hal-hal baik kamu disini!
        </p>
      </div>

      {success && <div className="mb-4 text-primary font-medium text-center">{success}</div>}

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
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-5 top-[40px] text-gray-600"
        >
          {showPassword ? <Eye size={23} /> : <EyeOff size={23} />}
        </button>
        {errors.password && <span className="text-sm text-red-600">{errors.password}</span>}
      </div>

      <div className="mb-6 text-right">
        <a href="/forgot-password" className="text-primary text-[14px] hover:underline">
          Lupa password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-primary py-3 text-white font-semibold text-lg hover:bg-primary/80 transition"
      >
        Masuk
      </button>

      <p className="mt-4 text-center text-sm text-gray-700">
        Belum memiliki akun?{" "}
        <a href="/register" className="font-semibold text-primary hover:underline">
          Daftar
        </a>
      </p>
    </form>
  );
}
