type SectionHeadingProps = {
  eyebrow?: string;
  index?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left';
  const markerAlignment = align === 'center' ? 'justify-center' : 'justify-start';

  return (
    <div className={`max-w-3xl ${alignment} ${className}`}>
      {eyebrow && (
        <p className={`mb-4 flex items-center gap-3 ${markerAlignment}`}>
          {index && (
            <span className="font-display text-lg font-extrabold leading-none tracking-tight text-white/55">
              {index}
            </span>
          )}
          <span className="inline-block h-[3px] w-8 -skew-x-[34deg] bg-accent" aria-hidden="true" />
          <span className="eyebrow">{eyebrow}</span>
        </p>
      )}
      <h2 className="font-display text-balance text-5xl font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-6xl md:text-7xl">
        {title}
      </h2>
      {description && (
        <p className="text-pretty mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
