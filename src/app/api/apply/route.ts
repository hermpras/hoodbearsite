import { NextResponse } from 'next/server';
import { dbOperations } from '@/db';

// Regex patterns for validation
const ETH_WALLET_REGEX = /^0x[a-fA-F0-9]{40}$/;
const X_STATUS_URL_REGEX = /^https?:\/\/(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/[0-9]+/;
const X_HANDLE_REGEX = /^@?[a-zA-Z0-9_]{1,30}$/;

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
    } = body || {};

    // 1. Task Completion Validation
    if (!taskFollowX || !taskLikeRepost || !taskComment) {
      return NextResponse.json(
        { error: 'Please complete all three tasks.' },
        { status: 400 }
      );
    }

    // 2. X Username Validation
    const trimmedXUsername = typeof xUsername === 'string' ? xUsername.trim() : '';
    if (!trimmedXUsername || !X_HANDLE_REGEX.test(trimmedXUsername)) {
      return NextResponse.json(
        { error: 'Please enter your X username.' },
        { status: 400 }
      );
    }
    // Normalize X Username (ensure leading @)
    const normalizedXUsername = trimmedXUsername.startsWith('@')
      ? trimmedXUsername
      : `@${trimmedXUsername}`;

    // 3. Wallet Address Validation
    const trimmedWallet = typeof walletAddress === 'string' ? walletAddress.trim() : '';
    if (!trimmedWallet || !ETH_WALLET_REGEX.test(trimmedWallet)) {
      return NextResponse.json(
        { error: 'Please enter a valid wallet address.' },
        { status: 400 }
      );
    }
    const normalizedWallet = trimmedWallet.toLowerCase();

    // 4. Comment URL Validation
    const trimmedCommentUrl = typeof commentUrl === 'string' ? commentUrl.trim() : '';
    if (!trimmedCommentUrl || !X_STATUS_URL_REGEX.test(trimmedCommentUrl)) {
      return NextResponse.json(
        { error: 'Please enter your X comment link.' },
        { status: 400 }
      );
    }

    // 5. Duplicate Wallet Check
    const existingWallet = await dbOperations.findByWallet(normalizedWallet);
    if (existingWallet) {
      return NextResponse.json(
        { error: 'THIS WALLET HAS ALREADY APPLIED.' },
        { status: 409 }
      );
    }

    // 6. Duplicate X Username Check
    const existingXUser = await dbOperations.findByXUsername(normalizedXUsername);
    if (existingXUser) {
      return NextResponse.json(
        { error: 'THIS X USERNAME HAS ALREADY APPLIED.' },
        { status: 409 }
      );
    }

    // 7. Save Application to Database
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
        message: 'Your HoodBear allowlist application has been received.',
        application: {
          id: record.id,
          xUsername: record.xUsername,
          walletAddress: record.walletAddress,
          status: record.status,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
