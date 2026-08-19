"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 bg-hood-bg text-hood-primary border-b-2 border-hood-secondary/30 relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#273524_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-hood-card border-3 border-hood-primary p-8 sm:p-14 rounded-hood-lg text-center max-w-4xl mx-auto space-y-7 shadow-hood-lg relative overflow-hidden"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-hood bg-hood-bg border border-hood-secondary/60 shadow-hood-sm">
            <Sparkles className="w-4 h-4 text-hood-accent" />
            <span className="font-pixel text-xs text-hood-accent font-bold uppercase tracking-wider">
              ALLOWLIST OPEN
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-hood-primary uppercase">
            GET IN THE HOOD
          </h2>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-hood-primary/85 font-medium max-w-xl mx-auto leading-relaxed">
            Secure your spot on the allowlist and get guaranteed access to mint
            1 bear for free.
          </p>

          {/* CTA Button */}
          <div className="pt-2 flex justify-center">
            <Link
              href="/apply"
              className="font-display text-xs sm:text-sm uppercase tracking-wider px-9 py-4 bg-hood-accent hover:bg-amber-700 text-hood-light font-bold border-2 border-hood-primary shadow-hood hover:shadow-hood-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2 text-center rounded-hood"
            >
              <span>APPLY TO WL</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

          {/* Small Subtext */}
          <p className="text-xs text-hood-primary/70 font-semibold tracking-wide uppercase pt-1">
            Limited allowlist allocation • Free to mint
          </p>
        </motion.div>
      </div>
    </section>
  );
}
