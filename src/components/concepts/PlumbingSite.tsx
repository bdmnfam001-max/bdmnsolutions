import type { CSSProperties } from 'react';
import type { ConceptSiteProps } from '@/components/concepts/types';

const colors = {
  navy: '#13233d',
  navyDeep: '#0c1a2e',
  warm: '#f7f4ef',
  copper: '#d9854a',
  copperDeep: '#a9552a',
  slate: '#9fb0c7',
  line: '#e2dbd0',
  body: '#3d4a5c',
};

const font: CSSProperties = { fontFamily: 'Montserrat, system-ui, sans-serif' };

export function PlumbingSite({ project, isMobile }: ConceptSiteProps) {
  return (
    <div style={{ ...font, background: colors.warm, color: colors.navy }}>
      <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: colors.navyDeep }}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2 w-2" style={{ background: colors.navy }} />
        ))}
        <div className="ml-2 flex-1 px-2 py-0.5 text-[9px]" style={{ background: colors.navy, color: colors.slate }}>
          Concept Preview
        </div>
      </div>

      <nav className="flex items-center justify-between gap-4 px-6 py-4" style={{ background: colors.navy, color: colors.warm }}>
        <div className="flex items-center gap-2.5">
          <span className="h-6 w-6" style={{ background: colors.copper }} />
          <span className="text-xs font-extrabold uppercase tracking-wide">{project.category}</span>
        </div>
        {!isMobile && (
          <div className="flex gap-5 text-[10px] font-semibold uppercase tracking-wider" style={{ color: colors.slate }}>
            <span>Home</span>
            <span>Services</span>
            <span>About</span>
            <span>Contact</span>
          </div>
        )}
        <span
          className="shrink-0 px-4 py-2 text-[10px] font-extrabold uppercase tracking-wide"
          style={{ background: colors.copper, color: colors.navy }}
        >
          Get a Quote
        </span>
      </nav>

      <section
        className="grid items-center gap-8 px-6 py-12"
        style={{ gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr', background: colors.navy, color: colors.warm }}
      >
        <div>
          <span
            className="inline-block border-l-4 pl-3 text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{ borderColor: colors.copper, color: colors.copper }}
          >
            {project.businessType}
          </span>
          <h4
            className="mt-4 font-extrabold uppercase leading-[1.05]"
            style={{ fontSize: isMobile ? 28 : 46 }}
          >
            {project.headline}
          </h4>
          <div className="mt-7 flex flex-wrap gap-3">
            <span
              className="px-5 py-3 text-[11px] font-extrabold uppercase tracking-wide"
              style={{ background: colors.copper, color: colors.navy }}
            >
              Request a Quote
            </span>
            <span
              className="px-5 py-3 text-[11px] font-extrabold uppercase tracking-wide"
              style={{ border: `2px solid ${colors.warm}`, color: colors.warm }}
            >
              Our Services
            </span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 translate-x-3 translate-y-3 border-2" style={{ borderColor: colors.copper }} />
          <div
            className="relative w-full"
            style={{
              height: isMobile ? 220 : 320,
              backgroundImage: `linear-gradient(160deg, rgba(19,35,61,0.1), rgba(19,35,61,0.75)), url(${project.heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="flex items-center gap-3">
          <span className="h-6 w-1.5" style={{ background: colors.copper }} />
          <span className="text-[10px] font-extrabold uppercase tracking-[0.18em]" style={{ color: colors.copperDeep }}>
            What We Offer
          </span>
        </div>
        <h5 className="mt-3 font-extrabold uppercase" style={{ fontSize: isMobile ? 22 : 28 }}>
          Our Services
        </h5>
        <div
          className="mt-8 grid gap-4"
          style={{ gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(180px, 1fr))' }}
        >
          {project.services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="p-5"
                style={{ background: '#ffffff', border: `1px solid ${colors.line}`, borderTop: `4px solid ${colors.copper}` }}
              >
                <span
                  className="flex h-10 w-10 items-center justify-center"
                  style={{ background: colors.navy, color: colors.warm }}
                >
                  <Icon size={18} />
                </span>
                <h6 className="mt-4 text-xs font-extrabold uppercase tracking-wide">{s.title}</h6>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: colors.body }}>
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="grid items-center gap-10 px-6 py-14"
        style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', background: '#ffffff' }}
      >
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.18em]" style={{ color: colors.copperDeep }}>
            About Us
          </span>
          <h5 className="mt-2 font-extrabold uppercase leading-tight" style={{ fontSize: isMobile ? 22 : 30 }}>
            {project.aboutTitle}
          </h5>
          <p className="mt-4 text-xs leading-relaxed" style={{ color: colors.body }}>
            {project.aboutBody}
          </p>
        </div>
        <div
          className="w-full"
          style={{
            aspectRatio: '4 / 3',
            backgroundImage: `url(${project.previewImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderBottom: `6px solid ${colors.copper}`,
          }}
        />
      </section>

      <section className="px-6 py-12 text-center" style={{ background: colors.copper, color: colors.navy }}>
        <h5 className="font-extrabold uppercase" style={{ fontSize: isMobile ? 22 : 30 }}>
          {project.ctaHeadline}
        </h5>
        <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed">{project.ctaSubtext}</p>
        <span
          className="mt-6 inline-flex px-6 py-3 text-[11px] font-extrabold uppercase tracking-wide"
          style={{ background: colors.navy, color: colors.warm }}
        >
          Request a Quote
        </span>
      </section>

      <div
        className="px-6 py-4 text-center text-[9px] uppercase tracking-[0.2em]"
        style={{ background: colors.navyDeep, color: colors.slate }}
      >
        Concept demonstration only
      </div>
    </div>
  );
}
