import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Currencies from '../components/Currencies';
import Integration from '../components/Integration';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import Cta from '../components/Cta';
import Footer from '../components/Footer';

function LandingPage() {
  useEffect(() => {
    document.title = 'CryptoGate | Modern Crypto Payment Gateway';
    
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💳</text></svg>';
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Currencies />
        <Integration />
        <Pricing />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;