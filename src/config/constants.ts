/**
 * HoodBear Single-Source-of-Truth Social Constants & Configuration
 * Used across Phase 2 Allowlist Application checklist & social links.
 */

export const HOODBEAR_CONFIG = {
  // Official HoodBear X Profile URL (Task 01)
  X_PROFILE_URL:
    process.env.NEXT_PUBLIC_HOODBEAR_X_URL || "https://x.com/hoodbearNFT",

  // Official HoodBear Featured Post URL for Like & RT (Task 02) and Comment (Task 03)
  X_POST_URL:
    process.env.NEXT_PUBLIC_HOODBEAR_POST_URL ||
    "https://x.com/HoodBearNFT/status/1888000000000000000",

  // Collection metadata
  TOTAL_SUPPLY: "5,555",
  ALLOWLIST_MAX_PER_WALLET: 1,
} as const;
