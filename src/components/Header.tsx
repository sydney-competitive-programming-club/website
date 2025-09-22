import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaDiscord } from 'react-icons/fa';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Gym', to: '/gym' },
];

const buttonClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
    isActive
      ? 'bg-white/10 text-white'
      : 'text-white/70 hover:bg-white/5 hover:text-white'
  }`;

const mobileButtonClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-semibold transition-colors duration-200 ${
    isActive
      ? 'bg-white/10 text-white'
      : 'text-white/70 hover:bg-white/5 hover:text-white'
  }`;

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileOpen(false);
      }
    };

    if (mediaQuery.matches) {
      setIsMobileOpen(false);
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const originalOverflow = document.body.style.overflow;
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileOpen]);

  const headerShellClass = `pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-transform duration-300 ${
    isScrolled ? 'translate-y-0' : 'translate-y-1'
  }`;

  const pillClass = `flex w-full items-center justify-between gap-4 rounded-full px-5 py-3 transition-all duration-300 ${
    isScrolled
      ? 'md:border md:border-white/12 md:bg-slate-950/85 md:backdrop-blur-xl md:shadow-xl md:shadow-black/15'
      : 'md:border md:border-transparent md:bg-transparent md:shadow-none'
  }`;

  return (
    <>
      <header className={headerShellClass}>
        <div className="relative w-full max-w-5xl pointer-events-auto">
          <div
            className={`${pillClass} ${
              isMobileOpen
                ? 'md:rounded-b-none md:border-white/12 md:bg-slate-950/90 md:backdrop-blur-xl md:shadow-xl md:shadow-black/20'
                : ''
            }`}
          >
            <nav className="hidden items-center gap-2 md:flex">
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.to} to={item.to} className={buttonClass}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex flex-1 items-center justify-end gap-3 md:flex-none">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
                onClick={() => setIsMobileOpen((prev) => !prev)}
                aria-label="Toggle navigation"
              >
                <span className="relative block h-3.5 w-5">
                  <span
                    className={`absolute inset-x-0 top-0 h-0.5 bg-white transition ${
                      isMobileOpen ? 'translate-y-1.5 rotate-45' : ''
                    }`}
                  />
                  <span
                    className={`absolute inset-x-0 top-1.5 h-0.5 bg-white transition ${
                      isMobileOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`absolute inset-x-0 bottom-0 h-0.5 bg-white transition ${
                      isMobileOpen ? '-translate-y-1.5 -rotate-45' : ''
                    }`}
                  />
                </span>
              </button>

              <a
                href="https://discord.gg/uhZbmVcpS7"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white md:flex"
              >
                <FaDiscord className="h-4 w-4" />
                Join Discord
              </a>
            </div>
          </div>

        </div>
      </header>

      {isMobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-between bg-slate-950/95 px-6 pb-10 pt-28 backdrop-blur md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={`${mobileButtonClass} text-lg`}
                onClick={() => setIsMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex flex-col gap-4">
            <a
              href="https://discord.gg/uhZbmVcpS7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-base font-semibold text-white/80 transition-colors duration-200 hover:border-white/30 hover:text-white"
              onClick={() => setIsMobileOpen(false)}
            >
              <FaDiscord className="h-4 w-4" />
              Join Discord
            </a>
            <p className="text-center text-xs uppercase tracking-[0.35em] text-white/40">
              Sydney Competitive Programming Club
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
