"use client";

import { useState, useEffect } from "react";
import styles from "./HamburgerMenu.module.css";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div 
        className={styles.trigger} 
        onClick={() => setIsOpen(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text)" }}>
          <line x1="4" x2="20" y1="12" y2="12"/>
          <line x1="4" x2="20" y1="6" y2="6"/>
          <line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
      </div>

      {/* Overlay */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`} 
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar with Glassmorphism */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Produk lain</h2>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={styles.sidebarContent}>
          <a href="https://nieldownloader.vercel.app/" target="_blank" rel="noopener noreferrer" className={styles.menuItem}>
            <span style={{ fontWeight: 800, fontSize: "14px", color: "#8B5CF6", letterSpacing: "-0.5px", fontFamily: "var(--font-poppins)" }}>nieldownloader</span>
          </a>
        </div>
      </div>
    </>
  );
}
