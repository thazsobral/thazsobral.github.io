import React, { useEffect, useState } from 'react';
import { GitHubOrg } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getGitHubOrgs } from '../services/githubService';

export const OrganizationsSection: React.FC = () => {
  const { t } = useLanguage();
  const [orgs, setOrgs] = useState<GitHubOrg[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getGitHubOrgs()
      .then((data: GitHubOrg[]) => {
        setOrgs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching organizations:', err);
        setError(t.organizations.error);
        setLoading(false);
      });
  }, [t.organizations.error]);

  return (
    <section id="orgs-github">
      <h2>{t.organizations.title}</h2>
      <ul id="orgs-list">
        {loading && <li className="loading-state">{t.organizations.loading}</li>}
        {error && <li className="card"><p>{error}</p></li>}
        {!loading && !error && orgs.length === 0 && (
          <li className="loading-state">{t.organizations.empty}</li>
        )}
        {!loading &&
          orgs.map((org, index) => (
            <li key={org.id} className="card">
              <div className="org-card-content">
                <img 
                  src={org.avatar_url} 
                  alt={`${t.organizations.iconAlt} ${org.login}`} 
                  className="org-avatar"
                  loading="lazy"
                />
                <div className="org-info">
                  <h2>
                    <a 
                      href={`https://github.com/${org.login}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {index + 1} - {org.login}
                    </a>
                  </h2>
                  {org.description && (
                    <p className="negative" style={{ margin: '0.75rem 0 0 0' }}>
                      {org.description}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};
