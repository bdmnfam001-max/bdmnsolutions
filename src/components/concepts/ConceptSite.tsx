import type { ComponentType } from 'react';
import type { ConceptSiteProps } from '@/components/concepts/types';
import { AutoDetailingSite } from '@/components/concepts/AutoDetailingSite';
import { HvacSite } from '@/components/concepts/HvacSite';
import { LandscapingSite } from '@/components/concepts/LandscapingSite';
import { PlumbingSite } from '@/components/concepts/PlumbingSite';

const siteByProjectId: Record<string, ComponentType<ConceptSiteProps>> = {
  'auto-detailing': AutoDetailingSite,
  'hvac-services': HvacSite,
  landscaping: LandscapingSite,
  plumbing: PlumbingSite,
};

export function ConceptSite(props: ConceptSiteProps) {
  const Site = siteByProjectId[props.project.id];
  return Site ? <Site {...props} /> : null;
}
