import { useState } from 'react';
import { ArrowRight, Clock, Wallet, CalendarDays, PiggyBank } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { scrollToSection } from '@/utils/scroll';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(value));
}

function ResultCard({
  icon: Icon,
  label,
  value,
  highlighted,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`card p-5 ${
        highlighted
          ? 'border border-accent/40 bg-accent/[0.08] shadow-[0_0_50px_-20px_rgba(10,99,209,0.6)]'
          : ''
      }`}
    >
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-muted">
        <Icon size={15} className={highlighted ? 'text-accent' : 'text-muted'} aria-hidden />
        {label}
      </div>
      <p
        className={`mt-2 font-display font-extrabold leading-none ${
          highlighted ? 'text-3xl text-accent sm:text-4xl' : 'text-2xl text-white'
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export function SavingsCalculator() {
  const [hours, setHours] = useState(8);
  const [hourlyValue, setHourlyValue] = useState(30);

  const weeklyHours = hours;
  const annualHours = weeklyHours * 52;
  const monthlyCost = (weeklyHours * hourlyValue * 52) / 12;
  const annualCost = weeklyHours * hourlyValue * 52;

  return (
    <section id="calculator" className="editorial-section scroll-mt-20 py-24 sm:py-32">
      <div className="container-content relative z-[1]">
        <SectionHeading
          eyebrow="Savings Calculator"
          index="04"
          align="left"
          title="How Much Is Manual Work Costing Your Business?"
          description="Adjust the values below to see how much time repetitive work takes, and what that time is worth. The hourly value can represent an employee's labor cost or the estimated value of your own time."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Inputs */}
          <div className="animate-on-scroll card space-y-8 p-6 sm:p-8">
            <div>
              <label htmlFor="calc-hours" className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-semibold text-white">Total repetitive hours per week</span>
                <span className="font-display text-xl font-extrabold text-accent">{hours} h</span>
              </label>
              <input
                id="calc-hours"
                type="range"
                min={0}
                max={40}
                step={1}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                aria-valuetext={`${hours} hours per week across the business`}
                className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-accent"
              />
              <div className="mt-1.5 flex justify-between text-xs text-muted/70">
                <span>0 h</span>
                <span>40 h</span>
              </div>
            </div>

            <div>
              <label htmlFor="calc-cost" className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-semibold text-white">Estimated value of one working hour</span>
                <span className="font-display text-xl font-extrabold text-accent">${hourlyValue}</span>
              </label>
              <div className="relative mt-4">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-sm text-muted" aria-hidden>
                  $
                </span>
                <input
                  id="calc-cost"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={150}
                  step={1}
                  value={hourlyValue}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (Number.isNaN(v)) return;
                    setHourlyValue(Math.min(150, Math.max(0, Math.round(v))));
                  }}
                  className="input-field pl-8"
                  aria-describedby="calc-cost-hint"
                />
              </div>
              <p id="calc-cost-hint" className="mt-1.5 text-xs text-muted/70">
                Between $0 and $150 per hour.
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="animate-on-scroll flex flex-col gap-4" style={{ transitionDelay: '70ms' }}>
            <ResultCard
              icon={PiggyBank}
              label="Annual value of repetitive work"
              value={usd.format(Math.round(annualCost))}
              highlighted
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                icon={Wallet}
                label="Monthly time-cost equivalent"
                value={usd.format(Math.round(monthlyCost))}
              />
              <ResultCard
                icon={Clock}
                label="Weekly hours spent"
                value={`${formatNumber(weeklyHours)} hours`}
              />
            </div>
            <ResultCard
              icon={CalendarDays}
              label="Annual hours spent"
              value={`${formatNumber(annualHours)} hours`}
            />

            <p className="text-xs leading-relaxed text-muted/80">
              These are illustrative calculations of what repetitive time is worth — they are not
              projected automation savings and do not account for implementation costs or how the
              recovered time would be used.
            </p>

            <div className="mt-auto">
              <button onClick={() => scrollToSection('contact')} className="btn-primary w-full sm:w-auto sm:px-10">
                FIND OUT WHAT YOU CAN AUTOMATE
                <ArrowRight size={17} />
              </button>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                We&apos;ll help identify which processes can be automated and where your business
                could save time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
