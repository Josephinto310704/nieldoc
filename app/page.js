import styles from "./page.module.css";
import Link from "next/link";
import HamburgerMenu from "@/components/HamburgerMenu";

const BaseIcon = ({ children }) => (
  <div style={{ width: 32, height: 32, backgroundColor: "var(--primary)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: "bold", fontSize: 12 }}>
    {children}
  </div>
);

const ExcelIcon = () => <BaseIcon>X</BaseIcon>;
const WordIcon = () => <BaseIcon>W</BaseIcon>;
const PdfIcon = () => <BaseIcon>PDF</BaseIcon>;
const TxtIcon = () => <BaseIcon>TXT</BaseIcon>;
const PptIcon = () => <BaseIcon>P</BaseIcon>;
const ImageIcon = () => <BaseIcon>IMG</BaseIcon>;

const FolderIcon = () => (
  <img src="https://api.iconify.design/lucide:folder.svg?color=%23FCA311" width="32" height="32" alt="Folder" />
);

const MergeIcon = () => (
  <BaseIcon>
    <img src="https://api.iconify.design/lucide:combine.svg?color=%23000000" width="20" height="20" alt="Merge" />
  </BaseIcon>
);

const CompressIcon = () => (
  <BaseIcon>
    <img src="https://api.iconify.design/lucide:minimize-2.svg?color=%23000000" width="20" height="20" alt="Compress" />
  </BaseIcon>
);

const SplitIcon = () => (
  <BaseIcon>
    <img src="https://api.iconify.design/lucide:split-square-horizontal.svg?color=%23000000" width="20" height="20" alt="Split" />
  </BaseIcon>
);

const ShieldIcon = () => (
  <BaseIcon>
    <img src="https://api.iconify.design/lucide:shield.svg?color=%23000000" width="20" height="20" alt="Shield" />
  </BaseIcon>
);

const UnlockIcon = () => (
  <BaseIcon>
    <img src="https://api.iconify.design/lucide:unlock.svg?color=%23000000" width="20" height="20" alt="Unlock" />
  </BaseIcon>
);

const WatermarkIcon = () => (
  <BaseIcon>
    <img src="https://api.iconify.design/lucide:stamp.svg?color=%23000000" width="20" height="20" alt="Watermark" />
  </BaseIcon>
);

const OrganizeIcon = () => (
  <BaseIcon>
    <img src="https://api.iconify.design/lucide:layout-dashboard.svg?color=%23000000" width="20" height="20" alt="Organize" />
  </BaseIcon>
);

export default async function Home() {
  return (
    <div className={styles.container}>
      <div style={{ borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 100, backgroundColor: "var(--nav-bg)", backdropFilter: "blur(8px)" }}>
        <header className={styles.navbar}>
          <div style={{ display: "flex", alignItems: "center", gap: "48px" }}>
            <Link href="/" className={styles.navBrand}>niel<span style={{color: 'var(--primary)'}}>doc</span></Link>
          </div>
          <div className={styles.navAuth}>
            <HamburgerMenu />
          </div>
        </header>
      </div>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Semua Alat Konversi</h1>
          <p className={styles.heroSubtitle}>
            Solusi lengkap untuk produktivitas dokumen Anda. Konversi, kompres, dan modifikasi file PDF, Gambar, dan Dokumen dengan aman dan cepat di satu tempat.
          </p>
        </div>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <FolderIcon />
            <h2 className={styles.sectionTitle}>PDF Tools</h2>
          </div>
          <div className={styles.grid}>
            <Link href="/pdf-to-word" className={styles.card}>
              <div className={styles.cardIconWrapper}><PdfIcon /></div>
              <h3 className={styles.cardTitle}>PDF ke Word</h3>
              <p className={styles.cardDescription}>Ubah file PDF Anda menjadi dokumen Word yang dapat diedit dengan presisi tinggi.</p>
            </Link>
            <Link href="/word-to-pdf" className={styles.card}>
              <div className={styles.cardIconWrapper}><WordIcon /></div>
              <h3 className={styles.cardTitle}>Word ke PDF</h3>
              <p className={styles.cardDescription}>Ubah dokumen Word Anda menjadi PDF secara instan dengan format tetap.</p>
            </Link>
            <Link href="/merge-pdf" className={styles.card}>
              <div className={styles.cardIconWrapper}><MergeIcon /></div>
              <h3 className={styles.cardTitle}>Merge PDF</h3>
              <p className={styles.cardDescription}>Gabungkan beberapa file PDF menjadi satu dokumen tunggal dalam urutan yang diinginkan.</p>
            </Link>
            <Link href="/split-pdf" className={styles.card}>
              <div className={styles.cardIconWrapper}><MergeIcon /></div>
              <h3 className={styles.cardTitle}>Split PDF</h3>
              <p className={styles.cardDescription}>Pisahkan satu atau lebih halaman dari PDF Anda menjadi file terpisah.</p>
            </Link>
            <Link href="/pdf-to-jpg" className={styles.card}>
              <div className={styles.cardIconWrapper}><ImageIcon /></div>
              <h3 className={styles.cardTitle}>PDF ke JPG</h3>
              <p className={styles.cardDescription}>Ekstrak semua gambar di dalam PDF atau ubah setiap halaman menjadi file JPG.</p>
            </Link>
            <Link href="/compress-pdf" className={styles.card}>
              <div className={styles.cardIconWrapper}><CompressIcon /></div>
              <h3 className={styles.cardTitle}>Compress PDF</h3>
              <p className={styles.cardDescription}>Kurangi ukuran file PDF Anda tanpa mengorbankan kualitas dokumen secara signifikan.</p>
            </Link>
            <Link href="/protect-pdf" className={styles.card}>
              <div className={styles.cardIconWrapper}><ShieldIcon /></div>
              <h3 className={styles.cardTitle}>Protect PDF</h3>
              <p className={styles.cardDescription}>Enkripsi dokumen PDF rahasia Anda dengan password tingkat keamanan tinggi.</p>
            </Link>
            <Link href="/unlock-pdf" className={styles.card}>
              <div className={styles.cardIconWrapper}><UnlockIcon /></div>
              <h3 className={styles.cardTitle}>Unlock PDF</h3>
              <p className={styles.cardDescription}>Hapus proteksi password pada file PDF agar dapat diakses secara bebas selamanya.</p>
            </Link>
            <Link href="/watermark-pdf" className={styles.card}>
              <div className={styles.cardIconWrapper}><WatermarkIcon /></div>
              <h3 className={styles.cardTitle}>Watermark PDF</h3>
              <p className={styles.cardDescription}>Tambahkan cap teks (watermark) pada seluruh halaman PDF untuk identitas visual.</p>
            </Link>
            <Link href="/organize-pdf" className={styles.card}>
              <div className={styles.cardIconWrapper}><OrganizeIcon /></div>
              <h3 className={styles.cardTitle}>Organize PDF</h3>
              <p className={styles.cardDescription}>Susun ulang, putar, atau hapus halaman PDF secara visual dengan mudah dan interaktif.</p>
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <FolderIcon />
            <h2 className={styles.sectionTitle}>Image Tools</h2>
          </div>
          <div className={styles.grid}>
            <Link href="/image-to-pdf" className={styles.card}>
              <div className={styles.cardIconWrapper}><ImageIcon /></div>
              <h3 className={styles.cardTitle}>Image ke PDF</h3>
              <p className={styles.cardDescription}>Ubah format gambar JPG dan PNG menjadi dokumen PDF dengan cepat.</p>
            </Link>
            <Link href="/png-to-jpg" className={styles.card}>
              <div className={styles.cardIconWrapper}><ImageIcon /></div>
              <h3 className={styles.cardTitle}>PNG ke JPG</h3>
              <p className={styles.cardDescription}>Konversi file PNG ke format JPG dengan ukuran yang lebih ringan.</p>
            </Link>
            <Link href="/webp-to-jpg" className={styles.card}>
              <div className={styles.cardIconWrapper}><ImageIcon /></div>
              <h3 className={styles.cardTitle}>WebP ke JPG</h3>
              <p className={styles.cardDescription}>Ubah gambar format WebP menjadi format JPG yang lebih universal.</p>
            </Link>
            <Link href="/image-resizer" className={styles.card}>
              <div className={styles.cardIconWrapper}><CompressIcon /></div>
              <h3 className={styles.cardTitle}>Image Resizer</h3>
              <p className={styles.cardDescription}>Ubah dimensi gambar Anda dengan mudah sesuai kebutuhan pixel atau persentase.</p>
            </Link>
            <Link href="/heic-to-jpg" className={styles.card}>
              <div className={styles.cardIconWrapper}><ImageIcon /></div>
              <h3 className={styles.cardTitle}>HEIC ke JPG</h3>
              <p className={styles.cardDescription}>Ubah foto format Apple HEIC menjadi JPG yang didukung semua perangkat (Offline & Cepat).</p>
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <FolderIcon />
            <h2 className={styles.sectionTitle}>Document Tools</h2>
          </div>
          <div className={styles.grid}>
            <Link href="/excel-to-pdf" className={styles.card}>
              <div className={styles.cardIconWrapper}><ExcelIcon /></div>
              <h3 className={styles.cardTitle}>Excel ke PDF</h3>
              <p className={styles.cardDescription}>Jadikan spreadsheet Excel Anda laporan PDF profesional dalam hitungan detik.</p>
            </Link>
            <Link href="/ppt-to-pdf" className={styles.card}>
              <div className={styles.cardIconWrapper}><PptIcon /></div>
              <h3 className={styles.cardTitle}>PPT ke PDF</h3>
              <p className={styles.cardDescription}>Konversi file presentasi PowerPoint menjadi dokumen PDF statis yang mudah dibagikan.</p>
            </Link>
            <Link href="/txt-to-pdf" className={styles.card}>
              <div className={styles.cardIconWrapper}><TxtIcon /></div>
              <h3 className={styles.cardTitle}>TXT ke PDF</h3>
              <p className={styles.cardDescription}>Ubah file teks murni (.txt) menjadi dokumen PDF yang rapi dan terformat.</p>
            </Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <div className={styles.footerLogo}>niel<span style={{color: 'var(--primary)'}}>doc</span></div>
          <div className={styles.footerCopyright}>© 2024 nieldoc. Fast, Secure, Professional.</div>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/privacy">Kebijakan Privasi</Link>
          <Link href="/syarat-ketentuan">Syarat & Ketentuan</Link>
        </div>
      </footer>
    </div>
  );
}
