import styles from "./page.module.css";
import Link from "next/link";
import Uploader from "@/components/Uploader";
import PdfOrganizerWrapper from "@/components/PdfOrganizerWrapper";
import { notFound } from "next/navigation";

// Define the available tools and their configurations
const TOOLS = {
  "merge-pdf": {
    title: "Merge PDF",
    description: "Gabungkan beberapa file PDF menjadi satu dokumen utuh.",
    accept: "application/pdf",
    multiple: true,
  },
  "image-to-pdf": {
    title: "Image ke PDF",
    description: "Ubah format gambar JPG dan PNG menjadi dokumen PDF dengan cepat.",
    accept: "image/jpeg, image/png",
    multiple: true,
  },
  "pdf-to-word": {
    title: "PDF ke Word",
    description: "Ubah file PDF Anda menjadi dokumen Word yang dapat diedit dengan presisi tinggi.",
    accept: "application/pdf",
    multiple: false,
    targetFormat: "docx"
  },
  "word-to-pdf": {
    title: "Word ke PDF",
    description: "Ubah dokumen Word Anda menjadi PDF secara instan dengan format tetap.",
    accept: ".doc,.docx",
    multiple: false,
  },
  "excel-to-pdf": {
    title: "Excel ke PDF",
    description: "Jadikan spreadsheet Excel Anda laporan PDF profesional dalam hitungan detik.",
    accept: ".xls,.xlsx",
    multiple: false,
  },
  "ppt-to-pdf": {
    title: "PPT ke PDF",
    description: "Konversi file presentasi PowerPoint menjadi dokumen PDF statis yang mudah dibagikan.",
    accept: ".ppt,.pptx",
    multiple: false,
  },
  "split-pdf": {
    title: "Split PDF",
    description: "Pisahkan satu atau lebih halaman dari PDF Anda menjadi file terpisah.",
    accept: "application/pdf",
    multiple: false,
  },
  "pdf-to-jpg": {
    title: "PDF ke JPG",
    description: "Ekstrak halaman PDF menjadi gambar format JPG.",
    accept: "application/pdf",
    multiple: false,
    targetFormat: "jpg"
  },
  "compress-pdf": {
    title: "Compress PDF",
    description: "Kurangi ukuran file PDF Anda tanpa mengorbankan kualitas dokumen secara signifikan.",
    accept: "application/pdf",
    multiple: false,
  },
  "png-to-jpg": {
    title: "PNG ke JPG",
    description: "Konversi file PNG ke format JPG dengan ukuran yang lebih ringan.",
    accept: "image/png",
    multiple: true,
  },
  "webp-to-jpg": {
    title: "WebP ke JPG",
    description: "Ubah gambar format WebP menjadi format JPG yang lebih universal.",
    accept: "image/webp",
    multiple: true,
  },
  "image-resizer": {
    title: "Image Resizer",
    description: "Ubah dimensi gambar Anda dengan mudah sesuai kebutuhan pixel atau persentase.",
    accept: "image/jpeg, image/png, image/webp",
    multiple: false,
  },
  "txt-to-pdf": {
    title: "TXT ke PDF",
    description: "Ubah file teks murni (.txt) menjadi dokumen PDF yang rapi dan terformat.",
    accept: "text/plain",
    multiple: false,
  },
  "protect-pdf": {
    title: "Protect PDF",
    description: "Enkripsi dokumen PDF rahasia Anda dengan password tingkat keamanan tinggi.",
    accept: "application/pdf",
    multiple: false,
  },
  "unlock-pdf": {
    title: "Unlock PDF",
    description: "Hapus proteksi password pada file PDF agar dapat diakses secara bebas selamanya.",
    accept: "application/pdf",
    multiple: false,
  },
  "watermark-pdf": {
    title: "Watermark PDF",
    description: "Tambahkan cap teks (watermark) pada seluruh halaman PDF untuk identitas visual.",
    accept: "application/pdf",
    multiple: false,
  },
  "heic-to-jpg": {
    title: "HEIC ke JPG",
    description: "Ubah foto format Apple HEIC menjadi JPG secara lokal di browser Anda.",
    accept: ".heic,.heif",
    multiple: true,
  },
  "organize-pdf": {
    title: "Organize PDF",
    description: "Susun ulang, putar, atau hapus halaman PDF secara visual dengan mudah dan interaktif.",
    accept: "application/pdf",
    multiple: false,
  }
};

export async function generateMetadata({ params }) {
  const { tool: toolId } = await params;
  const toolConfig = TOOLS[toolId];

  if (!toolConfig) {
    return {
      title: "Alat Tidak Ditemukan - nieldoc"
    };
  }

  return {
    title: `${toolConfig.title} - nieldoc`,
    description: toolConfig.description,
  };
}

export default async function ToolPage({ params }) {
  const { tool: toolId } = await params;
  const toolConfig = TOOLS[toolId];

  if (!toolConfig) {
    notFound();
  }

  // Map route to the endpoint ID used in backend
  let endpointToolId = toolId;
  if (["word-to-pdf", "excel-to-pdf", "ppt-to-pdf", "txt-to-pdf", "pdf-to-jpg", "compress-pdf", "pdf-to-word", "protect-pdf", "unlock-pdf"].includes(toolId)) {
    endpointToolId = "office-to-pdf";
  } else if (["png-to-jpg", "webp-to-jpg", "image-resizer"].includes(toolId)) {
    endpointToolId = "image-tools";
  } else if (toolId === "split-pdf") {
    endpointToolId = "split-pdf";
  } else if (toolId === "watermark-pdf") {
    endpointToolId = "watermark";
  }

  return (
    <div className={styles.container}>
      <main className={toolId === "organize-pdf" ? styles.mainWide : styles.main}>
        <Link href="/" className={styles.backBtn}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Beranda
        </Link>
        <div className={styles.header}>
          <h1 className={styles.title}>{toolConfig.title}</h1>
          <p className={styles.description}>{toolConfig.description}</p>
        </div>

        {toolId === "organize-pdf" ? (
          <PdfOrganizerWrapper />
        ) : (
          <Uploader 
            toolId={toolId}
            endpoint={endpointToolId}
            accept={toolConfig.accept}
            multiple={toolConfig.multiple}
            title={`Unggah file untuk ${toolConfig.title}`}
            targetFormat={toolConfig.targetFormat}
          />
        )}
      </main>
    </div>
  );
}
