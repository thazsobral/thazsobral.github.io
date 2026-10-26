import React, { useEffect, useState } from 'react';
import { GitHubUser } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getGitHubUser } from '../services/githubService';

export const GitHubCard: React.FC = () => {
  const { t } = useLanguage();
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGitHubUser()
      .then((data: GitHubUser) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching GitHub user:', err);
        // Fallback default info
        setUser({
          login: 'thazsobral',
          name: 'Thalles Sobral',
          bio: 'Fullstack Developer',
          avatar_url: 'https://avatars.githubusercontent.com/u/30708148?v=4',
          html_url: 'https://github.com/thazsobral',
          public_repos: 24,
          followers: 15,
          following: 20,
        });
        setLoading(false);
      });
  }, []);

  if (loading && !user) {
    return (
      <div className="gh-card" style={{ minHeight: '150px', justifyContent: 'center', alignItems: 'center' }}>
        <span>{t.footer.loadingUser}</span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="gh-card">
      <div className="gh-card-header">
        <img 
          src={user.avatar_url} 
          alt={`Avatar de ${user.name || user.login}`} 
          className="gh-card-avatar"
        />
        <div className="gh-card-info">
          <h3>{user.name || user.login}</h3>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            @{user.login}
          </a>
        </div>
      </div>

      <div className="gh-card-stats">
        <div>
          <strong>{user.public_repos}</strong>
          <span>{t.footer.repos}</span>
        </div>
        <div>
          <strong>{user.followers}</strong>
          <span>{t.footer.followers}</span>
        </div>
        <div>
          <strong>{user.following}</strong>
          <span>{t.footer.following}</span>
        </div>
      </div>
    </div>
  );
};
