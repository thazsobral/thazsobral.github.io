import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import { GitHubGist, GitHubGistFile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getGitHubGistDetail, cachedFetch } from '../services/githubService';

interface PostViewProps {
  gistId: string;
  onBack: () => void;
}

export const PostView: React.FC<PostViewProps> = ({ gistId, onBack }) => {
  const { t } = useLanguage();
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getGitHubGistDetail(gistId)
      .then(async (data: GitHubGist) => {
        const files = Object.values(data.files) as GitHubGistFile[];
        if (!files || files.length === 0) {
          throw new Error('Nenhum arquivo encontrado no gist');
        }

        const mdFile = files.find((f) => f.language === 'Markdown') || files[0];
        document.title = `${mdFile.filename} | Thalles Sobral`;

        let rawContent = mdFile.content;
        if (!rawContent && mdFile.raw_url) {
          rawContent = await cachedFetch<string>(mdFile.raw_url, { isText: true, ttl: 60 * 60 * 1000 });
        }

        const parsedHtml = await marked.parse(rawContent || '');
        setHtmlContent(parsedHtml);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading gist:', err);
        setError(t.post.errorDesc);
        setLoading(false);
      });

    return () => {
      document.title = t.meta.title;
    };
  }, [gistId, t.meta.title, t.post.errorDesc]);

  return (
    <article id="gist-content" className="card post-content">
      {loading && <div id="loading">{t.post.loading}</div>}
      {error && (
        <div>
          <h2>{t.post.errorTitle}</h2>
          <p>{error}</p>
          <p style={{ marginTop: '1rem' }}>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
            >
              {t.post.backHome}
            </a>
          </p>
        </div>
      )}
      {!loading && !error && (
        <div 
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
      )}
    </article>
  );
};
