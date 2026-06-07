# GitHub Copilot Instructions — RustRover

This file gives GitHub Copilot (and contributors) the context it needs to produce accurate, consistent suggestions for this codebase.

---

## Project overview

**RustRover** is a client-side Rust learning app where users read 15 progressive lessons about Rust and answer quizzes to unlock the next lesson. It is built with:

- **Vite 8** + **Rust 19** (functional components, hooks only — no class components)
- **react-router-dom v7** with `HashRouter` (required for GitHub Pages)
- **react-syntax-highlighter** (PrismLight, `vscDarkPlus` theme) for code blocks
- Plain CSS with **CSS custom properties** for theming (no CSS-in-JS, no Tailwind)
- Progress stored in **localStorage** via the `useProgress` hook
- Deployed to **GitHub Pages** via `gh-pages`

---

## Repository structure

```
src/
  App.jsx               # Root — routes, useProgress, passes isComplete/markComplete
  config.js             # APP_NAME, APP_VERSION, APP_TAGLINE, GITHUB_URL
  main.jsx              # RustDOM.createRoot entry point
  index.css             # Global CSS reset + CSS custom properties (light/dark vars)
  components/
    CodeBlock.jsx        # Syntax-highlighted code block (react-syntax-highlighter)
    CodeBlock.css
    Confetti.jsx         # Screen-wide CSS confetti animation on quiz pass
    Confetti.css
    ContentRenderer.jsx  # Renders lesson content blocks (text/code/tip/heading/demo)
    ContentRenderer.css
    Layout.jsx           # Shell: header (logo, progress bar, theme toggle) + nav
    Layout.css
    Quiz.jsx             # MCQ + code-fill quiz with wrong-answer tip & retry flow
    Quiz.css
    RustLogo.jsx        # Spinning SVG Rust logo
  pages/
    Home.jsx             # Hero, progress summary, lesson grid (all 15 cards)
    Home.css
    Lesson.jsx           # Individual lesson: content + locked/unlocked quiz
    Lesson.css
    Complete.jsx         # Completion certificate page
    Complete.css
  data/
    lessons.js           # Single source of truth: 15 lessons, each with content[] + quizzes[]
  hooks/
    useProgress.js       # localStorage read/write for completed lesson IDs
```

---

## Key patterns & conventions

### Lesson data (`src/data/lessons.js`)

Each lesson object follows this exact shape:

```js
{
  id: Number,           // 1–15, sequential
  title: String,
  emoji: String,        // single emoji
  description: String,  // one sentence shown as subtitle
  content: [            // ordered array of content blocks
    { type: 'text',    text: '...' },          // supports **bold** and `code` inline markdown
    { type: 'heading', text: '...' },
    { type: 'code',    code: '...' },          // multi-line JS/JSX string
    { type: 'tip',     text: '...' },
    { type: 'demo',    id: 'counter'|'toggle' }
  ],
  quizzes: [            // 2–5 quiz objects per lesson
    // MCQ variant:
    {
      type: 'mcq',
      question: String,
      options: String[],  // 4 options
      correct: Number,    // 0-based index
      explanation: String
    },
    // Code-fill variant:
    {
      type: 'code-fill',
      question: String,
      codePrefix: String,
      codeSuffix: String,
      answer: String,     // exact string the user must type
      explanation: String
    }
  ]
}
```

**Rules for lesson content:**

- Every concept tested in a quiz **must be explicitly taught** in that lesson's `content[]` — don't assume prior knowledge beyond previous lessons.
- All `quizzes[].explanation` strings should be self-contained: they're shown after an answer and teach even if the user guessed wrong.
- Lesson quizzes are **locked** until the previous lesson is completed (enforced in `Lesson.jsx`).

### Theming

- CSS custom properties are defined on `[data-theme="light"]` and `[data-theme="dark"]` in `src/index.css`.
- The `data-theme` attribute is toggled on `<html>` by `Layout.jsx`.
- Theme preference is persisted in `localStorage` under the key `rust-rover-theme`.
- **Never** use hard-coded colour values outside of `CodeBlock.css` (which is intentionally always dark).

### Progress tracking

- `useProgress` (`src/hooks/useProgress.js`) exposes `{ completed, markComplete, isComplete, resetProgress }`.
- `completed` is an array of lesson IDs (numbers) that have been passed.
- `markComplete(id)` is called from `Lesson.jsx → handleCorrect()` only on the first pass (not retakes).
- Stored in localStorage under `react-learn-progress`.

### Quiz flow

1. A random quiz from the pool is picked on mount.
2. Wrong answer → show tip + "Try Again" + "Show Answer" (no immediate reveal).
3. Correct answer → confetti plays, `quizPassed = true`, `markComplete` called.
4. While `quizPassed && !done` → the quiz stays mounted so confetti is visible.
5. After passing, if unseen quizzes remain, a "Try another question" button appears.
6. The "done" banner (retake/try-another) only shows when `done && !isRetaking && !quizPassed`.

### Routing

- Uses `HashRouter` — all routes are hash-based (`/#/`, `/#/lesson/3`, `/#/complete`).
- Do **not** switch to `BrowserRouter`; it breaks GitHub Pages without server-side config.
- Route params: `/lesson/:id` (id is a stringified integer, parsed with `parseInt`).

---

## Adding a new lesson

1. Add an entry to `src/data/lessons.js` with the next sequential `id`.
2. Follow the content/quiz shape above; include 2–5 quizzes.
3. Ensure every quiz concept is covered in the lesson's `content[]`.
4. Update `APP_VERSION` in `src/config.js` (bump patch version).
5. No routing changes needed — the lesson grid and routes are generated dynamically.

---

## Code style

- **ESLint** config: `eslint.config.js` (react-hooks + react-refresh plugins).
- **Prettier**: single quotes, 2-space indent, trailing commas (`es5`), 100-char print width.
- **Pre-commit hook** via Husky runs `npm run lint` automatically.
- Functional components only. Hooks at the top of the function body.
- `key` props on all mapped elements — prefer stable IDs over array indices.
- No TypeScript. Keep JSDoc comments minimal; prefer self-documenting names.

---

## Build & deploy

```bash
npm run lint       # ESLint (auto-fix with --fix)
npm run format:check  # Prettier check (no writes — same as CI)
npm run format     # Prettier write (formats all files)
npm run dev        # Vite dev server (localhost:5173)
npm run build      # Production build → dist/
npm run preview    # Preview the dist/ build locally
npm run deploy     # npm run build && gh-pages -d dist
```

The Vite `base` is set to `/rust-rover/` in `vite.config.js` — change this if the repo is renamed.

---

## What NOT to do

- Don't add class components or lifecycle methods.
- Don't introduce a CSS framework (Tailwind, Bootstrap, etc.) — use CSS custom properties.
- Don't switch from `HashRouter` to `BrowserRouter`.
- Don't hard-code colours outside `CodeBlock.css`.
- Don't mutate the `completed` array directly — always go through `markComplete`/`resetProgress`.
- Don't add a `quizzes[]` question whose concept isn't taught in that lesson's `content[]`.
