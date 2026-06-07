# Contributing to RustRover

Thanks for your interest in contributing! Please read this guide before opening a PR.

---

## Branch strategy

| Branch    | Purpose                                                               |
| --------- | --------------------------------------------------------------------- |
| `main`    | Active development — all PRs target this branch                       |
| `release` | Production-ready code — merging here triggers GitHub Pages deployment |

1. Fork the repo and create a feature branch off `main`:
   ```bash
   git checkout -b feat/your-feature
   ```
2. Open a Pull Request against **`main`**.
3. After review and merge into `main`, a maintainer opens a PR from `main` → `release` to ship to production.

---

## Automated checks (every PR must pass)

Every PR targeting `main` or `release` runs the **CI workflow** which checks:

1. **ESLint** — `npm run lint` (zero errors)
2. **Prettier** — `npm run format:check` (code must be formatted)
3. **Build** — `npm run build` (Vite production build must succeed)

PRs cannot be merged until all three checks pass.

---

## Local development

```bash
npm install       # install dependencies (also sets up Husky)
npm run dev       # Vite dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the dist/ build locally
```

### Pre-commit hook

Husky runs `lint-staged` automatically on every commit:

- `*.{js,jsx}` — ESLint (auto-fix) + Prettier (format)
- `*.{css,md,json}` — Prettier (format)

You can also run these manually:

```bash
npm run lint            # ESLint only
npm run format          # Prettier write (format everything)
npm run format:check    # Prettier check (no writes — same as CI)
```

---

## Code style

- **ESLint** config: `eslint.config.js` (react-hooks + react-refresh + prettier)
- **Prettier** config: `.prettierrc` (single quotes, 2-space indent, 100-char width)
- Functional components only — no class components
- No TypeScript; keep names self-documenting
- No hard-coded colour values outside `CodeBlock.css`

---

## Adding or editing lesson content

See the copilot instructions in `.github/copilot-instructions.md` for the full lesson data shape. Key rules:

- Every concept tested in a quiz must be explicitly taught in that lesson's `content[]`
- Bump `APP_VERSION` in `src/config.js` when lesson content changes
- No routing changes needed — lessons are generated dynamically from `src/data/lessons.js`
