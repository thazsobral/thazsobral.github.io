export type Language = 'pt' | 'en';

export const translations = {
  pt: {
    nav: {
      bio: 'Bio',
      tips: 'Dicas',
      portfolio: 'Portfólio',
      organizations: 'Organizações',
      github: 'Github',
      back: 'Voltar',
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
    },
    bio: {
      title: 'Bio',
      loading: 'Carregando biografia...',
      readmeUrl: 'https://raw.githubusercontent.com/thazsobral/thazsobral/refs/heads/main/README-PT.md',
      fallback: `Hey Guys! Meu nome é Thalles 👋

Um profissional de tecnologia curioso e movido pela exploração de novas ideias e desafios. Acredito na criatividade como ferramenta para solucionar problemas complexos e busco aprendizado e aprimoramento contínuos.

💻 Atualmente trabalhando como programador.
🚀 Entusiasmado por desafios que impulsionam o crescimento.
💡 Adoto a mentalidade hacker: curiosidade, aprendizado contínuo e busca por soluções inovadoras.`,
    },
    tips: {
      title: 'Últimas dicas',
      loading: 'Carregando dicas...',
      empty: 'Nenhuma dica encontrada.',
      error: 'Não foi possível carregar as dicas no momento.',
      noDescription: 'Sem descrição',
    },
    portfolio: {
      title: 'Portfólio',
      loading: 'Carregando projetos...',
      empty: 'Nenhum projeto encontrado.',
      error: 'Não foi possível carregar os projetos no momento.',
      langTagTitle: 'linguagem predominante do projeto',
      topicTagTitle: 'tópico relacionado ao projeto',
    },
    organizations: {
      title: 'Organizações',
      loading: 'Carregando organizações...',
      empty: 'Nenhuma organização encontrada.',
      error: 'Não foi possível carregar as organizações no momento.',
      iconAlt: 'Ícone da organização',
    },
    post: {
      loading: 'Carregando conteúdo do Gist...',
      errorTitle: 'Erro ao carregar',
      errorDesc: 'Não foi possível buscar o conteúdo. Verifique sua conexão ou o ID do Gist.',
      backHome: 'Voltar para a home',
      footerGists: 'Conteúdo via GitHub Gists.',
    },
    footer: {
      loadingUser: 'Carregando perfil do GitHub...',
      repos: 'Repositórios',
      followers: 'Seguidores',
      following: 'Seguindo',
      rights: 'Made with 🤍 by ThazSobral.<br>Todos os direitos reservados.',
    },
    theme: {
      light: '☀️ Light',
      dark: '🌙 Dark',
      system: '🖥️ System',
    },
    meta: {
      title: 'Thalles Sobral | Desenvolvedor',
      description: 'Portfólio de Thalles Sobral - Desenvolvedor Fullstack com projetos, dicas e biografia.',
    },
  },
  en: {
    nav: {
      bio: 'Bio',
      tips: 'Tips',
      portfolio: 'Portfolio',
      organizations: 'Organizations',
      github: 'Github',
      back: 'Back',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    bio: {
      title: 'Bio',
      loading: 'Loading biography...',
      readmeUrl: 'https://raw.githubusercontent.com/thazsobral/thazsobral/refs/heads/main/README.md',
      fallback: `Hello! My name is Thalles 👋

I am a curious and driven technology professional always seeking new challenges and opportunities. I believe in the power of creativity to solve complex problems and am constantly striving to learn and grow.

💻 I am currently working as a programmer.
🚀 I am passionate about challenges that drive my growth.
💡 I embrace a hacker mindset: curiosity, continuous learning, and a relentless pursuit of innovative solutions.`,
    },
    tips: {
      title: 'Latest tips',
      loading: 'Loading tips...',
      empty: 'No tips found.',
      error: 'Unable to load tips at this time.',
      noDescription: 'No description',
    },
    portfolio: {
      title: 'Portfolio',
      loading: 'Loading projects...',
      empty: 'No projects found.',
      error: 'Unable to load projects at this time.',
      langTagTitle: 'predominant project language',
      topicTagTitle: 'topic related to the project',
    },
    organizations: {
      title: 'Organizations',
      loading: 'Loading organizations...',
      empty: 'No organizations found.',
      error: 'Unable to load organizations at this time.',
      iconAlt: 'Organization icon',
    },
    post: {
      loading: 'Loading Gist content...',
      errorTitle: 'Failed to load',
      errorDesc: 'Could not fetch content. Please check your connection or Gist ID.',
      backHome: 'Back to home',
      footerGists: 'Content via GitHub Gists.',
    },
    footer: {
      loadingUser: 'Loading GitHub profile...',
      repos: 'Repositories',
      followers: 'Followers',
      following: 'Following',
      rights: 'Made with 🤍 by ThazSobral.<br>All rights reserved.',
    },
    theme: {
      light: '☀️ Light',
      dark: '🌙 Dark',
      system: '🖥️ System',
    },
    meta: {
      title: 'Thalles Sobral | Developer',
      description: 'Portfolio of Thalles Sobral - Fullstack Developer with projects, tips, and biography.',
    },
  },
};
