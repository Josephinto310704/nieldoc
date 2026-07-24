import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
      textAlign: 'center',
      padding: '24px'
    }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>404</h1>
      <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '24px', color: 'var(--text-muted)' }}>
        Mohon maaf, ada sedikit kendala. Halaman tidak ditemukan.
      </h2>
      <Link 
        href="/" 
        style={{
          padding: '8px 16px',
          fontSize: '14px',
          backgroundColor: 'var(--primary)',
          color: '#000',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
          transition: 'all 0.2s ease'
        }}
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
