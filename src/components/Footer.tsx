import Link from 'next/link';
import Image from 'next/image';
import { Twitter } from 'lucide-react';

export default function Footer() {
  const footerLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Collection', href: '#collection' },
    { label: 'Allocation', href: '#how-it-works' },
    { label: 'Docs', href: '/docs' },
    { label: 'Apply', href: '/apply' },
  ];

  return (
    <footer className="bg-hood-bg border-t-2 border-hood-secondary/30 py-12 text-hood-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-hood-secondary/30">
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="#hero" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-hood bg-hood-primary border border-hood-primary flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/bears/bear_1.svg"
                  alt="HoodBear Logo"
                  width={28}
                  height={28}
                  className="pixelated"
                />
              </div>
              <span className="font-display text-lg font-bold tracking-wider text-hood-primary">
                HOODBEAR
              </span>
            </Link>
            <p className="text-sm font-medium text-hood-primary/70">
              A place to belong.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-hood-primary/90 hover:text-hood-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/hoodbear"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-hood bg-hood-card border-2 border-hood-primary hover:bg-hood-accent hover:text-hood-light transition-colors shadow-hood-sm"
              aria-label="X / Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 text-center text-xs text-hood-primary/70 font-medium flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} HOODBEAR. All rights reserved.</span>
          <span className="font-pixel text-[10px] text-hood-primary/70 font-bold">
            5,555 HAND-DRAWN PIXEL BEARS
          </span>
        </div>
      </div>
    </footer>
  );
}
