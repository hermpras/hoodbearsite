"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 bg-hood-primary text-hood-light relative overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#FEF7EF_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-hood-primary border-3 border-hood-secondary/30 p-8 sm:p-14 rounded-hood-lg text-center max-w-4xl mx-auto space-y-8 relative overflow-hidden shadow-2xl"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-hood bg-hood-accent text-hood-light border border-hood-accent/40 shadow-hood-sm">
            <Sparkles className="w-4 h-4" />
            <span className="font-pixel text-xs font-bold uppercase tracking-wider">
              ALLOWLIST OPEN
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-hood-light">
            JOIN THE HOODBEAR
          </h2>

          {/* Supporting Copy */}
          <p className="text-lg text-hood-light/90 font-medium max-w-xl mx-auto leading-relaxed">
            Secure your spot on the allowlist and get early access to mint 1
            bears for free.
          </p>

          {/* CTA Button */}
          <div className="pt-2 flex justify-center">
            <Link
              href="/apply"
              className="font-display text-sm sm:text-base uppercase tracking-wider px-10 py-5 bg-hood-accent hover:bg-amber-700 text-hood-light font-bold border-2 border-hood-light shadow-hood-accent hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2 text-center rounded-hood"
            >
              APPLY TO WL
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Link>
          </div>

          {/* Small Subtext */}
          <p className="text-xs text-hood-secondary font-semibold tracking-wide uppercase pt-2">
            Limited allowlist allocation • Free to mint
          </p>
        </motion.div>
      </div>
    </section>
  );
}
