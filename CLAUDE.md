# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server (localhost:5173)
npm run build      # Production build → dist/
npm run preview    # Preview dist/ locally
npm run lint       # ESLint check (no --fix by default)
npm run format     # Prettier --write all files
npm run format:check # Prettier --check
npm run deploy     # Build + deploy to GitHub Pages via gh-pages
```

## Architecture

- **HashRouter** — all routes hash-based (`/#/`, `/#/lesson/3`, `/#/complete`) for GitHub Pages. Never switch to BrowserRouter.
- **React 19** — functional components only, hooks at top of function body.
- **Vite 8** — build tool with React plugin.
- **CSS custom properties** — theming via `[data-theme="light"]` / `[data-theme="dark"]` in `src/index.css`. No CSS frameworks (Tailwind, Bootstrap).
- **localStorage** — progress (`rust-rover-progress` as `number[]`) and theme (`rust-rover-theme` as `"light"`|`"dark"`) persistence.
- **react-syntax-highlighter** — PrismLight with vscDarkPlus theme, Rust language registered.

### Routes (src/App.jsx)

| Path          | Component                        | Description                     |
| ------------- | -------------------------------- | ------------------------------- |
| `/`           | Home                             | Hero, progress bar, lesson grid |
| `/lesson/:id` | Lesson (via LessonRoute wrapper) | Content + quiz                  |
| `/complete`   | Complete                         | Certificate of completion       |
| `*`           | Home (fallback)                  | Catch-all redirect              |

### Lesson Data Shape

Lessons live in `src/data/lessons.js` — a single array of objects:

```
{ id, title, emoji, description, content[], quizzes[] }
```

- `content[]`: blocks with `type: 'text' | 'heading' | 'code' | 'tip'`
- `quizzes[]`: 2–5 per lesson, either `type: 'mcq'` (question, options[4], correct index) or `type: 'code-fill'` (question, codePrefix, codeSuffix, answer)
- Every quiz concept must be taught in that lesson's content.

### Quiz Flow

1. Random quiz selected on lesson mount (lazy `useState` init)
2. Wrong answer → shows explanation + retry button or "show answer"
3. Correct answer → confetti animation, marks lesson complete
4. After passing: "Try another question" (unseen quizzes) or "Retake Quiz" (reshuffles all)
5. Lesson locked until previous lesson completed

### Key Rules

- No hardcoded colors outside `CodeBlock.css` — use CSS custom properties from `src/index.css`
- Brand color: `--primary: #ce422b`
- `package.json`, `eslint.config.js`, `.prettierrc` — never modify
- All code examples in lessons must be valid Rust
