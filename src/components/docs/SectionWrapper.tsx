import React from "react";

interface SectionWrapperProps {
  id: string;
  numeral: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function SectionWrapper({
  id,
  numeral,
  title,
  description,
  children,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className="scroll-mt-28 bg-hood-card border-2 border-hood-primary rounded-hood-lg p-6 sm:p-8 lg:p-9 shadow-hood space-y-7 transition-all"
    >
      {/* Section Header */}
      <div className="space-y-3 pb-5 border-b border-hood-secondary/40">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-hood bg-hood-bg border border-hood-secondary/60">
          <span className="font-pixel text-[9px] sm:text-[10px] text-hood-accent uppercase tracking-wider font-bold">
            {numeral}
          </span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-hood-primary uppercase leading-tight">
          {title}
        </h2>

        {description && (
          <p className="text-sm sm:text-[15px] text-hood-primary/80 font-medium leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {/* Section Body */}
      <div className="space-y-6 text-hood-primary text-sm sm:text-[15px] font-sans leading-relaxed">
        {children}
      </div>
    </section>
  );
}
