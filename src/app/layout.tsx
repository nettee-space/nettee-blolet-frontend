import type { Metadata } from 'next';

import './globals.css';
import Header from './components/header';

export const metadata: Metadata = {
  title: 'Blolet',
  description: 'Nettee Blolet Frontend Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className='antialiased'>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
