import { SectionHeading } from '@/components/SectionHeading';
import { processSteps } from '@/data/content';

export function Process() {
  return (
    <section id="process" className="editorial-section scroll-mt-20 py-24 sm:py-32">
      <div className="container-content relative z-[1]">
        <SectionHeading
          eyebrow="How We Work"
          index="07"
          align="left"
          title="Simple. Clear. Professional."
          description="A straightforward process that keeps you informed from first conversation to final handover."
        />

        {/* Desktop horizontal timeline */}
        <div className="mt-16 hidden md:block">
          <div className="relative">
            {/* connecting line */}
            <div className="absolute left-0 right-0 top-[34px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="grid grid-cols-4 gap-4">
              {processSteps.map((step, i) => (
                <div
                  key={step.step}
                  className="animate-on-scroll relative flex flex-col items-center text-center"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="relative z-10 flex h-[68px] w-[88px] items-center justify-center border-y border-accent/50 bg-ink-800/90 font-display text-5xl font-extrabold leading-none text-accent">
                    {step.step}
                    <span className="absolute inset-0 rounded-full bg-accent/20 blur-md" aria-hidden />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-extrabold uppercase text-white">{step.title}</h3>
                  <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="mt-12 md:hidden">
          <div className="relative space-y-8 before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
            {processSteps.map((step, i) => (
              <div
                key={step.step}
                className="animate-on-scroll relative flex gap-5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative z-10 flex h-10 w-12 flex-none items-center justify-center border-y border-accent/50 bg-ink-800 font-display text-2xl font-extrabold leading-none text-accent">
                  {step.step}
                </div>
                <div className="pt-1">
                  <h3 className="font-display text-lg font-extrabold uppercase text-white">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
