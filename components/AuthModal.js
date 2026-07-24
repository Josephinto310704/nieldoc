"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import styles from "./AuthModal.module.css";

export default function AuthModal({ isOpen, onClose, message }) {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${window.location.pathname}`,
      },
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <h2 className={styles.title}>Batas Akses Tamu</h2>
          <p className={styles.message}>
            {message || "Batas harian tamu telah tercapai atau file terlalu besar (Max 5MB). Harap masuk secara GRATIS menggunakan akun Google Anda untuk melanjutkan!"}
          </p>
          
          <button 
            className={styles.googleBtn} 
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? "Mengarahkan..." : "Masuk"}
          </button>
        </div>
      </div>
    </div>
  );
}
