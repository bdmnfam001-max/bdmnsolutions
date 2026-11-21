import { SectionHeading } from '@/components/SectionHeading';
import { valueProps } from '@/data/content';

export function ValueProps() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-content">
        <SectionHeading
          eyebrow="Why It Matters"
          index="01"
          title="Your Business Deserves More Than Just a Website."
          description="A professional website helps customers discover and trust your business. Smart automation helps you manage inquiries, reduce repetitive work, and operate more efficiently."
        />

        <div className="mt-14 grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((vp, i) => {
            const Icon = vp.icon;
            return (
              <article
                key={vp.title}
                className={`animate-on-scroll group border-b border-white/10 px-5 py-7 sm:px-7 sm:py-8 ${
                  i % 2 === 0 ? 'sm:border-r' : ''
                } lg:border-b-0 lg:border-r lg:last:border-r-0`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl font-extrabold leading-none text-white/10">
                    {`0${i + 1}`}
                  </span>
                  <Icon size={21} className="mt-1 text-accent transition-transform group-hover:-translate-y-1" />
                </div>
                <h3 className="mt-7 font-display text-xl font-extrabold uppercase leading-tight text-white">
                  {vp.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{vp.description}</p>
                <div className="mt-6 h-px w-8 bg-accent/70" aria-hidden="true" />
              </article>
            );
          })}
        </div>

        <div className="mt-14 grid border-y border-white/10 sm:grid-cols-3">
          <p className="flex items-baseline gap-3 border-b border-white/10 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted sm:border-b-0 sm:border-r sm:px-5">
            <span className="font-display text-lg font-extrabold text-accent">01</span>
            <span aria-hidden="true">—</span>
            <span>Websites &amp; Automation</span>
          </p>
          <p className="flex items-baseline gap-3 border-b border-white/10 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted sm:border-b-0 sm:border-r sm:px-5">
            <span className="font-display text-lg font-extrabold text-accent">02</span>
            <span aria-hidden="true">—</span>
            <span>Custom Design</span>
          </p>
          <p className="flex items-baseline gap-3 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted sm:px-5">
            <span className="font-display text-lg font-extrabold text-accent">03</span>
            <span aria-hidden="true">—</span>
            <span>Connected Workflows</span>
          </p>
        </div>
      </div>
    </section>
  );
}
