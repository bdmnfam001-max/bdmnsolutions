import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { services, automationServices } from '@/data/content';
import { scrollToSection } from '@/utils/scroll';

function ServiceRow({ label, description }: { label: string; description: string }) {
  return (
    <li className="flex items-start gap-3 py-3">
      <span className="mt-[9px] inline-block h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden />
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </li>
  );
}

export function Services() {
  return (
    <section id="services" className="editorial-section scroll-mt-20 py-24 sm:py-32">
      <div className="container-content relative z-[1]">
        <SectionHeading
          eyebrow="Services"
          index="02"
          align="left"
          title="What We Do"
          description="Two equally important services: websites that attract customers, and automations that give you your time back."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Website Design & Development */}
          <div className="animate-on-scroll card card-hover group relative flex flex-col overflow-hidden border-l-2 border-l-accent/40 p-7 sm:p-9">
            <span className="font-display text-5xl font-extrabold leading-none text-white/[0.07]" aria-hidden="true">
              01
            </span>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Website Design &amp; Development
            </p>
            <h3 className="mt-3 font-display text-3xl font-extrabold uppercase leading-[0.95] text-white sm:text-4xl">
              Websites That Work for Your Business.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              A professional website builds credibility, showcases your services, and turns
              visitors into inquiries. We design and develop websites that represent the quality of
              your business and make it easy for potential customers to take the next step.
            </p>

            <ul className="mt-5 divide-y divide-white/[0.06] border-t border-white/[0.06]">
              {services.map((s) => (
                <ServiceRow key={s.id} label={s.title} description={s.description} />
              ))}
            </ul>

            <button
              onClick={() => scrollToSection('portfolio')}
              className="mt-auto inline-flex items-center gap-1.5 self-start pt-7 text-sm font-semibold text-accent transition-colors hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Explore Website Solutions
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Business Process Automation */}
          <div className="animate-on-scroll card card-hover group relative flex flex-col overflow-hidden border-l-2 border-l-accent/40 p-7 sm:p-9" style={{ transitionDelay: '70ms' }}>
            <span className="font-display text-5xl font-extrabold leading-none text-white/[0.07]" aria-hidden="true">
              02
            </span>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Business Process Automation
            </p>
            <h3 className="mt-3 font-display text-3xl font-extrabold uppercase leading-[0.95] text-white sm:text-4xl">
              Less Manual Work. More Time for Business.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Less repetitive work, fewer missed inquiries, and more efficient operations. We
              automate routine tasks so your systems handle them — leaving more time for the work
              that actually moves your business forward.
            </p>

            <ul className="mt-5 divide-y divide-white/[0.06] border-t border-white/[0.06]">
              {automationServices.map((s) => (
                <ServiceRow key={s.id} label={s.title} description={s.description} />
              ))}
            </ul>

            <button
              onClick={() => scrollToSection('automation')}
              className="mt-auto inline-flex items-center gap-1.5 self-start pt-7 text-sm font-semibold text-accent transition-colors hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Explore Automation Solutions
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
