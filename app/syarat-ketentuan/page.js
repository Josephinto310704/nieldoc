import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Syarat dan Ketentuan - nieldoc',
  description: 'Syarat dan Ketentuan penggunaan layanan nieldoc.',
};

export default function TermsOfService() {
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
          <h1 className={styles.title}>Syarat dan Ketentuan</h1>
        </div>

        <div className={styles.content}>
          <h2>1. Deskripsi Layanan</h2>
          <p>NielDoc menyediakan alat konversi file berbasis web yang memungkinkan pengguna mengubah format dokumen dan gambar (termasuk namun tidak terbatas pada Word ke PDF, PDF ke Word, PowerPoint ke PDF, Excel ke PDF, gambar ke PDF, serta fitur pendukung seperti merge dan compress PDF).</p>
          <p>Layanan disediakan "sebagaimana adanya" (as is) dan dapat berubah, ditambah, atau dikurangi fiturnya dari waktu ke waktu tanpa pemberitahuan sebelumnya.</p>

          <h2>2. Kelayakan Pengguna</h2>
          <p>Layanan ditujukan untuk pengguna berusia 13 tahun ke atas. Jika Anda berusia di bawah 18 tahun, Anda menyatakan telah memperoleh izin dari orang tua/wali untuk menggunakan Layanan.</p>
          <p>Dengan menggunakan Layanan, Anda menyatakan bahwa seluruh informasi yang Anda berikan (jika membuat akun) adalah akurat dan Anda memiliki kapasitas hukum untuk menyetujui Ketentuan ini.</p>

          <h2>3. Penggunaan yang Diizinkan</h2>
          <p>Anda setuju untuk menggunakan NielDoc hanya untuk tujuan yang sah. Anda dilarang:</p>
          <ul>
            <li>Mengunggah file yang melanggar hukum, termasuk namun tidak terbatas pada: konten yang melanggar hak cipta pihak lain tanpa izin, konten pornografi anak, materi yang memfasilitasi penipuan, atau konten yang melanggar hukum yang berlaku di Indonesia maupun yurisdiksi terkait</li>
            <li>Menggunakan Layanan untuk menyebarkan malware, virus, atau kode berbahaya lainnya</li>
            <li>Melakukan upaya membebani sistem secara berlebihan (misalnya melalui bot, scraping otomatis massal, atau serangan denial-of-service)</li>
            <li>Mencoba mengakses secara tidak sah bagian sistem, kode sumber, atau data pengguna lain</li>
            <li>Menggunakan Layanan untuk tujuan komersial berskala besar (reselling kapasitas konversi) tanpa izin tertulis dari kami</li>
            <li>Mengunggah file yang melanggar privasi pihak ketiga tanpa persetujuan yang sah</li>
          </ul>
          <p>Kami berhak menghentikan akses Anda ke Layanan tanpa pemberitahuan jika ditemukan pelanggaran terhadap ketentuan di atas.</p>

          <h2>4. Kepemilikan & Tanggung Jawab atas Konten</h2>
          <p>Anda tetap pemilik penuh atas file yang Anda unggah dan hasil konversinya. NielDoc tidak mengklaim kepemilikan apa pun atas konten Anda.</p>
          <p>Anda bertanggung jawab penuh untuk memastikan bahwa Anda memiliki hak yang sah untuk mengunggah dan mengonversi file tersebut.</p>
          <p>Sebagaimana dijelaskan dalam Kebijakan Privasi kami, file yang diunggah dihapus secara otomatis dari server dalam waktu maksimal 1 jam setelah proses konversi atau setelah diunduh. Anda bertanggung jawab untuk menyimpan salinan hasil konversi Anda sendiri.</p>

          <h2>5. Batasan Layanan</h2>
          <ul>
            <li>Ukuran file maksimum, jumlah konversi harian, dan jenis format yang didukung dapat dibatasi sesuai kebijakan yang berlaku dan ditampilkan di situs</li>
            <li>Kami tidak menjamin bahwa hasil konversi akan 100% identik dengan format asli dalam setiap kasus (misalnya tata letak dokumen kompleks, font khusus, atau elemen tertanam tertentu dapat berubah)</li>
            <li>Kami tidak menjamin Layanan akan selalu bebas dari gangguan, bebas dari kesalahan, atau tersedia tanpa henti (uninterrupted)</li>
          </ul>

          <h2>6. Batasan Tanggung Jawab (Limitation of Liability)</h2>
          <p>Sepanjang diizinkan oleh hukum yang berlaku:</p>
          <ul>
            <li>NielDoc tidak bertanggung jawab atas kehilangan data akibat kegagalan Anda mengunduh hasil konversi sebelum file dihapus otomatis</li>
            <li>NielDoc tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan Layanan</li>
            <li>Layanan disediakan tanpa jaminan tersurat maupun tersirat mengenai kesesuaian untuk tujuan tertentu, kecuali diwajibkan lain oleh hukum yang berlaku</li>
            <li>Tanggung jawab total kami sehubungan dengan penggunaan Layanan, jika ada, tidak akan melebihi jumlah yang Anda bayarkan kepada kami dalam 3 (tiga) bulan terakhir (jika ada layanan berbayar), atau nihil untuk pengguna Layanan gratis</li>
          </ul>

          <h2>7. Akun Pengguna (jika berlaku)</h2>
          <ul>
            <li>Anda bertanggung jawab menjaga kerahasiaan kredensial akun Anda</li>
            <li>Anda bertanggung jawab atas seluruh aktivitas yang terjadi di bawah akun Anda</li>
            <li>Kami berhak menangguhkan atau menghapus akun yang terindikasi melanggar Ketentuan ini</li>
          </ul>

          <h2>8. Layanan Berbayar (jika berlaku)</h2>
          <p>Jika NielDoc menyediakan tier berbayar (misalnya batas file lebih besar atau bebas iklan):</p>
          <ul>
            <li>Harga dan fitur akan ditampilkan secara jelas sebelum transaksi</li>
            <li>Pembayaran diproses melalui penyedia payment gateway pihak ketiga; kami tidak menyimpan data kartu pembayaran Anda</li>
            <li>Kebijakan pengembalian dana (refund), jika ada, akan diinformasikan secara terpisah pada halaman harga</li>
          </ul>

          <h2>9. Kekayaan Intelektual</h2>
          <p>Seluruh elemen Layanan di luar file milik pengguna — termasuk nama "NielDoc", logo, desain antarmuka, dan kode sumber — adalah milik NielDoc dan dilindungi oleh hukum kekayaan intelektual yang berlaku. Anda tidak diperkenankan menyalin, memodifikasi, atau mendistribusikan ulang elemen tersebut tanpa izin tertulis.</p>

          <h2>10. Perubahan Ketentuan</h2>
          <p>Kami dapat memperbarui Ketentuan ini dari waktu ke waktu. Perubahan material akan diinformasikan melalui pemberitahuan di situs. Penggunaan Layanan yang berkelanjutan setelah perubahan berlaku dianggap sebagai persetujuan Anda terhadap Ketentuan yang telah diperbarui.</p>

          <h2>11. Penghentian Layanan</h2>
          <p>Kami berhak menangguhkan atau menghentikan akses Anda ke Layanan, sebagian atau seluruhnya, kapan pun jika ditemukan pelanggaran terhadap Ketentuan ini atau atas kebijakan kami sendiri, dengan atau tanpa pemberitahuan sebelumnya.</p>

          <h2>12. Hukum yang Berlaku</h2>
          <p>Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum yang berlaku di Republik Indonesia. Setiap perselisihan yang timbul akan diselesaikan melalui musyawarah terlebih dahulu, dan jika tidak tercapai kesepakatan, akan diselesaikan sesuai mekanisme hukum yang berlaku.</p>

          <h2>13. Kontak</h2>
          <p>Untuk pertanyaan mengenai Syarat &amp; Ketentuan ini, silakan hubungi:</p>
          <p>Email: nielifydesign@gmail.com</p>
        </div>
      </main>
    </div>
  );
}
