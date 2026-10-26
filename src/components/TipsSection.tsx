import React, { useEffect, useState } from 'react';
import { GitHubGist } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getGitHubGists } from '../services/githubService';

interface TipsSectionProps {
  onSelectGist: (gistId: string) => void;
}

export const TipsSection: React.FC<TipsSectionProps> = ({ onSelectGist }) => {
  const { t } = useLanguage();
  const [gists, setGists] = useState<GitHubGist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getGitHubGists()
      .then((data: GitHubGist[]) => {
        setGists(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching gists:', err);
        setError(t.tips.error);
        setLoading(false);
      });
  }, [t.tips.error]);

  const convertDate = (dateStr: string) => {
    const dateOnly = dateStr.substring(0, 10).split('-');
    if (dateOnly[0].length === 4) {
      return dateOnly.reverse().join('/');
    }
    return dateOnly.join('/');
  };

  return (
    <section id="tips-github">
      <h2>{t.tips.title}</h2>
      <ul id="tips-list">
        {loading && <li className="loading-state">{t.tips.loading}</li>}
        {error && <li className="card"><p>{error}</p></li>}
        {!loading && !error && gists.length === 0 && (
          <li className="loading-state">{t.tips.empty}</li>
        )}
        {!loading &&
          gists.map((gist, index) => {
            const createdDate = convertDate(gist.created_at);
            const title = `${index + 1} - ${gist.description || t.tips.noDescription} - (${createdDate})`;
            return (
              <li key={gist.id} className="card">
                <h2>
                  <a 
                    href={`#post?id=${gist.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectGist(gist.id);
                    }}
                  >
                    {title}
                  </a>
                </h2>
              </li>
            );
          })}
      </ul>
    </section>
  );
};
