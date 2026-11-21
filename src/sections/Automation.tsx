import { useEffect, useRef, useState } from 'react';
import { FileText, Cpu, Database, BellRing } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';

const beforeItems = [
  'Manual data entry',
  'Repetitive emails',
  'Scattered leads',
  'Copying information between tools',
  'Forgotten follow-ups',
];

const afterItems = [
  'Automated data processing',
  'Organized leads',
  'Automatic follow-ups',
  'Connected business systems',
  'Timely notifications',
];

const workflowSteps = [
  { label: 'Website Form', description: 'A customer submits an inquiry.', icon: FileText },
  { label: 'Automation', description: 'The inquiry is captured and processed.', icon: Cpu },
  { label: 'CRM', description: 'The lead is organized in one place.', icon: Database },
  { label: 'Email / Notifications', description: 'The right person is notified instantly.', icon: BellRing },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function ComparisonColumn({
  title,
  tone,
  items,
  accent,
}: {
  title: string;
  tone: 'muted' | 'positive';
  items: string[];
  accent?: boolean;
}) {
  return (
    <div
      className={`card p-6 sm:p-7 ${
        accent ? 'border border-accent/30 shadow-[0_0_40px_-18px_rgba(10,99,209,0.55)]' : ''
      }`}
    >
      <p
        className={`font-display text-2xl font-extrabold uppercase leading-none sm:text-3xl ${
          tone === 'positive' ? 'text-accent' : 'text-white/60'
        }`}
      >
        {title}
      </p>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
            <span
              className={`mt-[7px] inline-block h-1.5 w-1.5 flex-none rounded-full ${
                tone === 'positive' ? 'bg-accent' : 'bg-white/30'
              }`}
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function WorkflowDiagram() {
  const { ref, inView } = useInView();

  return (
    <div ref={ref} className="card mt-6 p-6 sm:p-8">
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <p className="font-display text-2xl font-extrabold uppercase leading-none text-white sm:text-3xl">
          How an Inquiry Flows Automatically
        </p>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted/70">
          Illustrative workflow
        </p>
      </div>

      <ol className="mt-8 grid gap-3 sm:grid-cols-4 sm:gap-0">
        {workflowSteps.map((step, i) => {
          const Icon = step.icon;
          const isLast = i === workflowSteps.length - 1;
          return (
            <li
              key={step.label}
              className={`relative flex items-center gap-4 sm:flex-col sm:items-center sm:text-center ${
                isLast ? '' : 'sm:pr-3'
              }`}
            >
              <div
                className="flex items-center gap-3 transition-opacity duration-700 sm:flex-col sm:gap-3"
                style={{ opacity: inView ? 1 : 0.25, transitionDelay: `${i * 180}ms` }}
              >
                <span className="flow-node relative inline-flex h-12 w-12 flex-none items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent" style={{ animationDelay: `${i * 1.7}s` }}>
                  <Icon size={20} aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{step.label}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">{step.description}</p>
                </div>
              </div>
              {!isLast && (
                <span aria-hidden className="flow-line relative hidden h-px flex-1 self-center bg-white/15 sm:ml-0 sm:block sm:w-full sm:flex-none">
                  <span className="flow-pulse" style={{ animationDelay: `${i * 1.7}s` }} />
                </span>
              )}
              {!isLast && (
                <span aria-hidden className="flow-line flow-line--vertical relative h-8 w-px flex-none bg-white/15 sm:hidden">
                  <span className="flow-pulse flow-pulse--vertical" style={{ animationDelay: `${i * 1.7}s` }} />
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <p className="mt-8 border-t border-white/10 pt-4 text-xs leading-relaxed text-muted/80">
        This is an illustrative example of how a customer inquiry can be processed automatically —
        not a depiction of an existing client project.
      </p>
    </div>
  );
}

export function Automation() {
  return (
    <section id="automation" className="editorial-section scroll-mt-20 py-24 sm:py-32">
      <div className="container-content relative z-[1]">
        <SectionHeading
          eyebrow="Automation"
          index="03"
          align="left"
          title="Your Business Has Better Things to Do Than Repetitive Tasks."
          description="See the difference automation makes in a typical workday."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="animate-on-scroll">
            <ComparisonColumn title="Before" tone="muted" items={beforeItems} />
          </div>
          <div className="animate-on-scroll" style={{ transitionDelay: '70ms' }}>
            <ComparisonColumn title="After" tone="positive" items={afterItems} accent />
          </div>
        </div>

        <div className="animate-on-scroll">
          <WorkflowDiagram />
        </div>
      </div>
    </section>
  );
}
