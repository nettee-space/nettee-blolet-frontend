import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nettee Blolet",
  description: "Nettee Blolet Frontend Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className='antialiased'>{children}</body>
    </html>
  );
}
