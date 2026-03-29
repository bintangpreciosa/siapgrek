"use client";

import Image from "next/image";
import { useUser } from "@/app/context/UserContext";

type Props = {
  setActiveMenu: (menu: string) => void;
};

export default function Navbar({
  setActiveMenu,
}: Props) {
  const { profileImage, username } = useUser();

  return (
    <header className="w-full h-20 bg-white rounded-2xl px-6 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <Image
          src="/images/Logo Navbar.png"
          alt="SIAPGrek"
          width={150}
          height={40}
        />
      </div>

      {/* RIGHT */}
      <button
        onClick={() => setActiveMenu("profile")}
        className="flex items-center gap-4"
      >
        <span className="font-semibold text-gray-700">
          {username}
        </span>

        <div className="w-10 h-10 rounded-lg overflow-hidden">
          <Image
            src={profileImage}
            alt="User"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      </button>
    </header>
  );
}