import { Mail, Camera, Link2 } from 'lucide-react';
import { Logo } from './Logo';
import { navItems, services } from '@/data/content';
import { scrollToSection } from '@/utils/scroll';

const INSTAGRAM_URL = 'https://www.instagram.com/bedmanskystudio/';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61596476974102';
const EMAIL = 'dennisbedmansky@gmail.com';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-900">
      <div className="container-content py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Websites and business automations that help you attract customers, reduce manual
              work, and grow faster.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted transition-colors hover:border-white/20 hover:text-white"
              >
                <Camera size={17} />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted transition-colors hover:border-white/20 hover:text-white"
              >
                <Link2 size={17} />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted transition-colors hover:border-white/20 hover:text-white"
                aria-label="Email"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href.replace('#', ''));
                    }}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('services');
                    }}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-sm text-muted transition-colors hover:text-white"
                >
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-white"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-muted">
              &copy; {year} Bedmansky Digital Solutions Studio. All rights reserved.
            </p>
            <p className="text-xs text-muted/70">
              Portfolio concepts are illustrative demonstration projects.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
