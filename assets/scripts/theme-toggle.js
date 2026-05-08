/**
 * Lógica de troca de tema: Light, Dark e System
 */
const themeToggle = {
    init() {
        const savedTheme = localStorage.getItem('theme') || 'system';
        this.applyTheme(savedTheme);
    },

    applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            // Remove o atributo para seguir a media query do sistema no CSS
            document.documentElement.removeAttribute('data-theme');
        }
    },

    setTheme(theme) {
        localStorage.setItem('theme', theme);
        this.applyTheme(theme);
    }
};

// Inicializa ao carregar
themeToggle.init();

// Disponibiliza globalmente
window.themeToggle = themeToggle;
