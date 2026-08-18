import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Collection from '@/components/Collection';
import MintSection from '@/components/MintSection';
import Community from '@/components/Community';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-hood-bg text-hood-primary selection:bg-hood-accent selection:text-hood-light">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero */}
      <Hero />

      {/* 3. Collection */}
      <Collection />

      {/* 4. Allocation */}
      <MintSection />

      {/* 5. Community */}
      <Community />

      {/* 6. Final Apply CTA */}
      <FinalCTA />

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}
