import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sebastian Selinger | Fullstack Developer & QA Expert',
  description: 'Professional fullstack developer with 8+ years experience in gaming industry. Expert in React, Node.js, Python, test automation with Selenium & Cypress.',
  keywords: ['Sebastian Selinger', 'Fullstack Developer', 'QA Expert', 'Gaming Industry', 'React', 'Node.js', 'Python'],
  authors: [{ name: 'Sebastian Selinger' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sebastianselinger.de',
    title: 'Sebastian Selinger | Fullstack Developer & QA Expert',
    description: 'Professional fullstack developer with 8+ years experience in gaming industry.',
    siteName: 'Sebastian Selinger Portfolio',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
