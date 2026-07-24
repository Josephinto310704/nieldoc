"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Uploader.module.css";
import { checkRateLimit, incrementRateLimit } from "@/utils/rateLimit";
import { createClient } from "@/utils/supabase/client";
import AuthModal from "./AuthModal";

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export default function Uploader({ toolId, endpoint, accept, multiple, title, description, targetFormat }) {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("idle"); // idle, processing, success
  const [downloadUrl, setDownloadUrl] = useState(null);
  
  // Freemium State
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMessage, setAuthModalMessage] = useState("");
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });
  }, []);

  // Image Resizer state
  const [resizeMode, setResizeMode] = useState("auto"); // "auto" or "custom"
  const [scale, setScale] = useState(2);
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  
  // Password & Watermark state
  const [password, setPassword] = useState("");
  const [watermarkText, setWatermarkText] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles) => {
    if (!multiple) {
      setFiles([newFiles[0]]);
    } else {
      setFiles(newFiles);
    }
    setStatus("idle");
    setDownloadUrl(null);
  };

  const handleConvert = async () => {
    if (files.length === 0) return;

    // Freemium Check
    if (!user) {
      let totalSize = 0;
      files.forEach(f => totalSize += f.size);
      
      const rateLimit = checkRateLimit(totalSize);
      if (!rateLimit.allowed) {
        setAuthModalMessage(rateLimit.reason);
        setShowAuthModal(true);
        return;
      }
    }

    setStatus("processing");
    
    // HEIC Client-Side Processing
    if (toolId === "heic-to-jpg") {
      try {
        const heic2any = (await import("heic2any")).default;
        const convertedBlob = await heic2any({
          blob: files[0],
          toType: "image/jpeg",
          quality: 0.9
        });
        
        const finalBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
        const url = URL.createObjectURL(finalBlob);
        
        const a = document.createElement("a");
        a.href = url;
        a.download = `converted_${files[0].name.split('.')[0]}.jpg`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        
        if (!user) incrementRateLimit();
        setStatus("success");
      } catch (err) {
        console.error(err);
        alert("Gagal memproses HEIC.");
        setStatus("idle");
      }
      return;
    }

    const formData = new FormData();
    
    if (["office-to-pdf", "pdf-to-word", "compress-pdf", "pdf-to-jpg", "txt-to-pdf", "image-resizer", "png-to-jpg", "webp-to-jpg", "split-pdf", "protect-pdf", "unlock-pdf", "watermark-pdf"].includes(toolId) || !multiple) {
      formData.append("file", files[0]);
      if (targetFormat) {
        formData.append("targetFormat", targetFormat);
      }
      formData.append("toolId", toolId);
      
      if (toolId === "image-resizer") {
        formData.append("resizeMode", resizeMode);
        if (resizeMode === "auto") formData.append("scale", scale);
        else {
          formData.append("width", customWidth);
          formData.append("height", customHeight);
        }
      }
      
      if (toolId === "protect-pdf" || toolId === "unlock-pdf") {
        formData.append("password", password);
      }
      if (toolId === "watermark-pdf") {
        formData.append("watermarkText", watermarkText);
      }
    } else {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }

    try {
      let apiEndpoint = `/api/convert/${endpoint}`;

      const res = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Conversion failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      if (!user) incrementRateLimit();
      setStatus("success");
    } catch (err) {
      alert("Terjadi kesalahan saat memproses file.");
      console.error(err);
      setStatus("idle");
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    
    let ext = "pdf";
    if (targetFormat === "docx") ext = "docx";
    else if (targetFormat === "jpg" || toolId === "png-to-jpg" || toolId === "webp-to-jpg") ext = "jpg";
    else if (toolId === "split-pdf") ext = "zip";
    else if (toolId === "image-resizer") ext = files[0].name.split(".").pop();
    
    a.download = `converted.${ext}`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={{ position: "relative" }}>
      <div 
        className={styles.dropzone}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <h3 className={styles.title}>{title || "Pilih File"}</h3>
        <p className={styles.subtitle}>{description || "atau drag & drop file ke area ini"}</p>
        
        <input 
          type="file" 
          ref={fileInputRef}
          style={{ display: "none" }}
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
        />
      </div>

      {files.length > 0 && status !== "success" && (
        <div className={styles.fileList}>
          {files.map((file, idx) => (
            <div key={idx} className={styles.fileItem}>
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.fileSize}>{formatBytes(file.size)}</span>
            </div>
          ))}
          
          {toolId === "image-resizer" && (
            <div style={{ marginTop: "24px", padding: "16px", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>
              <h4 style={{ marginBottom: "16px" }}>Pengaturan Ukuran</h4>
              <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                <label>
                  <input type="radio" checked={resizeMode === "auto"} onChange={() => setResizeMode("auto")} /> Skala Otomatis
                </label>
                <label>
                  <input type="radio" checked={resizeMode === "custom"} onChange={() => setResizeMode("custom")} /> Ukuran Kustom
                </label>
              </div>
              
              {resizeMode === "auto" ? (
                <div style={{ display: "flex", gap: "8px" }}>
                  <button className={`btn ${scale === 1 ? '' : 'btn-outline'}`} onClick={() => setScale(1)}>1x (Sama)</button>
                  <button className={`btn ${scale === 2 ? '' : 'btn-outline'}`} onClick={() => setScale(2)}>2x Lebih Besar</button>
                  <button className={`btn ${scale === 5 ? '' : 'btn-outline'}`} onClick={() => setScale(5)}>5x Lebih Besar</button>
                  <button className={`btn ${scale === 0.5 ? '' : 'btn-outline'}`} onClick={() => setScale(0.5)}>Setengah (0.5x)</button>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Lebar (px)</label>
                    <input type="number" value={customWidth} onChange={e => setCustomWidth(e.target.value)} style={{ padding: "8px", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", borderRadius: "4px" }} placeholder="Auto" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Tinggi (px)</label>
                    <input type="number" value={customHeight} onChange={e => setCustomHeight(e.target.value)} style={{ padding: "8px", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", borderRadius: "4px" }} placeholder="Auto" />
                  </div>
                </div>
              )}
            </div>
          )}
          
          {(toolId === "protect-pdf" || toolId === "unlock-pdf") && (
            <div style={{ marginTop: "24px", padding: "16px", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>
              <h4 style={{ marginBottom: "8px" }}>{toolId === "protect-pdf" ? "Buat Password Baru" : "Masukkan Password PDF"}</h4>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", padding: "10px", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", borderRadius: "4px" }} placeholder="Password rahasia..." />
            </div>
          )}

          {toolId === "watermark-pdf" && (
            <div style={{ marginTop: "24px", padding: "16px", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>
              <h4 style={{ marginBottom: "8px" }}>Teks Watermark</h4>
              <input type="text" value={watermarkText} onChange={e => setWatermarkText(e.target.value)} style={{ width: "100%", padding: "10px", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "#fff", borderRadius: "4px" }} placeholder="Misal: RAHASIA, DRAFT..." />
            </div>
          )}

          <div className={styles.actionSection}>
            <button className={`${styles.convertBtn} btn`} onClick={handleConvert} disabled={status === "processing"}>
              {status === "processing" ? "Memproses..." : "Convert Sekarang"}
            </button>
          </div>
        </div>
      )}

      {status === "processing" && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p>Memproses dokumen Anda, harap tunggu...</p>
        </div>
      )}

      {status === "success" && (
        <div className={styles.dropzone} style={{ marginTop: 0 }}>
          <div className={styles.successMessage}>Konversi Berhasil!</div>
          <p className={styles.subtitle}>File Anda siap diunduh.</p>
          <div className={styles.actionSection} style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <button className="btn" onClick={handleDownload}>Unduh File</button>
            <button className="btn btn-outline" onClick={() => { setStatus("idle"); setFiles([]); setDownloadUrl(null); }}>Convert File Lain</button>
          </div>
        </div>
      )}
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        message={authModalMessage} 
      />
    </div>
  );
}
