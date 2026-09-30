import Link from 'next/link';

// Rendered only for requests the locale proxy does not handle.
export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ margin: 0, minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#06070b', color: '#f2efe8', fontFamily: 'system-ui, sans-serif' }}>
        <main style={{ textAlign: 'center', padding: '2rem' }}>
          <p lang="ar">هالصفحة مو موجودة.</p>
          <p lang="en" dir="ltr">This page could not be found.</p>
          <p>
            <Link href="/ar" style={{ color: '#f2efe8' }}>العربية</Link>
            {' · '}
            <Link href="/en" lang="en" style={{ color: '#f2efe8' }}>English</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
