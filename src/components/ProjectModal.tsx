import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { Project } from '@/data/projects';
import { ConceptSite } from '@/components/concepts/ConceptSite';
import { DeviceToggle } from '@/sections/Hero';

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDevice('desktop');
  }, [project]);

  useEffect(() => {
    if (!project) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    const focusableElements = () =>
      Array.from(
        dialog?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.getClientRects().length > 0);

    closeButtonRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = focusableElements();
      if (items.length === 0) {
        event.preventDefault();
        dialog?.focus();
        return;
      }

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
    return () => {
      document.removeEventListener('keydown', onKey);
      previouslyFocused?.focus();
    };
  }, [project, onClose]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [project]);

  if (!project) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      ref={dialogRef}
      tabIndex={-1}
    >
      <div
        className="relative my-4 w-full max-w-5xl animate-scale-in rounded-2xl border border-white/10 bg-ink-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 p-5 sm:p-6">
          <div>
            <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
              Concept Project — Demonstration Design
            </span>
            <h3 id="project-modal-title" className="mt-3 text-xl font-bold text-white sm:text-2xl">{project.category}</h3>
            <p className="mt-1 text-sm text-muted">{project.businessType}</p>
          </div>
          <div className="flex items-center gap-3">
            <DeviceToggle device={device} setDevice={setDevice} />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted transition-colors hover:border-white/20 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Preview frame */}
        <div className="bg-ink-900 p-4 sm:p-8">
          <div
            className={`mx-auto overflow-hidden rounded-xl border border-white/15 shadow-2xl transition-all duration-300 ${
              device === 'desktop' ? 'w-full max-w-4xl' : 'w-full max-w-[340px]'
            }`}
          >
            <ConceptSite project={project} isMobile={device === 'mobile'} />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
