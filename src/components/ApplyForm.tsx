"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Check,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { HOODBEAR_CONFIG } from "@/config/constants";

const ETH_WALLET_REGEX = /^0x[a-fA-F0-9]{40}$/;
const X_STATUS_URL_REGEX =
  /^https?:\/\/(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/[0-9]+/;
const X_HANDLE_REGEX = /^@?[a-zA-Z0-9_]{1,30}$/;

export default function ApplyForm() {
  // Task completion states
  const [task1Follow, setTask1Follow] = useState(false);
  const [task2LikeRt, setTask2LikeRt] = useState(false);
  const [task3CommentUrl, setTask3CommentUrl] = useState("");
  const [task3Confirmed, setTask3Confirmed] = useState(false);

  // Form input states
  const [xUsername, setXUsername] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  // UI status states
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    xUsername: string;
    walletAddress: string;
  } | null>(null);

  // Determine Task 03 completion
  const isTask3Valid =
    task3Confirmed || X_STATUS_URL_REGEX.test(task3CommentUrl.trim());

  // Count completed tasks
  const completedCount =
    (task1Follow ? 1 : 0) + (task2LikeRt ? 1 : 0) + (isTask3Valid ? 1 : 0);

  const isFormUnlocked = completedCount === 3;

  // Handle Comment URL change
  const handleCommentUrlChange = (val: string) => {
    setTask3CommentUrl(val);
    setErrorMsg(null);
    if (X_STATUS_URL_REGEX.test(val.trim())) {
      setTask3Confirmed(true);
    }
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // 1. Task Completion check
    if (!isFormUnlocked) {
      setErrorMsg("Please complete all three tasks.");
      return;
    }

    // 2. X Username check
    const trimmedX = xUsername.trim();
    if (!trimmedX || !X_HANDLE_REGEX.test(trimmedX)) {
      setErrorMsg("Please enter your X username.");
      return;
    }

    // 3. Wallet Address check
    const trimmedWallet = walletAddress.trim();
    if (!trimmedWallet || !ETH_WALLET_REGEX.test(trimmedWallet)) {
      setErrorMsg("Please enter a valid wallet address.");
      return;
    }

    // 4. Comment URL check
    const trimmedCommentUrl = task3CommentUrl.trim();
    if (!trimmedCommentUrl || !X_STATUS_URL_REGEX.test(trimmedCommentUrl)) {
      setErrorMsg("Please enter your X comment link.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          xUsername: trimmedX,
          walletAddress: trimmedWallet,
          commentUrl: trimmedCommentUrl,
          taskFollowX: task1Follow,
          taskLikeRepost: task2LikeRt,
          taskComment: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setSubmittedData({
        xUsername: data.application?.xUsername || trimmedX,
        walletAddress: trimmedWallet,
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (isSubmitted) {
    return (
      <div className="bg-hood-card border-2 border-hood-primary p-6 sm:p-8 rounded-hood-lg shadow-hood space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center space-y-4 pt-2">
          <div className="w-16 h-16 rounded-hood bg-hood-primary text-hood-light border-2 border-hood-primary flex items-center justify-center shadow-hood-sm">
            <CheckCircle2 className="w-8 h-8 text-hood-accent" />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-hood bg-hood-bg border border-hood-secondary/60 font-pixel text-[10px] text-hood-accent font-bold">
              <Sparkles className="w-3 h-3" />
              APPLICATION RECEIVED
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-hood-primary tracking-tight">
              APPLICATION RECEIVED
            </h2>
            <p className="text-sm text-hood-primary/80 font-medium max-w-md pt-1">
              Your HoodBear allowlist application has been received. Keep an eye
              on HoodBear for updates.
            </p>
          </div>
        </div>

        <div className="bg-hood-bg border-2 border-hood-primary/30 rounded-hood p-4 space-y-3 font-mono text-xs text-hood-primary">
          <div className="flex justify-between items-center pb-2 border-b border-hood-secondary/40">
            <span className="font-bold text-hood-primary/70">STATUS:</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 font-pixel font-bold text-[10px] uppercase">
              PENDING
            </span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-hood-secondary/40">
            <span className="font-bold text-hood-primary/70">X USERNAME:</span>
            <span className="font-bold text-hood-primary">
              {submittedData?.xUsername}
            </span>
          </div>
          <div className="flex justify-between items-start gap-2">
            <span className="font-bold text-hood-primary/70 shrink-0">
              ROBINHOOD WALLET:
            </span>
            <span className="font-bold text-hood-primary text-right break-all">
              {submittedData?.walletAddress}
            </span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className="w-full text-center font-display text-xs uppercase tracking-wider px-6 py-3 bg-hood-primary hover:bg-hood-accent text-hood-light font-bold rounded-hood border-2 border-hood-primary shadow-hood transition-colors"
          >
            RETURN TO HOMEPAGE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 1. PROGRESS INDICATOR CARD */}
      <div className="bg-hood-card border-2 border-hood-primary p-5 sm:p-6 rounded-hood-lg shadow-hood space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-pixel text-[10px] text-hood-accent font-bold uppercase tracking-wider">
              REQUIREMENTS
            </span>
            <h3 className="font-display text-lg font-bold text-hood-primary">
              MISSION CHECKLIST
            </h3>
          </div>
          <div className="px-3 py-1.5 rounded-hood bg-hood-primary text-hood-light font-pixel text-xs font-bold border-2 border-hood-primary shadow-hood-sm">
            {completedCount} / 3 COMPLETE
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-hood-bg border-2 border-hood-primary h-4 rounded-hood overflow-hidden p-0.5">
          <div
            className="bg-hood-accent h-full rounded-[2px] transition-all duration-300 ease-out"
            style={{ width: `${(completedCount / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* 2. THREE TASKS CHECKLIST */}
      <div className="space-y-4">
        {/* TASK 01 */}
        <div
          className={`border-2 rounded-hood-lg p-5 transition-all ${
            task1Follow
              ? "bg-hood-card border-hood-primary shadow-hood"
              : "bg-hood-card/60 border-hood-secondary/60 shadow-sm"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-pixel text-xs text-hood-accent font-bold">
                  TASK 01
                </span>
                {task1Follow && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-pixel bg-green-800/10 text-green-800 px-2 py-0.5 rounded font-bold">
                    <Check className="w-3 h-3 stroke-[3]" /> DONE
                  </span>
                )}
              </div>
              <h4 className="font-display text-base font-bold text-hood-primary">
                FOLLOW HOODBEAR ON X
              </h4>
              <p className="text-xs text-hood-primary/80 font-medium">
                Follow the official HoodBear account on X, then return and
                confirm.
              </p>
            </div>

            <a
              href={HOODBEAR_CONFIG.X_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-hood-primary hover:bg-hood-accent text-hood-light font-display text-xs font-bold rounded-hood border-2 border-hood-primary shadow-hood-sm transition-all shrink-0"
            >
              FOLLOW ON X
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="mt-4 pt-3 border-t border-hood-secondary/30">
            <label className="inline-flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={task1Follow}
                onChange={(e) => {
                  setTask1Follow(e.target.checked);
                  setErrorMsg(null);
                }}
                className="w-5 h-5 rounded border-2 border-hood-primary text-hood-accent focus:ring-hood-accent focus:ring-offset-0 cursor-pointer accent-[#C47A3A]"
              />
              <span className="text-xs font-bold text-hood-primary">
                I followed @hoodbearNFT
              </span>
            </label>
          </div>
        </div>

        {/* TASK 02 */}
        <div
          className={`border-2 rounded-hood-lg p-5 transition-all ${
            task2LikeRt
              ? "bg-hood-card border-hood-primary shadow-hood"
              : "bg-hood-card/60 border-hood-secondary/60 shadow-sm"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-pixel text-xs text-hood-accent font-bold">
                  TASK 02
                </span>
                {task2LikeRt && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-pixel bg-green-800/10 text-green-800 px-2 py-0.5 rounded font-bold">
                    <Check className="w-3 h-3 stroke-[3]" /> DONE
                  </span>
                )}
              </div>
              <h4 className="font-display text-base font-bold text-hood-primary">
                LIKE & REPOST
              </h4>
              <p className="text-xs text-hood-primary/80 font-medium">
                Like and repost the official HoodBear post, then return and
                confirm.
              </p>
            </div>

            <a
              href={HOODBEAR_CONFIG.X_POST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-hood-primary hover:bg-hood-accent text-hood-light font-display text-xs font-bold rounded-hood border-2 border-hood-primary shadow-hood-sm transition-all shrink-0"
            >
              LIKE & RT POST
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="mt-4 pt-3 border-t border-hood-secondary/30">
            <label className="inline-flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={task2LikeRt}
                onChange={(e) => {
                  setTask2LikeRt(e.target.checked);
                  setErrorMsg(null);
                }}
                className="w-5 h-5 rounded border-2 border-hood-primary text-hood-accent focus:ring-hood-accent focus:ring-offset-0 cursor-pointer accent-[#C47A3A]"
              />
              <span className="text-xs font-bold text-hood-primary">
                I liked and reposted the post
              </span>
            </label>
          </div>
        </div>

        {/* TASK 03 */}
        <div
          className={`border-2 rounded-hood-lg p-5 transition-all ${
            isTask3Valid
              ? "bg-hood-card border-hood-primary shadow-hood"
              : "bg-hood-card/60 border-hood-secondary/60 shadow-sm"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-pixel text-xs text-hood-accent font-bold">
                  TASK 03
                </span>
                {isTask3Valid && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-pixel bg-green-800/10 text-green-800 px-2 py-0.5 rounded font-bold">
                    <Check className="w-3 h-3 stroke-[3]" /> DONE
                  </span>
                )}
              </div>
              <h4 className="font-display text-base font-bold text-hood-primary">
                COMMENT & TAG 2 FRENS
              </h4>
              <p className="text-xs text-hood-primary/80 font-medium">
                Comment on the HoodBear post and tag 2 friends.
              </p>
            </div>

            <a
              href={HOODBEAR_CONFIG.X_POST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-hood-primary hover:bg-hood-accent text-hood-light font-display text-xs font-bold rounded-hood border-2 border-hood-primary shadow-hood-sm transition-all shrink-0"
            >
              COMMENT ON X
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="mt-4 pt-3 border-t border-hood-secondary/30 space-y-3">
            <div className="space-y-1">
              <label
                htmlFor="comment-url-input"
                className="block text-xs font-bold text-hood-primary uppercase tracking-wider"
              >
                PASTE YOUR COMMENT LINK
              </label>
              <input
                id="comment-url-input"
                type="url"
                value={task3CommentUrl}
                onChange={(e) => handleCommentUrlChange(e.target.value)}
                placeholder="https://x.com/you/status/..."
                className="w-full px-3.5 py-2.5 bg-hood-bg border-2 border-hood-primary rounded-hood text-sm text-hood-primary placeholder-hood-primary/40 font-mono focus:outline-none focus:border-hood-accent transition-colors"
              />
            </div>

            <label className="inline-flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={task3Confirmed}
                onChange={(e) => {
                  setTask3Confirmed(e.target.checked);
                  setErrorMsg(null);
                }}
                className="w-5 h-5 rounded border-2 border-hood-primary text-hood-accent focus:ring-hood-accent focus:ring-offset-0 cursor-pointer accent-[#C47A3A]"
              />
              <span className="text-xs font-bold text-hood-primary">
                I commented and tagged 2 friends
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* 3. YOUR DETAILS FORM SECTION */}
      <div
        className={`border-2 rounded-hood-lg p-6 transition-all ${
          isFormUnlocked
            ? "bg-hood-card border-hood-primary shadow-hood"
            : "bg-hood-card/40 border-hood-secondary/40 opacity-90"
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-hood-secondary/30 mb-6">
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-hood border-2 ${
                isFormUnlocked
                  ? "bg-hood-accent text-hood-light border-hood-primary shadow-hood-sm"
                  : "bg-hood-secondary/20 text-hood-primary/60 border-hood-secondary/50"
              }`}
            >
              {isFormUnlocked ? (
                <Unlock className="w-5 h-5 stroke-[2.5]" />
              ) : (
                <Lock className="w-5 h-5 stroke-[2.5]" />
              )}
            </div>
            <div>
              <span className="font-pixel text-[10px] text-hood-accent font-bold uppercase tracking-wider">
                STEP 2
              </span>
              <h3 className="font-display text-lg font-bold text-hood-primary">
                YOUR DETAILS
              </h3>
            </div>
          </div>

          <div
            className={`font-pixel text-[10px] font-bold px-2.5 py-1 rounded border ${
              isFormUnlocked
                ? "bg-green-800/10 border-green-800/30 text-green-800"
                : "bg-amber-800/10 border-amber-800/30 text-amber-900"
            }`}
          >
            {isFormUnlocked ? "UNLOCKED" : "LOCKED"}
          </div>
        </div>

        {/* LOCKED STATE BANNER */}
        {!isFormUnlocked && (
          <div className="mb-6 p-4 rounded-hood bg-amber-500/10 border-2 border-amber-800/20 text-amber-900 flex items-center gap-3">
            <Lock className="w-5 h-5 text-amber-800 shrink-0" />
            <p className="text-xs font-bold">
              Complete all three steps to unlock your application.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* X USERNAME FIELD */}
          <div className="space-y-1.5">
            <label
              htmlFor="x-username-input"
              className="block font-display text-xs font-bold text-hood-primary uppercase tracking-wider"
            >
              X USERNAME <span className="text-hood-accent">*</span>
            </label>
            <input
              id="x-username-input"
              type="text"
              disabled={!isFormUnlocked || isSubmitting}
              value={xUsername}
              onChange={(e) => {
                setXUsername(e.target.value);
                setErrorMsg(null);
              }}
              placeholder="@username"
              className="w-full px-4 py-3 bg-hood-bg border-2 border-hood-primary rounded-hood text-sm text-hood-primary font-medium placeholder-hood-primary/40 focus:outline-none focus:border-hood-accent disabled:bg-hood-secondary/20 disabled:cursor-not-allowed transition-colors shadow-sm"
            />
          </div>

          {/* ROBINHOOD WALLET FIELD */}
          <div className="space-y-1.5">
            <label
              htmlFor="wallet-address-input"
              className="block font-display text-xs font-bold text-hood-primary uppercase tracking-wider"
            >
              ROBINHOOD WALLET <span className="text-hood-accent">*</span>
            </label>
            <input
              id="wallet-address-input"
              type="text"
              disabled={!isFormUnlocked || isSubmitting}
              value={walletAddress}
              onChange={(e) => {
                setWalletAddress(e.target.value);
                setErrorMsg(null);
              }}
              placeholder="0x... or wallet address"
              className="w-full px-4 py-3 bg-hood-bg border-2 border-hood-primary rounded-hood text-sm font-mono text-hood-primary placeholder-hood-primary/40 focus:outline-none focus:border-hood-accent disabled:bg-hood-secondary/20 disabled:cursor-not-allowed transition-colors shadow-sm"
            />
            <p className="text-[11px] text-hood-primary/70 font-medium">
              Enter a valid Ethereum-compatible wallet address. Manual input
              only — no wallet connection required.
            </p>
          </div>

          {/* INLINE ERROR MESSAGES */}
          {errorMsg && (
            <div className="p-3.5 rounded-hood bg-red-500/10 border-2 border-red-700/30 text-red-800 text-xs font-bold flex items-center gap-2.5 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!isFormUnlocked || isSubmitting}
              className={`w-full py-4 px-6 rounded-hood font-display text-sm uppercase tracking-wider font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                isFormUnlocked && !isSubmitting
                  ? "bg-hood-accent hover:bg-amber-700 text-hood-light border-hood-primary shadow-hood hover:shadow-hood-sm hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
                  : "bg-hood-secondary/30 text-hood-primary/40 border-hood-secondary/60 cursor-not-allowed shadow-none"
              }`}
            >
              {isSubmitting ? (
                <span>SUBMITTING APPLICATION...</span>
              ) : (
                <>
                  <span>SUBMIT APPLICATION</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
