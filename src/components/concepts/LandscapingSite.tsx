import type { CSSProperties } from 'react';
import type { ConceptSiteProps } from '@/components/concepts/types';

const colors = {
  ivory: '#f7f2e8',
  sand: '#ebdfc8',
  sandDeep: '#d8c49f',
  forest: '#2d4a2a',
  moss: '#4f6f47',
  ink: '#2b2a21',
  muted: '#5e5b4a',
  paper: '#efe8d8',
};

const serif: CSSProperties = { fontFamily: '"Cormorant Garamond", Georgia, serif' };
const sans: CSSProperties = { fontFamily: 'Lato, system-ui, sans-serif' };

const organicShape = '58% 42% 46% 54% / 44% 56% 44% 56%';
const archShape = '240px 240px 24px 24px';

export function LandscapingSite({ project, isMobile }: ConceptSiteProps) {
  return (
    <div style={{ ...sans, background: colors.ivory, color: colors.ink }}>
      <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: colors.sand }}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2 w-2 rounded-full" style={{ background: colors.sandDeep }} />
        ))}
        <div
          className="ml-2 flex-1 rounded-full px-2 py-0.5 text-[9px]"
          style={{ background: colors.paper, color: colors.muted }}
        >
          Concept Preview
        </div>
      </div>

      <nav className="flex items-center justify-between gap-4 px-6 py-5">
        <span style={{ ...serif, fontSize: isMobile ? 18 : 24, fontWeight: 600, color: colors.forest }}>
          {project.category}
        </span>
        {!isMobile && (
          <div className="flex gap-6 text-[11px] uppercase tracking-[0.16em]" style={{ color: colors.muted }}>
            <span>Home</span>
            <span>Services</span>
            <span>About</span>
            <span>Contact</span>
          </div>
        )}
        <span
          className="shrink-0 rounded-full px-4 py-2 text-[11px] font-bold"
          style={{ border: `1px solid ${colors.forest}`, color: colors.forest }}
        >
          Get a Quote
        </span>
      </nav>

      <section className="px-6 pb-6 pt-10 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: colors.moss }}>
          {project.businessType}
        </span>
        <h4
          className="mx-auto mt-4 max-w-2xl leading-[1.05]"
          style={{ ...serif, fontSize: isMobile ? 36 : 58, fontWeight: 500, color: colors.forest }}
        >
          {project.headline}
        </h4>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <span
            className="rounded-full px-6 py-3 text-[11px] font-bold"
            style={{ background: colors.forest, color: colors.ivory }}
          >
            Request a Quote
          </span>
          <span
            className="rounded-full px-6 py-3 text-[11px] font-bold"
            style={{ border: `1px solid ${colors.sandDeep}`, color: colors.forest }}
          >
            Our Services
          </span>
        </div>
      </section>

      <section className="relative mx-auto px-6 pb-12 pt-6" style={{ maxWidth: 480 }}>
        <div
          className="absolute -right-2 top-4 h-24 w-24 rounded-full"
          style={{ background: colors.sandDeep, opacity: 0.55 }}
        />
        <div
          className="relative w-full"
          style={{
            height: isMobile ? 260 : 360,
            borderRadius: archShape,
            backgroundImage: `url(${project.heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'sepia(0.12) saturate(0.9)',
          }}
        />
      </section>

      <section className="px-6 py-14">
        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: colors.moss }}>
            What We Offer
          </span>
          <h5 className="mt-2" style={{ ...serif, fontSize: isMobile ? 30 : 42, fontWeight: 500, color: colors.forest }}>
            Our Services
          </h5>
        </div>
        <div
          className="mt-8 grid"
          style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', columnGap: 48 }}
        >
          {project.services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="flex gap-4 py-6"
                style={{ borderBottom: `1px solid ${colors.sandDeep}` }}
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                  style={{ background: colors.sand, color: colors.forest }}
                >
                  <Icon size={20} />
                </span>
                <div>
                  <h6 style={{ ...serif, fontSize: 22, fontWeight: 600, color: colors.forest }}>{s.title}</h6>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: colors.muted }}>
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="grid items-center gap-12 px-6 py-16"
        style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', background: colors.sand }}
      >
        <div
          className="aspect-square w-full"
          style={{
            borderRadius: organicShape,
            backgroundImage: `url(${project.previewImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'sepia(0.1) saturate(0.9)',
          }}
        />
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: colors.moss }}>
            About Us
          </span>
          <h5 className="mt-3 leading-tight" style={{ ...serif, fontSize: isMobile ? 30 : 42, fontWeight: 500, color: colors.forest }}>
            {project.aboutTitle}
          </h5>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: colors.muted }}>
            {project.aboutBody}
          </p>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <h5 style={{ ...serif, fontSize: isMobile ? 28 : 40, fontWeight: 500, color: colors.forest }}>
          {project.ctaHeadline}
        </h5>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed" style={{ color: colors.muted }}>
          {project.ctaSubtext}
        </p>
        <span
          className="mt-7 inline-flex rounded-full px-6 py-3 text-[11px] font-bold"
          style={{ background: colors.forest, color: colors.ivory }}
        >
          Request a Quote
        </span>
      </section>

      <div
        className="px-6 py-5 text-center text-[10px] uppercase tracking-[0.18em]"
        style={{ background: colors.forest, color: colors.paper }}
      >
        Concept demonstration only
      </div>
    </div>
  );
}
