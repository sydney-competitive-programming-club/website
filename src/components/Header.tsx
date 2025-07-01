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
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (hideLogoWhenHeroVisible) {
      const heroLogo = document.querySelector('.hero-logo');
      if (heroLogo) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setIsHeroLogoVisible(entry.isIntersecting);
          },
          {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
          }
        );

        observer.observe(heroLogo);
        return () => observer.disconnect();
      }
    }
  }, [hideLogoWhenHeroVisible]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getNavButtonClass = (path: string) => {
    return location.pathname === path ? 'nav-button active' : 'nav-button';
  };

  const shouldShowLogo = !hideLogoWhenHeroVisible || !isHeroLogoVisible;

  return (
    <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        <div className={`logo ${shouldShowLogo ? 'logo-visible' : 'logo-hidden'}`}>
          <Link to="/">
            <img src="/logo_full_white_4x.png" alt="SCPC Logo" />
          </Link>
        </div>
        <div className="nav-links desktop-nav">
          <Link to="/" className={getNavButtonClass('/')}>Home</Link>
          <Link to="/about" className={getNavButtonClass('/about')}>About</Link>
          <Link to="/events" className={getNavButtonClass('/events')}>Events</Link>
          <button className="nav-button">Challenges</button>
          <button className="nav-button primary">
            Sign In
          </button>
        </div>
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
      <div className={`mobile-nav ${isMobileMenuOpen ? 'mobile-nav-open' : ''}`}>
        <Link to="/" className={`${getNavButtonClass('/')} mobile`}>Home</Link>
        <Link to="/about" className={`${getNavButtonClass('/about')} mobile`}>About</Link>
        <Link to="/events" className={`${getNavButtonClass('/events')} mobile`}>Events</Link>
        <button className="nav-button mobile">Challenges</button>
        <button className="nav-button primary mobile">
          Sign In
        </button>
      </div>
    </nav>
  );
}

export default Header;