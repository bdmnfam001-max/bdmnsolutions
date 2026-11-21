import { SectionHeading } from '@/components/SectionHeading';
import { whyChooseUs } from '@/data/content';

export function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-content">
        <SectionHeading
          eyebrow="Why Choose Us"
          index="06"
          title="Built Around the Way Your Business Works."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="animate-on-scroll card card-hover group p-6"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
