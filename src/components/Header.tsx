import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  hideLogoWhenHeroVisible?: boolean;
}

function Header({ hideLogoWhenHeroVisible = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeroLogoVisible, setIsHeroLogoVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!hideLogoWhenHeroVisible) return;

    const heroLogo = document.querySelector('.hero-logo');
    if (!heroLogo) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroLogoVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(heroLogo);
    return () => observer.disconnect();
  }, [hideLogoWhenHeroVisible]);

  const shouldShowLogo = !hideLogoWhenHeroVisible || !isHeroLogoVisible;

  const baseNavClass = `fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color,box-shadow] duration-300 sm:duration-500 ${
    isScrolled ? 'border-white/10 bg-slate-950/85 backdrop-blur-xl shadow-lg shadow-black/20' : 'bg-transparent'
  }`;

  const getLinkClasses = (path: string) => {
    const isActive = location.pathname === path;
    return `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'
    }`;
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={baseNavClass}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className={`flex items-center transition-opacity ${shouldShowLogo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <Link to="/">
            <img src="/logo_full_white_4x.png" alt="SCPC Logo" className={`w-auto transition ${isScrolled ? 'h-8' : 'h-9'}`} />
          </Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/" className={getLinkClasses('/')}>Home</Link>
          <Link to="/about" className={getLinkClasses('/about')}>About</Link>
          <Link to="/gym" className={getLinkClasses('/gym')}>Gym</Link>
        </div>

        <button
          type="button"
          onClick={toggleMobileMenu}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
          aria-label="Toggle menu"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute inset-x-0 top-0 h-0.5 bg-white transition ${
                isMobileMenuOpen ? 'translate-y-1.5 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute inset-x-0 top-1.5 h-0.5 bg-white transition ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-0.5 bg-white transition ${
                isMobileMenuOpen ? '-translate-y-1.5 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        } transition-opacity duration-150`}
      >
        <div className="space-y-1 border-t border-white/5 bg-slate-950/95 px-6 pb-6 pt-4">
          <Link to="/" className={getLinkClasses('/')} onClick={closeMobileMenu}>Home</Link>
          <Link to="/about" className={getLinkClasses('/about')} onClick={closeMobileMenu}>About</Link>
          <Link to="/gym" className={getLinkClasses('/gym')} onClick={closeMobileMenu}>Gym</Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
