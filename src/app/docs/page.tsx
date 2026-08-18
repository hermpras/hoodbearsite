import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-hood-bg flex flex-col items-center justify-center p-6 text-center text-hood-primary">
      <div className="max-w-md w-full bg-hood-card border-3 border-hood-primary p-8 rounded-hood-lg shadow-hood space-y-6">
        <div className="w-16 h-16 mx-auto rounded-hood bg-hood-primary text-hood-accent border-2 border-hood-primary flex items-center justify-center shadow-hood-sm">
          <BookOpen className="w-8 h-8 stroke-[2]" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-hood bg-hood-bg border border-hood-secondary/60 font-pixel text-[10px] text-hood-accent font-bold">
            DOCUMENTATION HUB
          </div>
          <h1 className="font-display text-2xl font-bold text-hood-primary tracking-tight">
            HOODBEAR DOCS
          </h1>
          <p className="text-sm text-hood-primary/80 font-medium leading-relaxed">
            The full HoodBear documentation, mint details, and community guides will be published soon.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-wider px-6 py-3 bg-hood-primary hover:bg-hood-accent text-hood-light font-bold rounded-hood border-2 border-hood-primary shadow-hood transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO HOMEPAGE
          </Link>
        </div>
      </div>
    </div>
  );
}
