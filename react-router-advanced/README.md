# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## React Router (Advanced)

This project demonstrates:

- Basic routing (`Routes`, `Route`, `Link`)
- Nested routing via `Outlet` (Profile sub-sections)
- Dynamic routing via URL params (`/blog/:slug`)
- Protected routes with a simple authentication check (redirects to `/login`)

### Route Map

- `/` Home
- `/about` About
- `/blog/:slug` Dynamic blog post (example: `/blog/hello-world`)
- `/login` Simulated login screen
- `/profile` Protected (requires login)
  - `/profile` (index) ProfileDetails
  - `/profile/details` ProfileDetails
  - `/profile/settings` ProfileSettings

### Run

- Dev server: `npm run dev`
- Lint: `npm run lint`
- Production build: `npm run build`

### Functional Testing Checklist

1. Basic navigation
	- Use the top nav to move between Home and About.

2. Dynamic route
	- Visit `/blog/hello-world`.
	- Confirm the page reads the `slug` param and displays `hello-world`.

3. Protected route + redirect
	- While logged out, try to open `/profile`.
	- Confirm you are redirected to `/login`.
	- Click “Log in” and confirm you are redirected back to `/profile`.

4. Nested routes
	- From `/profile`, click “Details” and “Settings”.
	- Confirm the nested content changes while staying inside the Profile page.

5. Logout behavior
	- Click “Log out”.
	- Try opening `/profile/settings` directly and confirm it redirects to `/login`.
