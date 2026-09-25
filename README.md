# Code Marathon ![Deploy](https://github.com/PauloMiranda98/codemarathon-rails/actions/workflows/deploy.yml/badge.svg?branch=main)

O Code Marathon é um sistema onde pessoas interessadas por Maratona de Programação e pela Olimpíada Brasileira de Informática podem aprender os conteúdos recorrentes nessas competições.

Code Marathon é um projeto open source que todos podem contribuir tanto com o sistema quanto com o conteúdo. A ideia é ser um projeto que tenha não só conteúdos próprios mas também mantenha de forma centralizada todos os conteúdos produzidos no Brasil.

## 🚀 Como contribuir com conteúdo?

Para contribuir com conteúdo, basta acessar o diretório [/contents](/contents). Lá existe um [README específico em /contents](/contents/README.md) detalhando os passos para adicionar novos artigos (arquivos Markdown `.md`, fórmulas LaTeX e vídeos do YouTube).

## 💻 Como rodar o site localmente?

O sistema foi convertido para uma aplicação **React (Single Page Application)** construída com **Vite**, **TypeScript** e **Tailwind CSS**.

### Configurando o ambiente

1. Instale o [Node.js](https://nodejs.org/) (versão 18+) e o `yarn` se necessário.
2. Instale as dependências:
   ```bash
   yarn install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   yarn dev
   ```
4. Abra `http://localhost:5173/` no seu navegador.

## 📦 Hospedagem no GitHub Pages

O projeto está configurado para deploy automático no **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`).

Toda vez que alterações são enviadas para a branch `main`, a Action faz o build da aplicação e publica na branch `gh-pages`.

Para fazer o build e deploy manualmente via CLI:
```bash
yarn deploy
```
