import type { Metadata } from 'next';
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'QuickLetter — Generator Surat Otomatis | PT Pertamina',
  description:
    'Sistem generator surat resmi otomatis untuk PT Pertamina. Buat Memo Internal dan Surat Izin Kerja Aman (SIKA) berstandar perusahaan dalam hitungan detik dengan live preview A4.',
  keywords: 'quickletter, surat otomatis, memo internal, SIKA, pertamina, generator surat',
  authors: [{ name: 'Fungsi IT — PT Pertamina (Persero)' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
