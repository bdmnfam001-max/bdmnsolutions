import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import type { ConceptSiteProps } from '@/components/concepts/types';

const colors = {
  white: '#ffffff',
  ice: '#eef6fd',
  iceBorder: '#d3e6f8',
  blue: '#1c74d8',
  navy: '#0f2a4a',
  muted: '#4f6378',
  navyText: '#c9dcf2',
};

const font: CSSProperties = { fontFamily: 'Inter, system-ui, sans-serif' };

export function HvacSite({ project, isMobile }: ConceptSiteProps) {
  const FeaturedIcon = project.services[0].icon;

  return (
    <div style={{ ...font, background: colors.white, color: colors.navy }}>
      <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: colors.ice }}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2 w-2 rounded-full" style={{ background: colors.iceBorder }} />
        ))}
        <div
          className="ml-2 flex-1 rounded-full px-2 py-0.5 text-[9px]"
          style={{ background: colors.white, color: colors.muted }}
        >
          Concept Preview
        </div>
      </div>

      <nav
        className="flex items-center justify-between gap-4 px-6 py-4"
        style={{ borderBottom: `1px solid ${colors.iceBorder}` }}
      >
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-full" style={{ background: colors.blue }} />
          <span className="text-sm font-semibold">{project.category}</span>
        </div>
        {!isMobile && (
          <div className="flex gap-6 text-[11px] font-medium" style={{ color: colors.muted }}>
            <span>Home</span>
            <span>Services</span>
            <span>About</span>
            <span>Contact</span>
          </div>
        )}
        <span
          className="shrink-0 rounded-full px-4 py-2 text-[11px] font-semibold"
          style={{ background: colors.blue, color: colors.white }}
        >
          Get a Quote
        </span>
      </nav>

      <section
        className="grid items-center gap-8 px-6 py-10"
        style={{
          gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr',
          background: `linear-gradient(180deg, ${colors.white} 0%, ${colors.ice} 100%)`,
        }}
      >
        <div>
          <span
            className="inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide"
            style={{ background: colors.white, color: colors.blue, border: `1px solid ${colors.iceBorder}` }}
          >
            {project.businessType}
          </span>
          <h4 className="mt-4 font-bold leading-[1.1] tracking-tight" style={{ fontSize: isMobile ? 26 : 44 }}>
            {project.headline}
          </h4>
          <div className="mt-6 flex flex-wrap gap-3">
            <span
              className="rounded-full px-5 py-2.5 text-[11px] font-semibold"
              style={{ background: colors.blue, color: colors.white }}
            >
              Request a Quote
            </span>
            <span
              className="rounded-full px-5 py-2.5 text-[11px] font-semibold"
              style={{ background: colors.white, color: colors.navy, border: `1px solid ${colors.iceBorder}` }}
            >
              Our Services
            </span>
          </div>
        </div>
        <div className="relative">
          <div
            className="w-full rounded-3xl"
            style={{
              height: isMobile ? 200 : 320,
              backgroundImage: `url(${project.heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 24px 48px -20px rgba(15,42,74,0.35)',
            }}
          />
          <div
            className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3"
            style={{ boxShadow: '0 12px 32px -12px rgba(15,42,74,0.3)' }}
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: colors.blue, color: colors.white }}
            >
              <FeaturedIcon size={16} />
            </span>
            <span className="text-xs font-semibold">{project.services[0].title}</span>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: colors.blue }}>
            What We Offer
          </span>
          <h5 className="mt-2 font-bold" style={{ fontSize: isMobile ? 20 : 28 }}>
            Our Services
          </h5>
        </div>
        <div
          className="mt-8 grid gap-4"
          style={{ gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(160px, 1fr))' }}
        >
          {project.services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="rounded-2xl p-5"
                style={{ background: colors.ice, border: `1px solid ${colors.iceBorder}` }}
              >
                <span
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ background: colors.white, color: colors.blue }}
                >
                  <Icon size={18} />
                </span>
                <h6 className="text-sm font-semibold">{s.title}</h6>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: colors.muted }}>
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="grid items-center gap-8 px-6 py-12"
        style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', background: colors.ice }}
      >
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: colors.blue }}>
            About Us
          </span>
          <h5 className="mt-2 font-bold" style={{ fontSize: isMobile ? 20 : 28 }}>
            {project.aboutTitle}
          </h5>
          <p className="mt-3 text-xs leading-relaxed" style={{ color: colors.muted }}>
            {project.aboutBody}
          </p>
        </div>
        <div
          className="w-full rounded-2xl"
          style={{
            aspectRatio: '4 / 3',
            backgroundImage: `url(${project.previewImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: `6px solid ${colors.white}`,
            boxShadow: '0 16px 40px -20px rgba(15,42,74,0.3)',
          }}
        />
      </section>

      <section className="px-4 pb-10 pt-6">
        <div className="rounded-3xl px-6 py-10 text-center" style={{ background: colors.navy, color: colors.white }}>
          <h5 className="font-bold" style={{ fontSize: isMobile ? 22 : 30 }}>
            {project.ctaHeadline}
          </h5>
          <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed" style={{ color: colors.navyText }}>
            {project.ctaSubtext}
          </p>
          <span
            className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold"
            style={{ background: colors.white, color: colors.navy }}
          >
            Request a Quote <ArrowRight size={13} />
          </span>
        </div>
      </section>

      <div className="px-6 pb-4 text-center text-[9px] uppercase tracking-wide" style={{ color: colors.muted }}>
        Concept demonstration only
      </div>
    </div>
  );
}
