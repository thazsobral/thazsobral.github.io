import React, { useEffect, useState } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { getGitHubUser } from '../services/githubService';

interface HeaderProps {
  isPostView?: boolean;
  onGoHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isPostView = false, onGoHome }) => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getGitHubUser()
      .then((data) => {
        if (data.bio) {
          setStatus(data.bio);
        }
      })
      .catch((err) => {
        console.error('Error fetching status:', err);
      });
  }, []);

  const toggleMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    if (nextState) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  const handleNavClick = (sectionId: string) => {
    closeMenu();
    if (isPostView && onGoHome) {
      onGoHome();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="top-menu">
      {!isPostView && (
        <div id="header-image">
          <img 
            src="/assets/images/study-development.svg" 
            alt="Ilustração de estudo e desenvolvimento" 
          />
        </div>
      )}

      <div id="perfil">
        <h1 id="name">
          {isPostView ? (
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (onGoHome) onGoHome();
              }}
              style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <span style={{ fontSize: '1.5rem' }}>←</span> {t.nav.back}
            </a>
          ) : (
            'Thalles Sobral'
          )}
        </h1>
        {!isPostView && (
          <span id="status-text" aria-live="polite">
            {status}
          </span>
        )}
      </div>

      {!isPostView && (
        <button 
          id="menu-toggle" 
          aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
          onClick={toggleMenu}
        >
          <span className="hamburger"></span>
        </button>
      )}

      {!isPostView && (
        <nav id="nav-container">
          <ul id="nav-list">
            <li>
              <a href="#bio-resume" onClick={(e) => { e.preventDefault(); handleNavClick('bio-resume'); }}>
                {t.nav.bio}
              </a>
            </li>
            <li>
              <a href="#tips-github" onClick={(e) => { e.preventDefault(); handleNavClick('tips-github'); }}>
                {t.nav.tips}
              </a>
            </li>
            <li>
              <a href="#portfolio-github" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio-github'); }}>
                {t.nav.portfolio}
              </a>
            </li>
            <li>
              <a href="#orgs-github" onClick={(e) => { e.preventDefault(); handleNavClick('orgs-github'); }}>
                {t.nav.organizations}
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>
                {t.nav.github}
              </a>
            </li>
          </ul>
        </nav>
      )}

      <div className="header-actions">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
};
