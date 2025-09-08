import type { Metadata } from 'next';

import './globals.css';
import HomeHeader from './components/home-header';

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
        <HomeHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
