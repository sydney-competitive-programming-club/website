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

  const headerShellClass = `pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-transform duration-300 ${
    isScrolled ? 'translate-y-0' : 'translate-y-1'
  }`;

  const pillClass = `pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border px-5 py-3 transition-all duration-300 ${
    isScrolled ? 'border-white/12 bg-slate-950/85 backdrop-blur-xl shadow-xl shadow-black/15' : 'border-transparent bg-transparent'
  }`;

  return (
    <header className={headerShellClass}>
      <div className={pillClass}>
        <nav className="hidden items-center gap-2 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={buttonClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

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

      <div
        className={`md:hidden ${
          isMobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        } transition-opacity duration-200 ease-out`}
      >
        <div className="space-y-2 border-t border-white/10 bg-slate-950/95 px-6 pb-6 pt-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={mobileButtonClass}
              onClick={() => setIsMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href="https://discord.gg/uhZbmVcpS7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-semibold text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white"
          >
            <FaDiscord className="h-4 w-4" />
            Join Discord
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
