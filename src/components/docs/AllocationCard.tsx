import { MINT_TIERS } from "@/config/docsData";
import { Users, Sparkles, Globe, ShieldCheck } from "lucide-react";

export default function AllocationCard() {
  const getTierIcon = (id: string) => {
    switch (id) {
      case "team":
        return Users;
      case "whitelist":
        return Sparkles;
      case "public":
        return Globe;
      default:
        return ShieldCheck;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {MINT_TIERS.map((tier) => {
        const Icon = getTierIcon(tier.id);
        return (
          <div
            key={tier.id}
            className={`relative rounded-hood-lg border-2 border-hood-primary p-5 sm:p-6 flex flex-col justify-between transition-all ${
              tier.isPrimary
                ? "bg-hood-bg shadow-hood ring-2 ring-hood-accent/40"
                : "bg-hood-bg/60 shadow-hood-sm"
            }`}
          >
            {tier.isPrimary && (
              <div className="absolute -top-3 left-5 font-pixel text-[9px] bg-hood-accent text-hood-light px-2.5 py-0.5 rounded-hood border border-hood-primary font-bold tracking-wider">
                PRIMARY STAGE
              </div>
            )}

            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-hood-secondary/40">
                <span className="font-pixel text-[11px] sm:text-xs font-bold text-hood-accent tracking-wider">
                  {tier.numeral} — {tier.name}
                </span>
                <div className="p-1.5 rounded bg-hood-card border border-hood-primary/20 text-hood-primary">
                  <Icon className="w-4 h-4 stroke-[2]" />
                </div>
              </div>

              {/* Amount */}
              <div>
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-hood-primary tracking-tight block leading-none">
                  {tier.amount}
                </span>
                <span className="text-[10px] font-pixel text-hood-primary/60 uppercase tracking-wider block mt-1.5">
                  NFT ALLOCATION
                </span>
              </div>

              {/* Price & Limit Badges */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-hood-card p-2 rounded border border-hood-secondary/40 text-center">
                  <span className="text-[9px] font-pixel text-hood-primary/60 font-semibold block uppercase">
                    PRICE
                  </span>
                  <span className="font-display text-xs sm:text-sm font-bold text-hood-primary block mt-0.5">
                    {tier.price}
                  </span>
                </div>
                <div className="bg-hood-card p-2 rounded border border-hood-secondary/40 text-center">
                  <span className="text-[9px] font-pixel text-hood-primary/60 font-semibold block uppercase">
                    LIMIT
                  </span>
                  <span className="font-display text-xs sm:text-sm font-bold text-hood-primary block truncate mt-0.5">
                    {tier.limit}
                  </span>
                </div>
              </div>

              {/* Details Copy */}
              <p className="text-xs text-hood-primary/80 font-medium leading-relaxed pt-1">
                {tier.details}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
