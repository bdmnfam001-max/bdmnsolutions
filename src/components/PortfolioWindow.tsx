import { useRef, type PointerEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/data/projects';

type WindowStyle = {
  tone: 'dark' | 'light';
  layout: 'photo-top' | 'photo-bottom' | 'overlay';
  photoClass: string;
};

const STYLES: WindowStyle[] = [
  { tone: 'dark', layout: 'overlay', photoClass: 'h-64 sm:h-72' },
  { tone: 'light', layout: 'photo-top', photoClass: 'h-40 sm:h-48' },
  { tone: 'light', layout: 'photo-bottom', photoClass: 'h-40 sm:h-48' },
  { tone: 'dark', layout: 'overlay', photoClass: 'h-64 sm:h-72' },
];

const TONE = {
  dark: {
    surface: 'bg-[#0b0d12] text-white border-white/10',
    muted: 'text-white/70',
    number: 'text-white/50',
    link: 'text-accent-hover',
  },
  light: {
    surface: 'bg-white text-[#0b1220] border-black/5',
    muted: 'text-[#4b5563]',
    number: 'text-[#0b1220]/45',
    link: 'text-accent-deep',
  },
} as const;

const FLOAT_DURATIONS = ['7.2s', '8.6s', '6.8s', '9s'];

export function PortfolioWindow({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const style = STYLES[index];
  const tone = TONE[style.tone];
  const Icon = project.icon;

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || e.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty('--tilt-x', `${(-y * 6).toFixed(2)}deg`);
    card.style.setProperty('--tilt-y', `${(x * 8).toFixed(2)}deg`);
  };

  const resetTilt = () => {
    cardRef.current?.style.setProperty('--tilt-x', '0deg');
    cardRef.current?.style.setProperty('--tilt-y', '0deg');
  };

  const isOverlay = style.layout === 'overlay';

  const copy = (
    <div className="relative flex flex-col gap-3 p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white transition-transform duration-300 group-hover:scale-105">
          <Icon size={18} strokeWidth={1.75} aria-hidden />
        </span>
        <span className={`font-display text-sm tracking-[0.18em] ${isOverlay ? 'text-white/70' : tone.number}`}>
          0{index + 1}
        </span>
      </div>
      <div className="mt-2">
        {project.businessName && (
          <p className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${isOverlay ? 'text-white/70' : tone.number}`}>
            {project.businessName}
          </p>
        )}
        <h3 className="mt-1 font-display text-3xl font-extrabold uppercase leading-[0.9] sm:text-4xl">
          {project.label}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed ${isOverlay ? 'text-white/80' : tone.muted}`}>
          {project.businessType}
        </p>
      </div>
      <span
        className={`mt-1 inline-flex items-center gap-1.5 text-xs font-semibold ${isOverlay ? 'text-accent-hover' : tone.link}`}
      >
        View Concept
        <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </div>
  );

  const photo = (
    <div className={`relative w-full overflow-hidden ${style.photoClass}`}>
      <img
        src={project.heroImage}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    </div>
  );

  return (
    <div className="animate-on-scroll h-full" style={{ transitionDelay: `${index * 120}ms` }}>
      <div
        className="float-window"
        style={{ animationDuration: FLOAT_DURATIONS[index], animationDelay: `-${index * 1.4}s` }}
      >
        <div ref={cardRef} className="window-card" onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-label={`View ${project.label} concept`}
            className={`group relative flex w-full flex-col overflow-hidden rounded-[1.5rem] border text-left transition-[border-color] duration-300 hover:border-accent/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.99] ${TONE[style.tone].surface}`}
          >
            {isOverlay ? (
              <div className={`relative flex w-full flex-col justify-end ${style.photoClass}`}>
                <img
                  src={project.heroImage}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/40 to-transparent" />
                {copy}
              </div>
            ) : style.layout === 'photo-top' ? (
              <>
                {photo}
                {copy}
              </>
            ) : (
              <>
                {copy}
                {photo}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
