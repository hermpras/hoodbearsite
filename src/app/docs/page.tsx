"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DOCS_SECTIONS,
  COLLECTION_DATA,
  ALLOWLIST_INFO,
  PUBLIC_MINT_INFO,
  HOLDER_BENEFITS_INFO,
} from "@/config/docsData";
import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsHeader from "@/components/docs/DocsHeader";
import SectionWrapper from "@/components/docs/SectionWrapper";
import AllocationCard from "@/components/docs/AllocationCard";
import {
  ArrowRight,
  Sparkles,
  Layers,
  ShieldCheck,
  Globe,
  Palette,
  Eye,
} from "lucide-react";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<string>("introduction");

  // IntersectionObserver for active section scroll tracking
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Pick the top visible section
        const topEntry = visibleEntries.reduce((prev, curr) =>
          prev.boundingClientRect.top < curr.boundingClientRect.top
            ? prev
            : curr,
        );
        setActiveSection(topEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0, 0.2, 0.5],
    });

    DOCS_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Quick Action Header */}
      <DocsHeader />

      {/* Main 2-Column Documentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Sticky Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3">
          <DocsSidebar
            activeSection={activeSection}
            onSectionClick={(id) => setActiveSection(id)}
          />
        </div>

        {/* CENTER / MAIN: Editorial Documentation Content */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-8 lg:space-y-10">
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              01 — INTRODUCTION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <SectionWrapper
            id="introduction"
            numeral="01"
            title="Introduction"
            description="A place to belong in HoodBear."
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-3.5">
                  <p className="text-sm sm:text-base text-hood-primary font-medium leading-relaxed">
                    HoodBear is a <strong>5,555-piece</strong> collection of
                    hand-drawn pixel bears created around collecting, identity,
                    and the feeling of belonging to HoodBear.
                  </p>
                  <p className="text-xs sm:text-sm text-hood-primary/80 leading-relaxed font-medium">
                    Each HoodBear is generated from a rich library of
                    handcrafted pixel traits — combining diverse expressions,
                    distinct outfits, and unique colorways designed to let every
                    collector express their own personality.
                  </p>
                </div>

                {/* Feature Visual Accent */}
                <div className="md:col-span-4 flex justify-center">
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-hood-lg bg-hood-bg border-2 border-hood-primary p-2 shadow-hood flex items-center justify-center">
                    <Image
                      src="/assets/bears/bear_1.png"
                      alt="HoodBear Genesis"
                      width={140}
                      height={140}
                      priority
                      className="pixelated object-contain"
                    />
                    <div className="absolute bottom-1 right-1 font-pixel text-[9px] bg-hood-primary text-hood-light px-1.5 py-0.5 rounded">
                      #0001
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                <div className="p-4 rounded-hood bg-hood-bg border border-hood-secondary/60 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-hood-accent shrink-0" />
                    <span className="font-display text-xs font-bold text-hood-primary uppercase tracking-wide">
                      Handcrafted Art
                    </span>
                  </div>
                  <p className="text-xs text-hood-primary/75 font-medium leading-relaxed">
                    Every piece is crafted pixel-by-pixel with meticulous
                    attention to detail.
                  </p>
                </div>

                <div className="p-4 rounded-hood bg-hood-bg border border-hood-secondary/60 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-hood-accent shrink-0" />
                    <span className="font-display text-xs font-bold text-hood-primary uppercase tracking-wide">
                      Identity & Belonging
                    </span>
                  </div>
                  <p className="text-xs text-hood-primary/75 font-medium leading-relaxed">
                    A digital identity for enthusiasts, creators, and pixel art
                    collectors.
                  </p>
                </div>

                <div className="p-4 rounded-hood bg-hood-bg border border-hood-secondary/60 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-hood-accent shrink-0" />
                    <span className="font-display text-xs font-bold text-hood-primary uppercase tracking-wide">
                      Fair Distribution
                    </span>
                  </div>
                  <p className="text-xs text-hood-primary/75 font-medium leading-relaxed">
                    Transparent mint mechanics with free allocation for active
                    community members.
                  </p>
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              02 — COLLECTION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <SectionWrapper
            id="collection"
            numeral="02"
            title="Collection"
            description="Verified specifications and technical overview for the HoodBear collection."
          >
            <div className="space-y-5">
              {/* Stat Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                <div className="p-4 sm:p-5 rounded-hood bg-hood-bg border-2 border-hood-primary text-center space-y-1">
                  <span className="font-pixel text-[9px] sm:text-[10px] text-hood-accent font-bold uppercase tracking-wider block">
                    TOTAL SUPPLY
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-hood-primary block leading-tight">
                    {COLLECTION_DATA.supply}
                  </span>
                  <span className="text-[10px] font-semibold text-hood-primary/60 uppercase block">
                    Unique NFTs
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-hood bg-hood-bg border-2 border-hood-primary text-center space-y-1">
                  <span className="font-pixel text-[9px] sm:text-[10px] text-hood-accent font-bold uppercase tracking-wider block">
                    BLOCKCHAIN
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-hood-primary block leading-tight">
                    {COLLECTION_DATA.chain}
                  </span>
                  <span className="text-[10px] font-semibold text-hood-primary/60 uppercase block">
                    Network
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-hood bg-hood-bg border-2 border-hood-primary text-center space-y-1">
                  <span className="font-pixel text-[9px] sm:text-[10px] text-hood-accent font-bold uppercase tracking-wider block">
                    ARTWORK TYPE
                  </span>
                  <span className="font-display text-base sm:text-lg font-bold text-hood-primary block pt-1 leading-tight">
                    Pixel Art
                  </span>
                  <span className="text-[10px] font-semibold text-hood-primary/60 uppercase block">
                    Hand-Drawn
                  </span>
                </div>
              </div>

              {/* Reveal Note */}
              <div className="flex items-start gap-3.5 p-4 rounded-hood bg-hood-bg border border-hood-secondary/70 text-xs sm:text-sm text-hood-primary">
                <div className="p-1 rounded bg-hood-accent/15 text-hood-accent shrink-0 mt-0.5">
                  <Eye className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-display font-bold uppercase tracking-wide text-xs text-hood-primary block">
                    Reveal
                  </span>
                  <p className="text-hood-primary/80 font-medium leading-relaxed text-xs sm:text-sm">
                    Delayed — art reveals after minting closes
                  </p>
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              03 — HOW THE MINT WORKS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <SectionWrapper
            id="how-the-mint-works"
            numeral="03"
            title="How the Mint Works"
            description="Clear and transparent breakdown of the mint allocation across Team, Whitelist, and Public stages."
          >
            <AllocationCard />
          </SectionWrapper>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              04 — ALLOWLIST
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <SectionWrapper
            id="allowlist"
            numeral="04"
            title="Allowlist"
            description="Guaranteed free mint access for approved community applicants."
          >
            <div className="space-y-6">
              {/* Key Allowlist Rules Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                <div className="bg-hood-bg border-2 border-hood-primary p-4 sm:p-5 rounded-hood space-y-1 text-center">
                  <span className="font-pixel text-[9px] sm:text-[10px] text-hood-accent font-bold uppercase tracking-wider block">
                    ALLOWLIST SUPPLY
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-hood-primary block leading-tight">
                    {ALLOWLIST_INFO.supply}
                  </span>
                  <span className="text-[11px] font-medium text-hood-primary/70 block">
                    Guaranteed spots
                  </span>
                </div>

                <div className="bg-hood-bg border-2 border-hood-primary p-4 sm:p-5 rounded-hood space-y-1 text-center">
                  <span className="font-pixel text-[9px] sm:text-[10px] text-hood-accent font-bold uppercase tracking-wider block">
                    MINT PRICE
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-800 block leading-tight">
                    {ALLOWLIST_INFO.price}
                  </span>
                  <span className="text-[11px] font-medium text-hood-primary/70 block">
                    100% Free to mint
                  </span>
                </div>

                <div className="bg-hood-bg border-2 border-hood-primary p-4 sm:p-5 rounded-hood space-y-1 text-center">
                  <span className="font-pixel text-[9px] sm:text-[10px] text-hood-accent font-bold uppercase tracking-wider block">
                    WALLET LIMIT
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-hood-primary block leading-tight">
                    {ALLOWLIST_INFO.limitPerWallet}
                  </span>
                  <span className="text-[11px] font-medium text-hood-primary/70 block">
                    Per approved wallet
                  </span>
                </div>
              </div>

              {/* How to Apply Steps */}
              <div className="p-5 sm:p-6 rounded-hood-lg bg-hood-bg border-2 border-hood-primary space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-hood-accent shrink-0" />
                  <h4 className="font-display text-sm sm:text-base font-bold text-hood-primary uppercase tracking-wide">
                    How to Apply for Allowlist
                  </h4>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-hood-primary/85 font-medium leading-relaxed">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-hood-primary text-hood-light flex items-center justify-center font-pixel text-[10px] font-bold shrink-0 mt-0.5 shadow-hood-sm">
                      1
                    </div>
                    <span>
                      Complete the 3 community social missions on the official
                      application page (Follow, Like & Repost, Comment).
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-hood-primary text-hood-light flex items-center justify-center font-pixel text-[10px] font-bold shrink-0 mt-0.5 shadow-hood-sm">
                      2
                    </div>
                    <span>
                      Submit your verified X username and Robinhood wallet
                      address.
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-hood-primary text-hood-light flex items-center justify-center font-pixel text-[10px] font-bold shrink-0 mt-0.5 shadow-hood-sm">
                      3
                    </div>
                    <span>
                      Approved applicants will receive guaranteed access to mint
                      1 HoodBear for free during the allowlist window.
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/apply"
                    className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-wider px-6 py-3 bg-hood-accent hover:bg-amber-700 text-hood-light font-bold rounded-hood border-2 border-hood-primary shadow-hood hover:shadow-hood-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                  >
                    <span>APPLY FOR ALLOWLIST</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              05 — PUBLIC MINT
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <SectionWrapper
            id="public-mint"
            numeral="05"
            title="Public Mint"
            description="Open participation phase for collectors following the allowlist mint window."
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                <div className="bg-hood-bg border-2 border-hood-primary p-4 sm:p-5 rounded-hood space-y-1 text-center">
                  <span className="font-pixel text-[9px] sm:text-[10px] text-hood-accent font-bold uppercase tracking-wider block">
                    PUBLIC ALLOCATION
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-hood-primary block leading-tight">
                    {PUBLIC_MINT_INFO.supply}
                  </span>
                  <span className="text-[11px] font-medium text-hood-primary/70 block">
                    Available allocation
                  </span>
                </div>

                <div className="bg-hood-bg border-2 border-hood-primary p-4 sm:p-5 rounded-hood space-y-1 text-center">
                  <span className="font-pixel text-[9px] sm:text-[10px] text-hood-accent font-bold uppercase tracking-wider block">
                    MINT PRICE
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-hood-primary block leading-tight">
                    {PUBLIC_MINT_INFO.price}
                  </span>
                  <span className="text-[11px] font-medium text-hood-primary/70 block">
                    Flat rate per bear
                  </span>
                </div>

                <div className="bg-hood-bg border-2 border-hood-primary p-4 sm:p-5 rounded-hood space-y-1 text-center">
                  <span className="font-pixel text-[9px] sm:text-[10px] text-hood-accent font-bold uppercase tracking-wider block">
                    WALLET LIMIT
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-hood-primary block leading-tight">
                    {PUBLIC_MINT_INFO.limitPerWallet}
                  </span>
                  <span className="text-[11px] font-medium text-hood-primary/70 block">
                    Max per wallet
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-hood-lg bg-hood-bg border-2 border-hood-primary/60 space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-hood-accent shrink-0" />
                  <h4 className="font-display text-xs sm:text-sm font-bold text-hood-primary uppercase tracking-wide">
                    Public Mint Overview
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-hood-primary/80 font-medium leading-relaxed">
                  The Public Mint opens after the allowlist phase is completed.
                  Anyone can participate to mint a HoodBear at 0.00025 ETH (max
                  5 per wallet) until the total collection supply of 5,555 is
                  reached.
                </p>
              </div>
            </div>
          </SectionWrapper>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              06 — HOLDER BENEFITS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <SectionWrapper
            id="holder-benefits"
            numeral="06"
            title="Holder Benefits"
            description="Exclusive snapshot rewards and the upcoming Mutant Bear 2nd collection airdrop."
          >
            <div className="space-y-6">
              {/* Featured Mutant Bear Airdrop Card */}
              <div className="p-6 sm:p-8 rounded-hood-lg bg-hood-bg border-2 border-hood-primary space-y-5 shadow-hood-sm">
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-hood-accent shrink-0" />
                    <span className="font-pixel text-[10px] text-hood-accent font-bold uppercase tracking-wider">
                      2ND COLLECTION AIRDROP
                    </span>
                  </div>
                  <div className="px-2.5 py-0.5 rounded bg-hood-accent/15 border border-hood-accent/30 font-pixel text-[9px] text-hood-accent font-bold">
                    FREE FOR HOLDERS
                  </div>
                </div>

                <div className="space-y-2.5">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-hood-primary uppercase tracking-tight">
                    Mutant Bear Airdrop
                  </h3>
                  <p className="text-sm sm:text-[15px] text-hood-primary/85 font-medium leading-relaxed max-w-2xl">
                    Holding Genesis HoodBears unlocks direct access to the
                    future of the HoodBear ecosystem. All verified holders
                    holding 3 or more Genesis HoodBears will be eligible to
                    receive a free airdrop of the upcoming 2nd collection:{" "}
                    <strong>Mutant Bear</strong>.
                  </p>
                </div>

                <div className="pt-4 border-t border-hood-secondary/30 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-[13px] text-hood-primary/85 font-medium">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-hood-accent shrink-0" />
                    <span className="font-bold text-hood-primary">
                      3 Genesis HoodBear = 1 Mutant Bear Airdrop eligibility
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-hood-accent shrink-0" />
                    <span>
                      Snapshots will be captured after the initial mint
                      concludes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
}
