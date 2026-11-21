import { ArrowRight } from 'lucide-react';
import { scrollToSection } from '@/utils/scroll';

export function FinalCTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-content">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-800 px-6 py-16 text-center sm:px-12 sm:py-20">
          {/* accents */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute inset-0 bg-grid opacity-20 mask-fade-b" />
            <div className="absolute left-1/2 top-0 h-[260px] w-[520px] -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />
            <div className="absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Bedmansky Digital Solutions Studio
            </div>
            <h2 className="font-display text-balance text-4xl font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-5xl md:text-6xl">
              Ready to Work Smarter and Grow Faster?
            </h2>
            <p className="text-pretty mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Tell us about your business — whether you need a website, an automation, or both, we&apos;ll map out the best way forward.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button onClick={() => scrollToSection('contact')} className="btn-primary w-full sm:w-auto">
                DISCUSS YOUR PROJECT
                <ArrowRight size={17} />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-secondary w-full sm:w-auto"
              >
                Discuss Your Automation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
