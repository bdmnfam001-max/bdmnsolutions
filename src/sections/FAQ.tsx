import { useState } from 'react';
import { Plus } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { faqItems } from '@/data/content';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-content">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Answers to common questions about working with the studio."
        />

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="animate-on-scroll card overflow-hidden"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-white sm:text-base">
                    {item.question}
                  </span>
                  <span
                    className={`flex-none rounded-full border border-white/10 p-1 text-muted transition-transform duration-300 ${
                      isOpen ? 'rotate-45 border-accent/40 text-accent' : ''
                    }`}
                  >
                    <Plus size={16} />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-muted">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
