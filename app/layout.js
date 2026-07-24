import { Inter, Raleway, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-title" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-poppins" });

export const metadata = {
  title: "nieldoc - Semua Alat Konversi",
  description: "Solusi lengkap untuk produktivitas dokumen Anda. Konversi, kompres, dan modifikasi file PDF, Gambar, dan Dokumen dengan aman dan cepat di satu tempat.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${raleway.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
