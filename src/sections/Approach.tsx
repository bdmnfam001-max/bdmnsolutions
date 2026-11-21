import { SectionHeading } from '@/components/SectionHeading';
import { approachPrinciples } from '@/data/content';

export function Approach() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-content">
        <SectionHeading
          eyebrow="Our Approach"
          title="How We Work With You."
          description="Principles that guide every project — built on clarity and reliability."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {approachPrinciples.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="animate-on-scroll card card-hover group relative overflow-hidden p-7 text-center"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="pointer-events-none absolute -top-12 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" aria-hidden />
                <div className="relative">
                  <div className="mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
