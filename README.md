# Thalles Sobral - Portfólio (React + TypeScript)

<p align="center">
  <img src="/assets/images/study-development.svg" width="220" alt="Estudo e desenvolvimento">
</p>

Portfólio de **Thalles Sobral**, reescrito em **React 19** com **TypeScript** e **Vite**, preservando a identidade visual, temas e integrações de dados.

## Recursos
- **Header dinâmico**: Carrega o status/bio diretamente da API pública do GitHub (`@thazsobral`), com navegação responsiva e menu hambúrguer para dispositivos móveis.
- **Seletor de Tema**: Suporte completo a temas Light, Dark e System com persistência em `localStorage`.
- **Bio Dinâmica**: Extrai a biografia atualizada do repositório GitHub através do `README-PT.md`.
- **Dicas & Artigos**: Integração com GitHub Gists e renderizador Markdown (`marked`) para leitura de posts em página dedicada.
- **Portfólio de Repositórios**: Listagem automática dos repositórios públicos com tags de linguagens e tópicos.
- **Card GitHub & Sponsor**: Cartão de perfil GitHub interativo e botão oficial de patrocínio no GitHub Sponsors.

## Tecnologias
- **React 19**
- **TypeScript**
- **Vite**
- **Marked** (Markdown Parser)
- **CSS Custom Properties** (Design system fiel com suporte a modo claro e escuro)

## Como Executar
```bash
npm install
npm run dev
```
O servidor de desenvolvimento iniciará na porta 3000 (`http://localhost:3000`).

## Compilação para Produção
```bash
npm run build
```
