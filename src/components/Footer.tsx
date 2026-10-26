import React from 'react';
import { GitHubCard } from './GitHubCard';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  isPostView?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isPostView = false }) => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  if (isPostView) {
    return (
      <footer>
        <div id="reserved-rights">
          <p>© {currentYear} Thalles Sobral. {t.post.footerGists}</p>
        </div>
      </footer>
    );
  }

  return (
    <footer id="contact">
      <div className="footer-content">
        <div className="github-card-container">
          <GitHubCard />
        </div>

        <div className="sponsor-container">
          <iframe 
            src="https://github.com/sponsors/thazsobral/button" 
            title="Sponsor thazsobral" 
            height="32" 
            width="114" 
            style={{ border: 0, borderRadius: '6px' }}
          />
        </div>

        <div id="reserved-rights">
          <p>
            © {currentYear} <span dangerouslySetInnerHTML={{ __html: t.footer.rights }} />
          </p>
        </div>
      </div>
    </footer>
  );
};
