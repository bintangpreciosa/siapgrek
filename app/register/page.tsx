import Image from "next/image";
import RegisterForm from "./RegisterForm";
import { momoTrust } from "../fonts";

export default function RegisterPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT SIDE */}
      <div className="hidden md:flex items-center justify-center bg-white p-6">
        <div className="relative w-full h-full rounded-[7%] overflow-hidden">
          <Image
            src="/images/anggrek.jpg"
            alt="Anggrek"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-black bg-opacity-40" />

          {/* LOGO DIPERKECIL */}
          <div className="absolute bottom-[180px] left-1/2 -translate-x-1/2 flex flex-col items-center">
            <Image
              src="/images/logo.png"
              alt="Logo SIAPGrek!"
              width={150}
              height={55}
              className="object-contain"
            />
          </div>

          {/* TEXT DIPERKECIL */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center px-4">
            <h1
              className={`${momoTrust.className} text-white whitespace-nowrap leading-tight`}
              style={{
                fontSize: "clamp(1.7rem, 2vw + 1rem, 2.6rem)",
                lineHeight: 1.05,
              }}
            >
              Sistem Informasi Automasi
              <br />
              Perawatan Anggrek
            </h1>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center bg-white px-6 min-h-screen overflow-hidden">
        <div className="w-full max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
