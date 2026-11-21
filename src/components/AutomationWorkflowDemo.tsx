import { useEffect, useRef, useState, type ReactNode } from 'react';
import { BellRing, Check, Cpu, Database, FileText, Play, RotateCcw, X } from 'lucide-react';
import { createPortal } from 'react-dom';

type WorkflowStatus = 'waiting' | 'processing' | 'complete';

type WorkflowStep = {
  label: string;
  detail: string;
  icon: typeof FileText;
};

const workflowSteps: WorkflowStep[] = [
  { label: 'New customer inquiry', detail: 'Incoming', icon: FileText },
  { label: 'Automatic processing', detail: 'Captured and sorted', icon: Cpu },
  { label: 'CRM updated', detail: 'Lead organized', icon: Database },
  { label: 'Team notified', detail: 'Alert sent instantly', icon: BellRing },
  { label: 'Follow-up ready', detail: 'Next step prepared', icon: Check },
];

function WorkflowModal({ onClose }: { onClose: () => void }) {
  const [running, setRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [completed, setCompleted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startWorkflow = () => {
    clearTimer();
    setRunning(true);
    setCompleted(false);
    setActiveStep(0);
    timerRef.current = setInterval(() => {
      setActiveStep((current) => {
        if (current >= workflowSteps.length - 1) {
          clearTimer();
          setRunning(false);
          setCompleted(true);
          return current;
        }
        return current + 1;
      });
    }, 850);
  };

  useEffect(() => {
    closeButtonRef.current?.focus();
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;

    const focusableElements = () => Array.from(
      dialog?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    ).filter((element) => element.getClientRects().length > 0);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusableElements();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog?.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog?.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimer();
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="workflow-demo-title"
      ref={dialogRef}
      tabIndex={-1}
    >
      <div className="workflow-demo-modal relative w-full max-w-3xl rounded-2xl border border-white/10 bg-ink-800 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-7">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Interactive workflow demo</p>
            <h2 id="workflow-demo-title" className="mt-2 font-display text-3xl font-extrabold uppercase leading-none text-white sm:text-4xl">
              From inquiry to follow-up.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Less manual data entry. Faster follow-ups. More time for your business.
            </p>
          </div>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close workflow demo" className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted transition-colors hover:border-white/20 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 sm:p-7">
          <ol className="workflow-demo__steps">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              const status: WorkflowStatus = completed || index < activeStep ? 'complete' : index === activeStep ? 'processing' : 'waiting';
              return (
                <li key={step.label} className={`workflow-demo__step workflow-demo__step--${status}`}>
                  <span className="workflow-demo__connector" aria-hidden="true" />
                  <span className="workflow-demo__node"><Icon size={18} /></span>
                  <span className="workflow-demo__copy">
                    <strong>{step.label}</strong>
                    <span>{status === 'processing' ? 'Processing now' : status === 'complete' ? 'Complete' : step.detail}</span>
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="mt-7 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center">
            <p className="text-xs text-muted/80">Illustrative simulation — no real systems or messages are connected.</p>
            <button type="button" onClick={startWorkflow} className="btn-primary min-w-32">
              {running ? <><span className="workflow-demo__spinner" /> Running</> : completed ? <><RotateCcw size={15} /> Replay</> : <><Play size={15} /> Start</>}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function WorkflowDemoTrigger({ children, className = '' }: { children?: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children ?? 'SEE IT IN ACTION'}
      </button>
      {open && <WorkflowModal onClose={close} />}
    </>
  );
}
