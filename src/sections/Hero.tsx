import { ArrowRight, Monitor, Smartphone, FileText, Cpu, BellRing } from 'lucide-react';
import { HeroPortfolioCollage } from '@/components/HeroPortfolioCollage';
import { scrollToSection } from '@/utils/scroll';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-36">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-grid opacity-40 mask-fade-b" />
        <div className="absolute -right-32 top-[-8%] h-[560px] w-[560px] rounded-full bg-accent/20 blur-[140px]" />
        <div className="absolute -left-40 bottom-[-10%] h-[320px] w-[320px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute inset-x-0 top-[62%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container-content grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <h1 className="animate-fade-up mt-0 font-display text-[3.4rem] font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-balance text-white sm:text-7xl lg:text-[6.25rem]">
            <span className="block">Work Smarter.</span>
            <span className="mt-1 block text-accent-hover">Save Time.</span>
            <span className="block">Grow Faster.</span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg"
            style={{ animationDelay: '0.08s' }}
          >
            We build high-performing websites and intelligent business automations that help
            businesses attract customers, reduce manual work, save valuable time, and operate more
            efficiently.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"
            style={{ animationDelay: '0.16s' }}
          >
            <button onClick={() => scrollToSection('services')} className="btn-primary w-full sm:w-auto lg:w-full xl:w-auto">
              EXPLORE OUR SOLUTIONS
              <ArrowRight size={17} />
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn-secondary w-full sm:w-auto lg:w-full xl:w-auto">
              LET&apos;S TALK
            </button>
          </div>
        </div>

        <div className="animate-fade-up relative lg:col-span-6" style={{ animationDelay: '0.24s' }}>
          <HeroPortfolioCollage />
          <div className="hero-automation" aria-hidden="true">
            <span className="hero-automation__dot">
              <FileText />
            </span>
            <span className="hero-automation__link" />
            <span className="hero-automation__dot">
              <Cpu />
            </span>
            <span className="hero-automation__link" />
            <span className="hero-automation__dot">
              <BellRing />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DeviceToggle({
  device,
  setDevice,
}: {
  device: 'desktop' | 'mobile';
  setDevice: (d: 'desktop' | 'mobile') => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-ink-800 p-1">
      <button
        onClick={() => setDevice('desktop')}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
          device === 'desktop' ? 'bg-accent text-white' : 'text-muted hover:text-white'
        }`}
        aria-pressed={device === 'desktop'}
      >
        <Monitor size={14} /> Desktop
      </button>
      <button
        onClick={() => setDevice('mobile')}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
          device === 'mobile' ? 'bg-accent text-white' : 'text-muted hover:text-white'
        }`}
        aria-pressed={device === 'mobile'}
      >
        <Smartphone size={14} /> Mobile
      </button>
    </div>
  );
}
