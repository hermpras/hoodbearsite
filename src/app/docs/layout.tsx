import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Documentation — HoodBear",
  description:
    "Official documentation for HoodBear: 5,555 pixel bears on Robinhood chain. Collection details, mint allocation, allowlist, and traits.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-hood-bg text-hood-primary flex flex-col selection:bg-hood-accent selection:text-hood-light">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Main Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {children}
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}
