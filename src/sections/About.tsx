import { SectionHeading } from '@/components/SectionHeading';

export function About() {
  return (
    <section id="about" className="editorial-section editorial-section--about scroll-mt-20 py-24 sm:py-32">
      <div className="container-content relative z-[1]">
        <SectionHeading eyebrow="About" index="08" align="left" title="The Person Behind the Studio" />

        <div className="mt-14 grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Brand visual — structured so a real photo can replace this block later */}
          <div className="animate-on-scroll relative mx-auto w-full max-w-sm">
            <div className="relative aspect-square overflow-hidden rounded-sm border border-white/15 bg-[#080b12] shadow-[0_30px_90px_-30px_rgba(0,0,0,0.8)]">
              <div className="absolute inset-0 bg-grid opacity-25" aria-hidden />
              <div className="absolute -right-12 top-[-20%] h-[140%] w-8 rotate-[32deg] bg-accent/[0.08]" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 top-0 w-px bg-accent/35" aria-hidden="true" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-2xl bg-ink-900/80 p-4 backdrop-blur">
                  <img
                    src="/assets/BDsologo-transparent.png"
                    alt="Bedmansky Design Studio logo"
                    width={1254}
                    height={1254}
                    className="h-auto w-56 object-contain"
                  />
                </div>
              </div>
              {/* accent corner */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-900/80 px-3 py-1.5 backdrop-blur">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-[11px] font-medium text-muted">BD Studio</span>
              </div>
            </div>
            <div className="absolute -inset-4 -z-10 rounded-full bg-accent/10 blur-3xl" aria-hidden />
          </div>

          {/* Text */}
          <div className="animate-on-scroll">
            <p className="font-display text-4xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-5xl">
              Dennis Bedmansky
            </p>
            <p className="mt-3 border-l-2 border-accent pl-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              Founder & Web Designer
            </p>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              <p>
                Bedmansky Digital Solutions Studio was created with one goal: helping small
                businesses work smarter — with websites that attract customers and automations
                that reduce manual work.
              </p>
              <p>
                I believe technology should do more than look good. A website should communicate
                clearly and make it easy for customers to take the next step, and routine work
                should run itself so you can focus on your business.
              </p>
              <p>
                I work directly with business owners across industries to design websites and
                automation workflows tailored to how their business actually works.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                Websites &amp; Automations
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                Direct Collaboration
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                Worldwide Projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
