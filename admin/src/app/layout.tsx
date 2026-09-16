import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Cleanovox Admin',
  description: 'Διαχείριση κρατήσεων Cleanovox',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#0E1414',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className={`${manrope.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
