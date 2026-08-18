import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";

export default function DocsHeader() {
  return (
    <div className="bg-hood-card border-2 border-hood-primary rounded-hood-lg p-6 sm:p-8 shadow-hood mb-8 sm:mb-10 space-y-4">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-hood-secondary/30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-hood-primary text-hood-accent flex items-center justify-center border border-hood-primary shadow-hood-sm">
            <BookOpen className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <div className="font-pixel text-[9px] sm:text-[10px] text-hood-accent font-bold uppercase tracking-wider">
              DOCUMENTATION HUB
            </div>
            <div className="font-display text-xs sm:text-sm font-bold text-hood-primary tracking-wide">
              HOODBEAR OFFICIAL DOCS
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-wider px-3.5 py-2 bg-hood-bg hover:bg-hood-light text-hood-primary font-bold rounded-hood border border-hood-primary shadow-hood-sm transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>HOME</span>
          </Link>
          <Link
            href="/apply"
            className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-wider px-3.5 py-2 bg-hood-accent hover:bg-amber-700 text-hood-light font-bold rounded-hood border border-hood-primary shadow-hood-sm transition-all"
          >
            <span>APPLY TO WL</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>
      </div>

      {/* Main Title & Lead Summary */}
      <div className="space-y-2 pt-1">
        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-hood-primary uppercase leading-tight">
          HOODBEAR DOCUMENTATION
        </h1>
        <p className="text-sm sm:text-base text-hood-primary/80 font-medium leading-relaxed max-w-3xl">
          Everything you need to know about the 5,555-piece collection, mint allocation, and allowlist process.
        </p>
      </div>
    </div>
  );
}
