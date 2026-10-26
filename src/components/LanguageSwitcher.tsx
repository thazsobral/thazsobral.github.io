import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="select-container language-switcher-container">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="app-select"
        aria-label="Selecionar idioma / Select language"
        title="Idioma / Language"
      >
        <option value="pt">🇧🇷 Português</option>
        <option value="en">🇺🇸 English</option>
      </select>
    </div>
  );
};
