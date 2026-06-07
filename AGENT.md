# Agent Instructions — RustRover

> Build a fully interactive, self-paced Rust learning web application.

## Project Overview

**RustRover** is a React SPA where users work through progressive lessons covering Rust fundamentals — from variables and ownership to concurrency, macros, and unsafe Rust. Each lesson teaches a concept, then tests understanding with a quiz before unlocking the next lesson.

## Architecture

- **HashRouter** — all routes hash-based (`/#/`, `/#/lesson/3`, `/#/complete`) for GitHub Pages compatibility
- **React 19** — functional components only, hooks at top of function body
- **Vite 8** — build tool & dev server
- **CSS custom properties** — theming via `[data-theme="light"]` and `[data-theme="dark"]` in `src/index.css`
- **localStorage** — progress (`rust-rover-progress`) and theme (`rust-rover-theme`) persistence

## Key Files

| File                                 | Purpose                                                       |
| ------------------------------------ | ------------------------------------------------------------- |
| `src/App.jsx`                        | Root — routes, useProgress                                    |
| `src/config.js`                      | APP_NAME, APP_TAGLINE, GITHUB_URL                             |
| `src/index.css`                      | Global CSS reset + CSS custom props for light/dark themes     |
| `src/data/lessons.js`                | ALL lessons — single source of truth                          |
| `src/hooks/useProgress.js`           | localStorage-backed progress tracking                         |
| `src/hooks/useTheme.js`              | localStorage-backed theme toggle                              |
| `src/components/Layout.jsx`          | Shell: header (logo, progress bar, theme toggle) + nav        |
| `src/components/Quiz.jsx`            | MCQ + code-fill quiz with wrong-answer tip & retry            |
| `src/components/ContentRenderer.jsx` | Renders lesson content (text/code/tip/heading)                |
| `src/components/CodeBlock.jsx`       | Syntax-highlighted code (react-syntax-highlighter, Rust lang) |
| `src/components/Confetti.jsx`        | CSS confetti on quiz pass                                     |
| `src/pages/Home.jsx`                 | Hero, progress bar, lesson grid                               |
| `src/pages/Lesson.jsx`               | Lesson content + quiz (with lock/unlock state)                |
| `src/pages/Complete.jsx`             | Certificate of completion page                                |

## Lesson Data Shape

```js
{
  id: Number,           // sequential
  title: String,
  emoji: String,        // single emoji
  description: String,  // one sentence subtitle
  content: [{           // ordered content blocks
    type: 'text' | 'heading' | 'code' | 'tip',
    // text: String for text/heading/tip
    // code: String for code blocks
  }],
  quizzes: [{           // 2–5 quiz objects
    // MCQ:
    type: 'mcq',
    question: String,
    options: String[],  // 4 options
    correct: Number,    // 0-based index
    explanation: String
    // Code-fill:
    type: 'code-fill',
    question: String,
    codePrefix: String,
    codeSuffix: String,
    answer: String,
    explanation: String
  }]
}
```

## Rules

- Every quiz concept must be taught in that lesson's `content[]`
- All code examples must be valid Rust
- Lessons are locked until the previous lesson is completed
- Never switch from HashRouter to BrowserRouter
- Never introduce a CSS framework (Tailwind, Bootstrap)
- Never hard-code colours outside `CodeBlock.css`
- Never modify `package.json`, `eslint.config.js`, `.prettierrc`
