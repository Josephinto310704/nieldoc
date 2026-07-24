"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import styles from "./UserMenu.module.css";

export default function UserMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const supabase = createClient();

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const displayName = user.user_metadata?.full_name?.split(' ')[0] || user.email;
  const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || "https://api.iconify.design/lucide:user-circle.svg?color=%23ffffff";

  return (
    <div className={styles.container} ref={dropdownRef}>
      <div 
        className={styles.trigger} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.name}>Halo, {displayName}</span>
        <img 
          src={avatarUrl} 
          alt="Profile" 
          referrerPolicy="no-referrer"
          className={styles.avatar}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://api.iconify.design/lucide:user-circle.svg?color=%23ffffff"; }}
        />
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Keluar
          </button>
        </div>
      )}
    </div>
  );
}
