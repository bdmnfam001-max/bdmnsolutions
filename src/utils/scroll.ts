/** Smoothly scroll to a section id, accounting for the sticky header. */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const headerHeight = 72;
  const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
  window.scrollTo({ top, behavior: 'smooth' });
}
