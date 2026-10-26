import React, { useEffect, useState } from 'react';
import { GitHubRepo } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getGitHubRepos } from '../services/githubService';

export const PortfolioSection: React.FC = () => {
  const { t } = useLanguage();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getGitHubRepos()
      .then((data: GitHubRepo[]) => {
        // Filtra os repositórios: não devem começar com "-" e não pode ser "thazsobral.github.io"
        const filtered = data.filter(
          (repo) => repo.name !== 'thazsobral.github.io' && repo.name[0] !== '-'
        );
        setRepos(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching repos:', err);
        setError(t.portfolio.error);
        setLoading(false);
      });
  }, [t.portfolio.error]);

  return (
    <section id="portfolio-github">
      <h2>{t.portfolio.title}</h2>
      <ul id="projects-list">
        {loading && <li className="loading-state">{t.portfolio.loading}</li>}
        {error && <li className="card"><p>{error}</p></li>}
        {!loading && !error && repos.length === 0 && (
          <li className="loading-state">{t.portfolio.empty}</li>
        )}
        {!loading &&
          repos.map((repo, index) => (
            <li key={repo.id} className="card">
              <h2>
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {index + 1} - {repo.name}
                </a>
              </h2>

              {repo.description && (
                <p className="negative" style={{ margin: '0.75rem 0' }}>
                  {repo.description}
                </p>
              )}

              <div className="tags-container">
                {repo.language && (
                  <span 
                    className="tag tag-language" 
                    title={t.portfolio.langTagTitle}
                  >
                    {repo.language}
                  </span>
                )}
                {repo.topics &&
                  repo.topics.map((topic) => (
                    <span 
                      key={topic} 
                      className="tag tag-topic" 
                      title={t.portfolio.topicTagTitle}
                    >
                      #{topic}
                    </span>
                  ))}
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};
