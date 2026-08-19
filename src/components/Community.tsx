"use client";

import { HOODBEAR_CONFIG } from "@/config/constants";
import { motion } from "framer-motion";
import { ArrowUpRight, Twitter } from "lucide-react";

export default function Community() {
  return (
    <section
      id="community"
      className="py-20 sm:py-28 bg-hood-light border-b-2 border-hood-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-hood bg-hood-bg border border-hood-secondary/60">
            <span className="font-pixel text-xs text-hood-accent uppercase tracking-wider font-bold">
              COMMUNITY HUB
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-hood-primary tracking-tight">
            FIND YOUR PLACE IN THE HOODBEAR
          </h2>
          <p className="text-lg text-hood-primary/80 font-medium">
            Follow our official channel for announcements, art drops, and
            community updates.
          </p>
        </div>

        {/* Single Centered X / Twitter Card */}
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-hood-bg border-3 border-hood-primary p-8 rounded-hood-lg shadow-hood hover:shadow-hood-lg transition-all"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-hood bg-hood-primary text-hood-light flex items-center justify-center shadow-hood-sm">
                  <Twitter className="w-5 h-5" />
                </div>
                <span className="font-pixel text-[10px] text-hood-accent bg-hood-card px-2.5 py-1 rounded-hood border border-hood-secondary/60 font-bold">
                  OFFICIAL X
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-hood-primary">
                  X / Twitter
                </h3>
                <span className="text-xs text-hood-primary/70 font-semibold">
                  @hoodbearNFT
                </span>
              </div>

              <p className="text-sm text-hood-primary/90 font-medium leading-relaxed">
                Follow @hoodbearNFT for official announcements, community
                spotlights, and artwork previews.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-hood-secondary/40">
              <a
                href={HOODBEAR_CONFIG.X_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full font-display text-xs uppercase tracking-wider py-3 px-4 bg-hood-primary hover:bg-hood-accent text-hood-light font-bold rounded-hood border-2 border-hood-primary shadow-hood-sm hover:shadow-hood transition-all flex items-center justify-center gap-2 group"
              >
                FOLLOW ON X
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-[2px] group-hover:translate-y-[-2px] transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
