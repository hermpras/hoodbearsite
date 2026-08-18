"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOCS_SECTIONS } from "@/config/docsData";
import { ArrowUpRight, BookOpen, ChevronDown, Sparkles } from "lucide-react";

interface DocsSidebarProps {
  activeSection: string;
  onSectionClick?: (id: string) => void;
}

export default function DocsSidebar({
  activeSection,
  onSectionClick,
}: DocsSidebarProps) {
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const currentSectionObj =
    DOCS_SECTIONS.find((s) => s.id === activeSection) || DOCS_SECTIONS[0];

  const handleNavClick = (id: string) => {
    setMobileDropdownOpen(false);
    if (onSectionClick) {
      onSectionClick(id);
    }
  };

  return (
    <>
      {/* MOBILE STICKY ACCORDION BAR */}
      <div className="lg:hidden sticky top-[68px] z-40 bg-hood-bg/95 backdrop-blur-md border-b-2 border-hood-primary px-4 py-3 shadow-sm mb-6">
        <button
          type="button"
          onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
          className="w-full flex items-center justify-between p-3 rounded-hood bg-hood-card border-2 border-hood-primary shadow-hood-sm text-left"
          aria-expanded={mobileDropdownOpen}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-hood-primary text-hood-light flex items-center justify-center font-pixel text-[10px] font-bold">
              {currentSectionObj.numeral}
            </div>
            <div>
              <span className="font-pixel text-[9px] text-hood-accent uppercase tracking-wider block">
                CURRENT SECTION
              </span>
              <span className="font-display text-xs font-bold text-hood-primary block">
                {currentSectionObj.title}
              </span>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-hood-primary transition-transform duration-200 ${
              mobileDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {mobileDropdownOpen && (
          <div className="mt-2 p-2 bg-hood-card border-2 border-hood-primary rounded-hood shadow-hood space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
            {DOCS_SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => handleNavClick(section.id)}
                  className={`flex items-center justify-between p-2.5 rounded text-xs font-bold transition-colors ${
                    isActive
                      ? "bg-hood-primary text-hood-light font-display"
                      : "text-hood-primary hover:bg-hood-bg hover:text-hood-accent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-pixel text-[10px] ${
                        isActive ? "text-hood-accent" : "text-hood-primary/60"
                      }`}
                    >
                      {section.numeral}
                    </span>
                    <span>{section.title}</span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-hood-accent" />
                  )}
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* DESKTOP STICKY SIDEBAR */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-28 space-y-5">
          {/* Docs Header Card */}
          <div className="bg-hood-card border-2 border-hood-primary p-4 rounded-hood-lg shadow-hood space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-hood-primary text-hood-accent flex items-center justify-center border border-hood-primary shadow-hood-sm">
                <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="font-display text-sm font-bold text-hood-primary tracking-wide">
                DOCUMENTATION
              </span>
            </div>
            <p className="text-xs text-hood-primary/75 font-medium leading-relaxed">
              Official overview of the HoodBear collection, mint structure, and allowlist process.
            </p>
          </div>

          {/* Navigation Items List */}
          <nav className="bg-hood-card border-2 border-hood-primary p-3 rounded-hood-lg shadow-hood space-y-1">
            <div className="px-3 py-2 border-b border-hood-secondary/30 mb-1">
              <span className="font-pixel text-[9px] text-hood-accent uppercase tracking-wider font-bold">
                TABLE OF CONTENTS
              </span>
            </div>

            {DOCS_SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => handleNavClick(section.id)}
                  className={`group flex items-center justify-between px-3 py-2.5 rounded-hood text-xs transition-all ${
                    isActive
                      ? "bg-hood-primary text-hood-light font-bold shadow-hood-sm translate-x-1"
                      : "text-hood-primary hover:bg-hood-bg hover:text-hood-accent font-semibold"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`font-pixel text-[10px] font-bold ${
                        isActive
                          ? "text-hood-accent"
                          : "text-hood-primary/50 group-hover:text-hood-accent"
                      }`}
                    >
                      {section.numeral}
                    </span>
                    <span className="font-display tracking-tight text-[13px]">
                      {section.title}
                    </span>
                  </div>
                  {isActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-hood-accent" />
                  ) : (
                    <span className="font-pixel text-[9px] text-hood-primary/30 group-hover:text-hood-accent transition-colors">
                      →
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Quick Apply Callout */}
          <div className="bg-hood-card border-2 border-hood-primary p-4 rounded-hood-lg shadow-hood space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-hood-accent" />
              <span className="font-pixel text-[9px] text-hood-primary font-bold uppercase tracking-wider">
                ALLOWLIST APPLICATION
              </span>
            </div>
            <p className="text-xs text-hood-primary/80 font-medium leading-relaxed">
              Complete the community checklist to secure your guaranteed free mint spot.
            </p>
            <Link
              href="/apply"
              className="w-full inline-flex items-center justify-center gap-1.5 font-display text-xs uppercase tracking-wider py-2.5 px-4 bg-hood-accent hover:bg-amber-700 text-hood-light font-bold rounded-hood border-2 border-hood-primary shadow-hood-sm hover:shadow-hood transition-all"
            >
              <span>APPLY FOR ALLOWLIST</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
