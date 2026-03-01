# React + Vite

## TMDB setup

This project expects a TMDB API key in a Vite env var.

- Copy `.env.example` to `.env.local`
- Set `VITE_TMDB_API_KEY` to your TMDB key

Then run:

- `npm install`
- `npm run dev`

## Deploying to Vercel

Vercel does not read your local `.env.local` file from your computer. You must set the env var in Vercel:

- Project → **Settings** → **Environment Variables**
- Add `VITE_TMDB_API_KEY` with your TMDB key
- Make sure it’s added for **Production** (and **Preview** if you use preview deploys)
- Redeploy after saving the env var

If this repo contains multiple apps, also ensure Vercel is building the right folder:

- Project → **Settings** → **General** → **Root Directory** → select `Movie-db-Project`

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
