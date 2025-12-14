import type { Metadata } from "next";
import "./globals.css";
import { poppins, momoTrust } from "./fonts"; // import dari fonts.ts

export const metadata: Metadata = {
  title: "SIAPGrek",
  description: "Sistem Informasi Automasi Perawatan Anggrek",
  icons: {
    icon: "/circleLogo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${poppins.variable} ${momoTrust.variable}`}>
      <body className={`${poppins.className} bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
