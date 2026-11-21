"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';
import { Hero } from '@/sections/Hero';
import { ValueProps } from '@/sections/ValueProps';
import { Services } from '@/sections/Services';
import { Automation } from '@/sections/Automation';
import { SavingsCalculator } from '@/sections/SavingsCalculator';
import { Portfolio } from '@/sections/Portfolio';
import { WhyChooseUs } from '@/sections/WhyChooseUs';
import { Process } from '@/sections/Process';
import { About } from '@/sections/About';
import { Approach } from '@/sections/Approach';
import { FAQ } from '@/sections/FAQ';
import { Contact } from '@/sections/Contact';
import { FinalCTA } from '@/sections/FinalCTA';
import { useScrollReveal } from '@/hooks/useScroll';

function App() {
  useScrollReveal();

  return (
    <div className="site-shell min-h-screen bg-ink-900 text-white">
      <div className="site-atmosphere" aria-hidden />
      <Header />
      <main className="relative z-[1]">
        <Hero />
        <ValueProps />
        <Services />
        <Automation />
        <SavingsCalculator />
        <Portfolio />
        <WhyChooseUs />
        <Process />
        <About />
        <Approach />
        <FAQ />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
