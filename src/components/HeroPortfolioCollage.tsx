import { useEffect, useState } from 'react';
import { ConceptSite } from '@/components/concepts/ConceptSite';
import { projects } from '@/data/projects';

const collagePanels = [
  { id: 'auto-detailing', isMobile: false },
  { id: 'hvac-services', isMobile: false },
  { id: 'landscaping', isMobile: false },
  { id: 'plumbing', isMobile: false },
] as const;

export function HeroPortfolioCollage() {
  const [isCompact, setIsCompact] = useState(() => window.matchMedia('(max-width: 1023px)').matches);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1023px)');
    const updateViewport = (event: MediaQueryListEvent) => setIsCompact(event.matches);
    media.addEventListener('change', updateViewport);
    return () => media.removeEventListener('change', updateViewport);
  }, []);

  return (
    <div
      className="hero-collage"
      role="img"
      aria-label="Selected concept website previews from the studio portfolio"
    >
      <div className="hero-collage__light" aria-hidden="true" />
      {collagePanels.map((panel, index) => {
        const project = projects.find((item) => item.id === panel.id);
        if (!project) return null;
        const collageProject = { ...project, previewImage: project.heroImage };

        return (
          <div
            key={panel.id}
            className={`hero-collage__entry hero-collage__entry--${panel.id}`}
            style={{ animationDelay: `${index * 140}ms` }}
          >
            <div className={`hero-collage__frame hero-collage__frame--${panel.id}`}>
              <div className="hero-collage__site">
                <ConceptSite project={collageProject} isMobile={isCompact || panel.isMobile} />
              </div>
            </div>
          </div>
        );
      })}
      <span className="hero-collage__caption" aria-hidden="true">
        Concept Studies / 01—04
      </span>
    </div>
  );
}
