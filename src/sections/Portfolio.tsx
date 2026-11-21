import { useState } from 'react';
import { ArrowRight, FileText, Cpu, Database } from 'lucide-react';
import { PortfolioWindow } from '@/components/PortfolioWindow';
import { ProjectModal } from '@/components/ProjectModal';
import { projects, type Project } from '@/data/projects';
import { scrollToSection } from '@/utils/scroll';

export function Portfolio() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="relative isolate scroll-mt-24 overflow-hidden bg-[#f1eee8] py-20 text-[#0b1220] sm:py-28">
      <div className="pointer-events-none absolute -right-40 top-0 h-[540px] w-[680px] -skew-x-12 bg-[linear-gradient(120deg,transparent_0%,rgba(10,99,209,0.1)_52%,transparent_53%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-[#0b1220]/[0.06] lg:block" aria-hidden />
      <div className="container-content relative z-[1]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent-deep">
              <span className="font-display text-2xl font-extrabold leading-none text-[#0b1220]/35">05</span>
              <span aria-hidden className="h-px w-8 -skew-x-[34deg] bg-accent-deep" />
              Portfolio
            </p>
            <h2 className="mt-4 font-display text-5xl font-extrabold uppercase leading-[0.92] tracking-tight text-balance sm:text-6xl">
              Digital Solutions for <span className="text-accent-deep">Every Business</span>
            </h2>
            <p className="mt-5 max-w-sm text-pretty text-base leading-relaxed text-[#4b5563] sm:text-lg">
              We create websites and automation workflows for businesses of different sizes and industries.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection('services')}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0b0d12] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-deep"
            >
              Explore Services
              <ArrowRight size={16} />
            </button>

            <div
              className="mt-8 rounded-xl border border-white/10 bg-[#0b0d12] p-4 text-white sm:p-5"
              aria-label="Illustrative automation example: customer inquiry flows to automation, then to CRM and notification"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A7ADB8]">
                Illustrative automation example
              </p>
              <ol className="mt-3 flex items-center gap-2 sm:gap-3">
                {[
                  { label: 'Customer Inquiry', icon: FileText },
                  { label: 'Automation', icon: Cpu },
                  { label: 'CRM / Notification', icon: Database },
                ].map((node, i, arr) => (
                  <li key={node.label} className="flex min-w-0 flex-1 items-center gap-2 last:flex-none">
                    <span className="flex flex-col items-center gap-1.5 text-center">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#0878FF]/35 bg-[#0878FF]/12 text-[#4a9bff] sm:h-10 sm:w-10">
                        <node.icon size={17} aria-hidden />
                      </span>
                      <span className="max-w-[5.5rem] text-[10px] font-medium leading-tight text-[#A7ADB8] sm:max-w-none sm:text-[11px]">
                        {node.label}
                      </span>
                    </span>
                    {i < arr.length - 1 && (
                      <span aria-hidden className="flow-line relative h-px min-w-4 flex-1 self-center bg-white/15">
                        <span className="flow-pulse" style={{ animationDelay: `${i * 1.7}s` }} />
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-5 lg:col-span-8">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className={
                  i === 1 ? 'sm:mt-10' : i === 2 ? 'sm:-mt-2' : i === 3 ? 'sm:mt-8' : ''
                }
              >
                <PortfolioWindow project={project} index={i} onOpen={setActive} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-5 border-t border-[#0b1220]/15 pt-7 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] sm:gap-8">
          <h3 className="font-display text-2xl font-extrabold uppercase leading-[0.95] sm:text-3xl">
            Beyond these four concepts.
          </h3>
          <div>
            <p className="max-w-3xl text-sm leading-relaxed text-[#4b5563] sm:text-base">
              These examples show different design directions — not the limits of the businesses we work with. We welcome projects across industries, from independent operators to growing teams and established companies.
            </p>
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('contact');
              }}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-deep underline decoration-accent-deep/35 underline-offset-4 transition-colors hover:text-[#0b1220] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-deep"
            >
              Have a different industry in mind? Let&apos;s talk.
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
