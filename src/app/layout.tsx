import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://hoodbear.io'),
  title: 'HoodBear — 5,555 Pixel Bears',
  description: 'HoodBear is a 5,555-piece hand-drawn pixel bear NFT collection. A place to belong.',
  keywords: ['HoodBear', 'NFT', 'Pixel Art', 'Community', 'Pixel Bears', 'Web3'],
  authors: [{ name: 'HoodBear Team' }],
  openGraph: {
    title: 'HoodBear — 5,555 Pixel Bears',
    description: 'HoodBear is a 5,555-piece hand-drawn pixel bear NFT collection. A place to belong.',
    url: 'https://hoodbear.io',
    siteName: 'HoodBear',
    images: [
      {
        url: '/assets/bears/bear_1.svg',
        width: 1200,
        height: 630,
        alt: 'HoodBear Pixel Art Showcase',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HoodBear — 5,555 Pixel Bears',
    description: 'HoodBear is a 5,555-piece hand-drawn pixel bear NFT collection. A place to belong.',
    creator: '@hoodbear',
    images: ['/assets/bears/bear_1.svg'],
  },
  icons: {
    icon: '/assets/bears/bear_1.svg',
    shortcut: '/assets/bears/bear_1.svg',
    apple: '/assets/bears/bear_1.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-cream-100 text-charcoal-900 selection:bg-bear-amber selection:text-white">
        {children}
      </body>
    </html>
  );
}
