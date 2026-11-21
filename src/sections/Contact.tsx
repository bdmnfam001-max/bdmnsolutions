import { useRef, useState, type FormEvent } from 'react';
import { Mail, Camera, Link2, Send, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Loader as Loader2 } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { useTurnstile } from '@/hooks/useTurnstile';

const EMAIL = 'dennisbedmansky@gmail.com';
const INSTAGRAM_URL = 'https://www.instagram.com/bedmanskystudio/';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61596476974102';
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() ?? '';

type Status = 'idle' | 'loading' | 'success' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'websiteType' | 'details', string>>;

const SUCCESS_MESSAGE = 'Your inquiry has been sent. We will get back to you shortly.';

const websiteTypes = [
  'Website Design',
  'Business Automation',
  'Website + Automation',
  'Other',
];

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState('');
  const submissionLock = useRef(false);
  const { containerRef, execute, reset } = useTurnstile();

  const validate = (formData: FormData): Errors => {
    const e: Errors = {};
    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const websiteType = (formData.get('websiteType') as string)?.trim();
    const details = (formData.get('details') as string)?.trim();

    if (!name) e.name = 'Please enter your name.';
    if (!email) e.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = 'Please enter a valid email address.';
    if (!websiteType) e.websiteType = 'Please select a website type.';
    if (!details) e.details = 'Please tell us a little about your project.';
    return e;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submissionLock.current) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const found = validate(formData);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus('error');
      setMessage('Please review the highlighted fields.');
      requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }

    if (!TURNSTILE_SITE_KEY) {
      setStatus('error');
      setMessage('Secure form submissions are not configured yet. Please email us directly.');
      return;
    }

    submissionLock.current = true;
    setStatus('loading');
    setMessage('');

    try {
      const turnstileToken = await execute(TURNSTILE_SITE_KEY);
      const payload = Object.fromEntries(formData.entries());
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, turnstileToken }),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; error?: string }
        | null;

      if (!response.ok || !result?.ok) {
        setStatus('error');
        setMessage(result?.error ?? 'Your inquiry could not be sent. Please email us directly.');
        return;
      }

      setErrors({});
      setStatus('success');
      setMessage(result.message ?? SUCCESS_MESSAGE);
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error && error.message.startsWith('The security check')
          ? error.message
          : 'The secure contact service is unavailable. Please try again or email us directly.',
      );
    } finally {
      submissionLock.current = false;
      reset();
    }
  };

  return (
    <section id="contact" className="editorial-section editorial-section--contact scroll-mt-20 py-24 sm:py-32">
      <div className="container-content relative z-[1]">
        <SectionHeading
          eyebrow="Contact"
          index="09"
          align="left"
          title="Let's Build Something Great Together."
          description="Tell us a little about your business and what you need — a website, an automation, or both. Let's explore how we can help you move forward."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <div className="card p-6 sm:p-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-xl font-bold text-white">Inquiry Sent</h3>
                <p role="status" aria-live="polite" aria-atomic="true" className="mt-2 max-w-sm text-sm text-muted">{message}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-secondary mt-6"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot */}
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />
                <div ref={containerRef} aria-live="polite" />
                <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                  {status === 'loading' ? 'Sending your inquiry.' : ''}
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" error={errors.name} errorId="name-error" required>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      maxLength={100}
                      required
                      className="input-field"
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                  </Field>
                  <Field label="Business Name" hint="optional">
                    <input
                      type="text"
                      name="businessName"
                      autoComplete="organization"
                      className="input-field"
                      placeholder="Your business"
                    />
                  </Field>
                </div>

                <Field label="Email Address" error={errors.email} errorId="email-error" required>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    className="input-field"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </Field>

                <Field label="Project Type" error={errors.websiteType} errorId="website-type-error" required>
                  <select
                    id="website-type"
                    name="websiteType"
                    className="input-field appearance-none bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-10"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23A7ADB8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                    }}
                    defaultValue=""
                    required
                    aria-invalid={!!errors.websiteType}
                    aria-describedby={errors.websiteType ? 'website-type-error' : undefined}
                  >
                    <option value="" disabled>
                      Select a project type…
                    </option>
                    {websiteTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Processes You Want to Automate" hint="optional">
                  <textarea
                    name="processesToAutomate"
                    rows={3}
                    maxLength={2000}
                    className="input-field resize-y"
                    placeholder="Describe the repetitive tasks or workflows you'd like to automate…"
                  />
                </Field>

                <Field label="Project Details" error={errors.details} errorId="details-error" required>
                  <textarea
                    id="project-details"
                    name="details"
                    rows={4}
                    maxLength={4000}
                    required
                    className="input-field resize-y"
                    placeholder="Tell us about your business and what you need…"
                    aria-invalid={!!errors.details}
                    aria-describedby={errors.details ? 'details-error' : undefined}
                  />
                </Field>

                {status === 'error' && (
                  <div role="alert" aria-live="assertive" className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    <AlertCircle size={16} className="mt-0.5 flex-none" aria-hidden="true" />
                    <span>
                      {message}{' '}
                      <a href={`mailto:${EMAIL}`} className="underline underline-offset-2 hover:text-white">
                        Email us directly
                      </a>
                      .
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={17} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Project Inquiry
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-muted/70">
                  Your information will only be used to respond to your inquiry.
                </p>
              </form>
            )}
          </div>

          {/* Direct contact */}
          <div className="flex flex-col gap-6">
            <div aria-labelledby="next-steps-heading" className="border-l border-accent/50 pl-5">
              <h3 id="next-steps-heading" className="font-display text-2xl font-extrabold uppercase leading-none text-white">
                What Happens Next?
              </h3>
              <ol className="mt-5 space-y-4">
                <li className="flex gap-3">
                  <span className="font-display text-sm font-extrabold text-accent">01</span>
                  <p className="text-sm leading-relaxed text-muted">Tell us about your business and goals.</p>
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-sm font-extrabold text-accent">02</span>
                  <p className="text-sm leading-relaxed text-muted">We review your project details and prepare one complimentary static visual preview of your homepage&apos;s first screen.</p>
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-sm font-extrabold text-accent">03</span>
                  <p className="text-sm leading-relaxed text-muted">We present the concept and discuss your actual requirements, features, project scope, timeline, and price.</p>
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-sm font-extrabold text-accent">04</span>
                  <p className="text-sm leading-relaxed text-muted">Once the proposal and terms are approved and the initial deposit is received, full design, revisions, and development begin.</p>
                </li>
              </ol>
              <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-muted/80">
                The complimentary preview is a visual demonstration, not a completed or coded website. Full design work, revisions, and development are part of the agreed paid project.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-base font-bold text-white">Direct Contact</h3>
              <p className="mt-1.5 text-sm text-muted">
                Prefer to reach out directly? Use any of the options below.
              </p>
              <div className="mt-5 space-y-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition-colors hover:border-accent/40 hover:bg-white/10"
                >
                  <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <Mail size={16} />
                  </span>
                  <span className="min-w-0 truncate text-white">{EMAIL}</span>
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition-colors hover:border-accent/40 hover:bg-white/10"
                >
                  <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <Camera size={16} />
                  </span>
                  <span className="text-white">Instagram</span>
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition-colors hover:border-accent/40 hover:bg-white/10"
                >
                  <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <Link2 size={16} />
                  </span>
                  <span className="text-white">Facebook</span>
                </a>
              </div>
            </div>

            <div className="card relative overflow-hidden p-6">
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/15 blur-2xl" aria-hidden />
              <p className="relative text-sm leading-relaxed text-muted">
                Working with businesses worldwide. Remote collaboration, clear communication, and a
                website delivered around your goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  errorId,
  hint,
  required,
  children,
}: {
  label: string;
  error?: string;
  errorId?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block">
        <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted">
          {label}
          {required && <span className="text-accent">*</span>}
          {hint && <span className="text-muted/50">({hint})</span>}
        </span>
        {children}
      </label>
      {error && (
        <span id={errorId} role="alert" className="mt-1.5 block text-xs text-red-400">
          {error}
        </span>
      )}
    </div>
  );
}
