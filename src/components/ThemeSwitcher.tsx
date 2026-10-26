import React, { useEffect, useState } from 'react';
import { Theme } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const ThemeSwitcher: React.FC = () => {
  const { t } = useLanguage();
  const [currentTheme, setCurrentTheme] = useState<Theme>('system');

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'system';
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (theme: Theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const handleSetTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme);
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  return (
    <div className="select-container theme-switcher-container">
      <select
        value={currentTheme}
        onChange={(e) => handleSetTheme(e.target.value as Theme)}
        className="app-select"
        aria-label="Selecionar tema / Select theme"
        title="Tema / Theme"
      >
        <option value="light">{t.theme.light}</option>
        <option value="dark">{t.theme.dark}</option>
        <option value="system">{t.theme.system}</option>
      </select>
    </div>
  );
};
