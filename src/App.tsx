import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { BioSection } from './components/BioSection';
import { TipsSection } from './components/TipsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { OrganizationsSection } from './components/OrganizationsSection';
import { PostView } from './components/PostView';
import { Footer } from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

const AppContent: React.FC = () => {
  const [activeGistId, setActiveGistId] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) return id;

    // Também verifica hash
    const hash = window.location.hash;
    if (hash.startsWith('#post?id=')) {
      return hash.replace('#post?id=', '');
    }
    return null;
  });

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      if (id) {
        setActiveGistId(id);
      } else if (window.location.hash.startsWith('#post?id=')) {
        setActiveGistId(window.location.hash.replace('#post?id=', ''));
      } else {
        setActiveGistId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  useEffect(() => {
    if (activeGistId) {
      document.body.classList.add('post-page');
    } else {
      document.body.classList.remove('post-page');
    }
  }, [activeGistId]);

  const handleSelectGist = (gistId: string) => {
    setActiveGistId(gistId);
    const newUrl = `${window.location.pathname}?id=${gistId}`;
    window.history.pushState({ gistId }, '', newUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setActiveGistId(null);
    window.history.pushState({}, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header 
        isPostView={!!activeGistId} 
        onGoHome={handleBackToHome} 
      />

      <main>
        {activeGistId ? (
          <PostView 
            gistId={activeGistId} 
            onBack={handleBackToHome} 
          />
        ) : (
          <article>
            <BioSection />
            <hr />
            <TipsSection onSelectGist={handleSelectGist} />
            <hr />
            <PortfolioSection />
            <hr />
            <OrganizationsSection />
          </article>
        )}
      </main>

      <Footer isPostView={!!activeGistId} />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
