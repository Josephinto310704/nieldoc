import Link from 'next/link';
import styles from '../syarat-ketentuan/page.module.css';

export const metadata = {
  title: 'Kebijakan Privasi - nieldoc',
  description: 'Kebijakan Privasi layanan nieldoc.',
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <Link href="/" className={styles.backBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Beranda
          </Link>
          <h1 className={styles.title}>Kebijakan Privasi</h1>
        </div>

        <div className={styles.content}>
          <h2>1. Data yang Kami Kumpulkan</h2>
          
          <h3>1.1 File yang Diunggah</h3>
          <p>File yang Anda unggah untuk dikonversi (dokumen, gambar, PDF, dsb.) beserta metadata dasarnya (nama file, ukuran, format).</p>

          <h3>1.2 Data Teknis Otomatis</h3>
          <ul>
            <li>Alamat IP</li>
            <li>Jenis dan versi browser</li>
            <li>Sistem operasi</li>
            <li>Waktu akses dan halaman yang dikunjungi</li>
            <li>Cookie untuk fungsi dasar situs (lihat Bagian 7)</li>
          </ul>

          <h3>1.3 Data Akun (jika fitur login tersedia)</h3>
          <p>Jika Anda membuat akun: alamat email, nama, dan riwayat konversi yang terkait dengan akun tersebut.</p>

          <h3>1.4 Data yang TIDAK Kami Kumpulkan</h3>
          <p>Kami tidak meminta atau menyimpan data pembayaran secara langsung di server kami (jika ada fitur berbayar, transaksi diproses oleh pihak ketiga penyedia payment gateway).</p>

          <h2>2. Bagaimana Kami Menggunakan Data</h2>
          <p>Data yang dikumpulkan digunakan semata-mata untuk:</p>
          <ul>
            <li>Menjalankan proses konversi file yang Anda minta</li>
            <li>Memastikan keamanan dan mencegah penyalahgunaan layanan (misalnya rate limiting, deteksi abuse)</li>
            <li>Meningkatkan performa dan keandalan layanan (analitik agregat, non-identifikasi)</li>
            <li>Komunikasi terkait layanan, jika Anda memiliki akun (misalnya notifikasi status konversi)</li>
          </ul>

          <p><strong>Kami TIDAK:</strong></p>
          <ul>
            <li>Menggunakan isi file Anda untuk melatih model AI/machine learning apa pun</li>
            <li>Menjual atau membagikan file Anda kepada pihak ketiga untuk tujuan pemasaran</li>
            <li>Membuka atau meninjau isi file Anda secara manual, kecuali diwajibkan oleh proses hukum yang sah</li>
          </ul>

          <h2>3. Retensi & Penghapusan File</h2>
          <p><em>Ini adalah bagian terpenting dari kebijakan kami:</em></p>
          <ul>
            <li>File yang diunggah dan hasil konversi disimpan sementara di server kami hanya untuk keperluan pemrosesan</li>
            <li>File akan <strong>otomatis dihapus secara permanen dalam waktu maksimal 1 (satu) jam</strong> setelah proses konversi selesai, atau segera setelah Anda mengunduh hasilnya — mana yang terjadi lebih dahulu</li>
            <li>Kami tidak menyimpan salinan cadangan (backup) dari file yang telah dihapus</li>
            <li>Pengguna bertanggung jawab untuk mengunduh dan menyimpan hasil konversi sebelum periode retensi berakhir</li>
          </ul>

          <h2>4. Keamanan Data</h2>
          <ul>
            <li>Seluruh transfer file antara perangkat Anda dan server kami dienkripsi menggunakan HTTPS/TLS</li>
            <li>File yang tersimpan sementara (at-rest) di server dienkripsi</li>
            <li>Akses ke sistem penyimpanan file dibatasi hanya untuk proses otomatis yang diperlukan; tidak ada akses manual rutin oleh staf</li>
            <li>Kami menerapkan praktik keamanan standar industri, namun perlu dicatat bahwa tidak ada metode transmisi atau penyimpanan data melalui internet yang 100% aman</li>
          </ul>

          <h2>5. Berbagi Data dengan Pihak Ketiga</h2>
          <p>Kami dapat membagikan data terbatas dengan pihak ketiga hanya dalam situasi berikut:</p>
          <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '12px' }}>Pihak Ketiga</th>
                  <th style={{ padding: '12px' }}>Tujuan</th>
                  <th style={{ padding: '12px' }}>Data yang Dibagikan</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px' }}>Penyedia hosting/cloud storage</td>
                  <td style={{ padding: '12px' }}>Infrastruktur pemrosesan & penyimpanan sementara</td>
                  <td style={{ padding: '12px' }}>File yang diunggah (terenkripsi, sementara)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px' }}>Penyedia analitik (misal Google Analytics)</td>
                  <td style={{ padding: '12px' }}>Memahami penggunaan situs secara agregat</td>
                  <td style={{ padding: '12px' }}>Data teknis non-identifikasi</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px' }}>Penyedia payment gateway (jika ada fitur berbayar)</td>
                  <td style={{ padding: '12px' }}>Memproses pembayaran</td>
                  <td style={{ padding: '12px' }}>Data transaksi (bukan isi file)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px' }}>Otoritas hukum</td>
                  <td style={{ padding: '12px' }}>Jika diwajibkan oleh hukum yang berlaku</td>
                  <td style={{ padding: '12px' }}>Sesuai permintaan hukum yang sah</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Kami <strong>tidak menjual</strong> data pribadi Anda kepada pihak ketiga untuk tujuan komersial.</p>

          <h2>6. Hak Pengguna</h2>
          <p>Sesuai dengan prinsip perlindungan data pribadi (termasuk mengacu pada Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi di Indonesia), Anda memiliki hak untuk:</p>
          <ul>
            <li>Meminta informasi mengenai data pribadi yang kami proses</li>
            <li>Meminta penghapusan akun dan data terkait (jika Anda memiliki akun)</li>
            <li>Menarik persetujuan penggunaan cookie non-esensial</li>
            <li>Mengajukan keluhan terkait pemrosesan data pribadi Anda</li>
          </ul>
          <p>Untuk menggunakan hak-hak ini, silakan hubungi kami melalui kontak pada Bagian 9.</p>

          <h2>7. Cookie</h2>
          <p>Kami menggunakan cookie untuk:</p>
          <ul>
            <li><strong>Esensial:</strong> menjaga fungsi dasar situs (misalnya sesi upload file)</li>
            <li><strong>Analitik:</strong> memahami pola penggunaan situs secara agregat dan anonim</li>
            <li><strong>Preferensi:</strong> menyimpan pengaturan seperti mode gelap/terang</li>
          </ul>
          <p>Anda dapat mengatur atau menonaktifkan cookie non-esensial melalui pengaturan browser Anda, meskipun ini dapat memengaruhi sebagian fungsi situs.</p>

          <h2>8. Privasi Anak</h2>
          <p>Layanan ini tidak ditujukan untuk anak di bawah usia 13 tahun. Kami tidak dengan sengaja mengumpulkan data pribadi dari anak di bawah usia tersebut. Jika Anda mengetahui bahwa anak telah memberikan data pribadi kepada kami, silakan hubungi kami agar dapat dihapus.</p>

          <h2>9. Kontak</h2>
          <p>Jika Anda memiliki pertanyaan, permintaan, atau keluhan terkait Kebijakan Privasi ini, silakan hubungi kami di:</p>
          <p><strong>Email:</strong> nielifydesign@gmail.com</p>

          <h2>10. Perubahan Kebijakan</h2>
          <p>Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan signifikan akan diinformasikan melalui pemberitahuan di situs sebelum berlaku efektif. Tanggal "Terakhir diperbarui" di bagian atas dokumen ini mencerminkan revisi terkini.</p>
        </div>
      </main>
    </div>
  );
}
