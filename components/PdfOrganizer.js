"use client";

import { useState, useRef } from "react";
import styles from "./PdfOrganizer.module.css";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument, degrees } from "pdf-lib";

// Configure worker for pdfjs-dist using local module
if (typeof window !== "undefined" && "Worker" in window) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();
}

export default function PdfOrganizer() {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [status, setStatus] = useState("idle"); // idle, loading, ready, processing, success
  const fileInputRef = useRef(null);
  const [originalPdfBytes, setOriginalPdfBytes] = useState(null);
  
  // Removed Freemium State

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      await loadPdf(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      await loadPdf(droppedFile);
    }
  };

  const loadPdf = async (fileObj) => {
    setFile(fileObj);
    setStatus("loading");
    
    try {
      const arrayBuffer = await fileObj.arrayBuffer();
      setOriginalPdfBytes(arrayBuffer);
      
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      const loadedPages = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.0 });
        
        // Scale down for thumbnail
        const scale = 400 / viewport.width;
        const thumbnailViewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = thumbnailViewport.height;
        canvas.width = thumbnailViewport.width;

        await page.render({
          canvasContext: context,
          viewport: thumbnailViewport
        }).promise;

        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        loadedPages.push({
          id: `page-${i}`,
          originalIndex: i - 1, // 0-indexed for pdf-lib
          rotate: 0,
          thumbnail: dataUrl,
          deleted: false
        });
      }

      setPages(loadedPages);
      setStatus("ready");
    } catch (err) {
      console.error(err);
      alert("Gagal memuat PDF. Pastikan file tidak rusak atau dilindungi password.");
      setStatus("idle");
    }
  };

  const moveLeft = (index) => {
    if (index === 0) return;
    const newPages = [...pages];
    const temp = newPages[index - 1];
    newPages[index - 1] = newPages[index];
    newPages[index] = temp;
    setPages(newPages);
  };

  const moveRight = (index) => {
    if (index === pages.length - 1) return;
    const newPages = [...pages];
    const temp = newPages[index + 1];
    newPages[index + 1] = newPages[index];
    newPages[index] = temp;
    setPages(newPages);
  };

  const rotatePage = (index) => {
    const newPages = [...pages];
    newPages[index].rotate = (newPages[index].rotate + 90) % 360;
    setPages(newPages);
  };

  const toggleDelete = (index) => {
    const newPages = [...pages];
    newPages[index].deleted = !newPages[index].deleted;
    setPages(newPages);
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnter = (e, index) => {
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDropPage = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newPages = [...pages];
    const draggedItem = newPages[draggedIndex];
    newPages.splice(draggedIndex, 1);
    newPages.splice(dropIndex, 0, draggedItem);
    
    if (selectedPageIndex === draggedIndex) {
      setSelectedPageIndex(dropIndex);
    } else if (selectedPageIndex > draggedIndex && selectedPageIndex <= dropIndex) {
      setSelectedPageIndex(selectedPageIndex - 1);
    } else if (selectedPageIndex < draggedIndex && selectedPageIndex >= dropIndex) {
      setSelectedPageIndex(selectedPageIndex + 1);
    }

    setPages(newPages);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleSave = async () => {
    setStatus("processing");
    try {
      const activePages = pages.filter(p => !p.deleted);
      if (activePages.length === 0) {
        alert("Tidak ada halaman tersisa untuk disimpan!");
        setStatus("ready");
        return;
      }

      const originalDoc = await PDFDocument.load(originalPdfBytes);
      const newDoc = await PDFDocument.create();

      for (const pageState of activePages) {
        const [copiedPage] = await newDoc.copyPages(originalDoc, [pageState.originalIndex]);
        
        // Add current rotation to the newly requested rotation
        const currentRotation = copiedPage.getRotation().angle;
        copiedPage.setRotation(degrees(currentRotation + pageState.rotate));
        
        newDoc.addPage(copiedPage);
      }

      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = `organized_${file.name}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      
      setStatus("success");
    } catch (err) {
      console.error(err);
      alert("Gagal memproses PDF.");
      setStatus("ready");
    }
  };

  if (status === "idle") {
    return (
      <div 
        className={styles.dropzone}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className={styles.iconContainer}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
        </div>
        <h3 className={styles.dropzoneTitle}>Pilih PDF untuk Diatur</h3>
        <p className={styles.dropzoneSubtitle}>atau drag & drop file ke area ini</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="application/pdf"
          style={{ display: "none" }} 
        />
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className={styles.loadingState}>
        <div className={styles.spinner}></div>
        <p>Mengekstrak halaman PDF...</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className={styles.successState}>
        <div className={styles.successIcon}>✓</div>
        <h3>Berhasil!</h3>
        <p>PDF Anda telah selesai disusun dan diunduh.</p>
        <button className="btn" onClick={() => {
          setFile(null);
          setPages([]);
          setStatus("idle");
        }}>Susun PDF Lainnya</button>
      </div>
    );
  }

  return (
    <div className={styles.organizerContainer}>
      <div className={styles.header}>
        <h3>{file.name} ({pages.length} Halaman)</h3>
      </div>

      <div className={styles.workspace}>
        <div className={styles.gridContainer}>
          <div className={styles.grid}>
            {pages.map((page, index) => (
              <div 
                key={page.id} 
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDropPage(e, index)}
                className={`${styles.pageCard} ${page.deleted ? styles.deleted : ''} ${index === selectedPageIndex ? styles.selected : ''} ${draggedIndex === index ? styles.dragging : ''} ${dragOverIndex === index && draggedIndex !== index ? styles.dragOver : ''}`}
                onClick={() => setSelectedPageIndex(index)}
              >
                <div className={styles.pageNumber}>{index + 1}</div>
                
                <div className={styles.thumbnailWrapper} style={{ transform: `rotate(${page.rotate}deg)` }}>
                  <img src={page.thumbnail} alt={`Page ${index + 1}`} className={styles.thumbnail} />
                </div>

                <div className={styles.controls} onClick={(e) => e.stopPropagation()}>
                  <button className={styles.controlBtn} onClick={() => moveLeft(index)} disabled={index === 0} title="Geser Kiri">
                    <img src="https://api.iconify.design/lucide:arrow-left.svg?color=%23ffffff" width="20" height="20" alt="Left" />
                  </button>
                  <button className={styles.controlBtn} onClick={() => rotatePage(index)} title="Putar 90°">
                    <img src="https://api.iconify.design/lucide:rotate-cw.svg?color=%23ffffff" width="20" height="20" alt="Rotate" />
                  </button>
                  <button className={styles.controlBtn} onClick={() => toggleDelete(index)} title={page.deleted ? "Batal Hapus" : "Hapus Halaman"}>
                    {page.deleted ? (
                      <img src="https://api.iconify.design/lucide:undo-2.svg?color=%23FCA311" width="20" height="20" alt="Undo" />
                    ) : (
                      <img src="https://api.iconify.design/lucide:trash-2.svg?color=%23ff4d4f" width="20" height="20" alt="Delete" />
                    )}
                  </button>
                  <button className={styles.controlBtn} onClick={() => moveRight(index)} disabled={index === pages.length - 1} title="Geser Kanan">
                    <img src="https://api.iconify.design/lucide:arrow-right.svg?color=%23ffffff" width="20" height="20" alt="Right" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {pages[selectedPageIndex] && (
          <div className={styles.previewPanel}>
            <div className={styles.previewTitle}>Pratinjau Halaman {selectedPageIndex + 1}</div>
            <div className={styles.previewImageWrapper} style={{ transform: `rotate(${pages[selectedPageIndex].rotate}deg)` }}>
              <img 
                src={pages[selectedPageIndex].thumbnail} 
                alt={`Preview Page ${selectedPageIndex + 1}`} 
                className={styles.previewImage} 
                style={{ filter: pages[selectedPageIndex].deleted ? 'grayscale(100%) opacity(50%)' : 'none' }}
              />
            </div>
            
            <div style={{ width: '100%', marginTop: '24px' }}>
              <button 
                className="btn" 
                onClick={handleSave} 
                disabled={status === "processing"}
                style={{ width: '100%' }}
              >
                {status === "processing" ? "Menyimpan..." : "Simpan Perubahan PDF"}
              </button>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}
