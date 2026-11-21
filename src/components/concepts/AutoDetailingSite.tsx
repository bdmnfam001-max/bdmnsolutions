import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import type { ConceptSiteProps } from '@/components/concepts/types';

const colors = {
  bg: '#0a0a0b',
  graphite: '#151518',
  steel: '#2a2a31',
  text: '#f4f4f5',
  muted: '#a1a1aa',
  silver: '#d4d7dd',
};

const displayFont: CSSProperties = {
  fontFamily: '"Barlow Condensed", "Arial Narrow", sans-serif',
  textTransform: 'uppercase',
  fontWeight: 700,
  letterSpacing: '0.04em',
};

const angledClip =
  'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)';

export function AutoDetailingSite({ project, isMobile }: ConceptSiteProps) {
  return (
    <div style={{ background: colors.bg, color: colors.text, fontFamily: 'Barlow, system-ui, sans-serif' }}>
      <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: colors.graphite }}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2 w-2" style={{ background: colors.steel }} />
        ))}
        <div
          className="ml-2 flex-1 px-2 py-0.5 text-[9px] uppercase tracking-widest"
          style={{ background: colors.steel, color: colors.muted }}
        >
          Concept Preview
        </div>
      </div>

      <nav
        className="flex items-center justify-between gap-4 px-6 py-4"
        style={{ borderBottom: `1px solid ${colors.steel}` }}
      >
        <span style={{ ...displayFont, fontSize: isMobile ? 13 : 18, letterSpacing: '0.14em' }}>
          {project.category}
        </span>
        {!isMobile && (
          <div className="flex gap-6 text-[11px] uppercase tracking-[0.18em]" style={{ color: colors.muted }}>
            <span>Home</span>
            <span>Services</span>
            <span>About</span>
            <span>Contact</span>
          </div>
        )}
        <span
          className="shrink-0 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em]"
          style={{ background: colors.silver, color: colors.bg, clipPath: angledClip }}
        >
          Get a Quote
        </span>
      </nav>

      <section className="relative flex flex-col justify-end" style={{ minHeight: isMobile ? 300 : 420 }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${project.heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(1) contrast(1.1)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${colors.bg} 10%, rgba(10,10,11,0.55) 70%), linear-gradient(0deg, ${colors.bg} 0%, transparent 50%)`,
          }}
        />
        <div className="relative px-6 pb-10 pt-16">
          <div className="mb-4 h-0.5 w-12" style={{ background: colors.silver }} />
          <h4 className="max-w-xl leading-[0.95]" style={{ ...displayFont, fontSize: isMobile ? 34 : 60 }}>
            {project.headline}
          </h4>
          <p className="mt-4 max-w-md text-xs uppercase tracking-[0.18em]" style={{ color: colors.muted }}>
            {project.businessType}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span
              className="px-6 py-3 text-xs font-bold uppercase tracking-[0.14em]"
              style={{ background: colors.silver, color: colors.bg, clipPath: angledClip }}
            >
              Request a Quote
            </span>
            <span
              className="border px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em]"
              style={{ borderColor: 'rgba(212,215,221,0.4)' }}
            >
              Our Services
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mb-8 flex items-end justify-between gap-4 pb-4" style={{ borderBottom: `1px solid ${colors.steel}` }}>
          <h5 style={{ ...displayFont, fontSize: isMobile ? 22 : 30 }}>Our Services</h5>
          <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: colors.silver }}>
            What We Offer
          </span>
        </div>
        <div
          className="grid gap-px"
          style={{
            background: colors.steel,
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(160px, 1fr))',
          }}
        >
          {project.services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="p-5" style={{ background: colors.graphite }}>
                <div className="mb-6 flex items-center justify-between">
                  <Icon size={20} strokeWidth={1.5} color={colors.silver} />
                  <span className="text-[11px] tracking-widest" style={{ color: colors.muted }}>
                    0{i + 1}
                  </span>
                </div>
                <h6 style={{ ...displayFont, fontSize: 18 }}>{s.title}</h6>
                <p className="mt-2 text-[11px] leading-relaxed" style={{ color: colors.muted }}>
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="grid"
        style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', background: colors.graphite }}
      >
        <div
          className="min-h-[220px]"
          style={{
            backgroundImage: `url(${project.previewImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(1) contrast(1.05)',
          }}
        />
        <div className="flex flex-col justify-center px-6 py-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: colors.silver }}>
            About Us
          </span>
          <h5 className="mt-3 leading-none" style={{ ...displayFont, fontSize: isMobile ? 24 : 34 }}>
            {project.aboutTitle}
          </h5>
          <p className="mt-4 text-xs leading-relaxed" style={{ color: colors.muted }}>
            {project.aboutBody}
          </p>
        </div>
      </section>

      <section className="px-6 py-14 text-center" style={{ borderTop: `1px solid ${colors.steel}` }}>
        <h5 style={{ ...displayFont, fontSize: isMobile ? 24 : 36 }}>{project.ctaHeadline}</h5>
        <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed" style={{ color: colors.muted }}>
          {project.ctaSubtext}
        </p>
        <span
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em]"
          style={{ background: colors.silver, color: colors.bg, clipPath: angledClip }}
        >
          Request a Quote <ArrowRight size={14} />
        </span>
      </section>

      <div
        className="px-6 py-4 text-center text-[9px] uppercase tracking-[0.2em]"
        style={{ background: colors.graphite, color: colors.muted }}
      >
        Concept demonstration only
      </div>
    </div>
  );
}
