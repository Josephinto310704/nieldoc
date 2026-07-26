"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mencoba masuk.");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.navbar}>
        <Link href="/" className={styles.navBrand}>niel<span style={{color: 'var(--primary)'}}>doc</span></Link>
      </header>

      <main className={styles.main}>
        <div className={styles.authCard}>
          <div className={styles.brandIcon}>
            N
          </div>
          <h1 className={styles.title}>Selamat Datang</h1>
          <p className={styles.subtitle}>
            Masuk ke NielDoc untuk menyimpan riwayat konversi Anda dan menikmati pengalaman yang lebih personal. Sepenuhnya gratis!
          </p>

          <button 
            className={styles.googleBtn} 
            onClick={handleGoogleLogin} 
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinner}></span>
            ) : (
              <img src="https://api.iconify.design/flat-color-icons:google.svg" alt="Google" width="20" height="20" />
            )}
            {isLoading ? "Memproses..." : "Lanjutkan dengan Google"}
          </button>

          <div className={styles.footer}>
            Dengan masuk, Anda menyetujui{" "}
            <Link href="/terms" className={styles.link}>Syarat & Ketentuan</Link> dan{" "}
            <Link href="/privacy" className={styles.link}>Kebijakan Privasi</Link> kami.
          </div>
        </div>
      </main>
    </div>
  );
}
