import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coffee Shop POS',
  description: 'Point of Sale System for Coffee Shops',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
