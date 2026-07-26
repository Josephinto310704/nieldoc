import { Inter, Raleway, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-title" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-poppins" });

export const metadata = {
  title: "nieldoc - Semua Alat Konversi File & Dokumen Gratis",
  description: "nieldoc adalah solusi lengkap untuk produktivitas dokumen Anda. Konversi PDF ke Word, kompresi gambar, dan modifikasi file secara instan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7329983884622772"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className={`${inter.variable} ${raleway.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
