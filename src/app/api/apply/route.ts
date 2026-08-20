import { NextResponse } from "next/server";
import { dbOperations } from "@/db";

// Regex patterns for validation
const ETH_WALLET_REGEX = /^0x[a-fA-F0-9]{40}$/;
const X_STATUS_URL_REGEX =
  /^https?:\/\/(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/[0-9]+/;
const X_HANDLE_REGEX = /^@?[a-zA-Z0-9_]{1,30}$/;

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

async function verifyTurnstileToken(
  token: string,
  remoteIp: string | null,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Misconfiguration: fail closed so bots can't slip through silently.
    console.error("TURNSTILE_SECRET_KEY is not set.");
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secret);
    formData.append("response", token);
    if (remoteIp) formData.append("remoteip", remoteIp);

    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body: formData,
    });

    const outcome = await res.json();
    return outcome?.success === true;
  } catch (error) {
    console.error("Turnstile verification request failed:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      xUsername,
      walletAddress,
      commentUrl,
      taskFollowX,
      taskLikeRepost,
      taskComment,
      turnstileToken,
    } = body || {};

    // 1. Turnstile Verification (checked first, before touching the DB)
    if (typeof turnstileToken !== "string" || !turnstileToken) {
      return NextResponse.json(
        { error: "Verification challenge missing. Please try again." },
        { status: 400 },
      );
    }
    const remoteIp =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      null;
    const isHuman = await verifyTurnstileToken(turnstileToken, remoteIp);
    if (!isHuman) {
      return NextResponse.json(
        { error: "Verification failed. Please try again." },
        { status: 403 },
      );
    }

    // 2. Task Completion Validation
    if (!taskFollowX || !taskLikeRepost || !taskComment) {
      return NextResponse.json(
        { error: "Please complete all three tasks." },
        { status: 400 },
      );
    }

    // 3. X Username Validation
    const trimmedXUsername =
      typeof xUsername === "string" ? xUsername.trim() : "";
    if (!trimmedXUsername || !X_HANDLE_REGEX.test(trimmedXUsername)) {
      return NextResponse.json(
        { error: "Please enter your X username." },
        { status: 400 },
      );
    }
    // Normalize X Username (ensure leading @)
    const normalizedXUsername = trimmedXUsername.startsWith("@")
      ? trimmedXUsername
      : `@${trimmedXUsername}`;

    // 4. Wallet Address Validation
    const trimmedWallet =
      typeof walletAddress === "string" ? walletAddress.trim() : "";
    if (!trimmedWallet || !ETH_WALLET_REGEX.test(trimmedWallet)) {
      return NextResponse.json(
        { error: "Please enter a valid wallet address." },
        { status: 400 },
      );
    }
    const normalizedWallet = trimmedWallet.toLowerCase();

    // 5. Comment URL Validation
    const trimmedCommentUrl =
      typeof commentUrl === "string" ? commentUrl.trim() : "";
    if (!trimmedCommentUrl || !X_STATUS_URL_REGEX.test(trimmedCommentUrl)) {
      return NextResponse.json(
        { error: "Please enter your X comment link." },
        { status: 400 },
      );
    }

    // 6. Duplicate Wallet Check
    const existingWallet = await dbOperations.findByWallet(normalizedWallet);
    if (existingWallet) {
      return NextResponse.json(
        { error: "THIS WALLET HAS ALREADY APPLIED." },
        { status: 409 },
      );
    }

    // 7. Duplicate X Username Check
    const existingXUser =
      await dbOperations.findByXUsername(normalizedXUsername);
    if (existingXUser) {
      return NextResponse.json(
        { error: "THIS X USERNAME HAS ALREADY APPLIED." },
        { status: 409 },
      );
    }

    // 8. Save Application to Database
    const record = await dbOperations.createApplication({
      xUsername: normalizedXUsername,
      walletAddress: trimmedWallet, // Preserve original checksum string if provided
      commentUrl: trimmedCommentUrl,
      taskFollowX: true,
      taskLikeRepost: true,
      taskComment: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your HoodBear allowlist application has been received.",
        application: {
          id: record.id,
          xUsername: record.xUsername,
          walletAddress: record.walletAddress,
          status: record.status,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
