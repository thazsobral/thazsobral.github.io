import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getGitHubBioText } from '../services/githubService';

export const BioSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [bioText, setBioText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    getGitHubBioText(t.bio.readmeUrl)
      .then((data) => {
        const stringPoint = '&#8203;';
        const lengthStringPoint = stringPoint.length;
        const positions: number[] = [];
        let index = data.indexOf(stringPoint);

        while (index !== -1) {
          positions.push(index);
          index = data.indexOf(stringPoint, index + 1);
        }

        if (positions.length > 1) {
          const parsed = data.slice(positions[0] + lengthStringPoint, positions[1]).trim();
          setBioText(parsed);
        } else {
          setBioText(t.bio.fallback);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching bio:', err);
        setBioText(t.bio.fallback);
        setLoading(false);
      });
  }, [language, t.bio.readmeUrl, t.bio.fallback]);

  return (
    <section id="bio-resume" className="negative">
      <h2>{t.bio.title}</h2>
      {loading && !bioText ? (
        <p>{t.bio.loading}</p>
      ) : (
        <p>{bioText}</p>
      )}
    </section>
  );
};
