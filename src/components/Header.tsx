import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { navItems } from '@/data/content';
import { scrollToSection } from '@/utils/scroll';
import { useScrolledPast, useScrollSpy } from '@/hooks/useScroll';

const sectionIds = navItems.map((n) => n.href.replace('#', ''));

export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolledPast(20);
  const active = useScrollSpy(sectionIds);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close mobile menu on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    // allow menu close before scroll
    requestAnimationFrame(() => scrollToSection(href.replace('#', '')));
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-ink-900/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-content flex h-[68px] items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNav('#home');
          }}
          className="rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          aria-label="Bedmansky Digital Solutions Studio — home"
        >
          <Logo />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.href);
                }}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  isActive ? 'text-white' : 'text-muted hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute inset-x-3.5 -bottom-px h-px bg-accent" aria-hidden />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNav('#contact')}
            className="btn-primary hidden xl:inline-flex"
          >
            DISCUSS YOUR PROJECT
          </button>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-white/10 bg-ink-900/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container-content flex flex-col gap-1 py-4">
          {navItems.map((item) => {
            const isActive = active === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.href);
                }}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  isActive ? 'bg-white/5 text-white' : 'text-muted hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <button
            onClick={() => handleNav('#contact')}
            className="btn-primary mt-3 w-full"
          >
            DISCUSS YOUR PROJECT
          </button>
        </nav>
      </div>
    </header>
  );
}
