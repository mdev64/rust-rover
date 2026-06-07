# 🦀 RustRover

> **Master Rust, one challenge at a time.**

RustRover is a fully interactive, self-paced Rust learning app. Work through 20 hands-on lessons covering everything from variables and ownership to macros, lifetimes, and unsafe Rust, then test your knowledge with quizzes at the end of each lesson.

**Live demo:** [rust-rover.mdev.com.lk](https://rust-rover.mdev.com.lk/)

---

## ✨ Features

| Feature                 | Details                                                   |
| ----------------------- | --------------------------------------------------------- |
| 📚 20 Lessons           | Beginner → Advanced, covering all key Rust concepts       |
| 🧠 Random Quizzes       | 2–5 quiz variants per lesson — one picked randomly        |
| 🔁 Retake Option        | Retry any quiz after completion with a fresh question     |
| 🎉 Confetti Celebration | Animated confetti fires on every correct answer           |
| 🌙 Dark / Light Mode    | Toggleable theme — remembers your preference              |
| 💾 Progress Persistence | Lesson completion auto-saves to localStorage              |
| 🔄 Reset Progress       | Start fresh at any time from Home or the certificate page |
| 📱 Responsive           | Works on mobile, tablet, and desktop                      |
| 🏆 Certificate Page     | Completion certificate after all 20 lessons               |
| 🚀 GitHub Pages Ready   | Deploys in one command                                    |

---

## 📖 Lessons

| #   | Lesson                      | Topic                                                        |
| --- | --------------------------- | ------------------------------------------------------------ |
| 1   | 🦀 What is Rust?            | Safe, fast, concurrent — why Rust exists                     |
| 2   | 📦 Variables & Mutability   | `let`, `mut`, `const`, shadowing                             |
| 3   | 🎯 Data Types               | Scalar (i32, f64, bool, char) + Compound (tuples, arrays)    |
| 4   | 🔧 Functions                | `fn` syntax, parameters, return values, expressions          |
| 5   | 🔀 Control Flow             | if/else, loop, while, for, match                             |
| 6   | 🔑 Ownership                | Ownership rules, move semantics, Copy trait                  |
| 7   | 🔗 Borrowing & References   | `&T`, `&mut T`, borrowing rules, slices                      |
| 8   | 🏗️ Structs                  | Defining, instantiating, `impl`, methods, tuple structs      |
| 9   | 🎭 Enums & Pattern Matching | `enum`, `Option`, `Result`, match with destructuring         |
| 10  | 📝 Strings                  | `String` vs `&str`, common methods, UTF-8 iteration          |
| 11  | 📚 Collections              | `Vec`, `HashMap`, `HashSet` — when to use each               |
| 12  | ⚠️ Error Handling           | `panic!`, `Result`, `?` operator, unwrap vs expect           |
| 13  | 🧬 Traits & Generics        | Trait bounds, generic functions/structs, `impl Trait`        |
| 14  | ⛓️ Closures & Iterators     | Closure syntax, `Iterator` trait, `map`, `filter`, `collect` |
| 15  | ⚡ Concurrency              | `std::thread`, `Send`/`Sync`, channels, `Arc<Mutex<T>>`      |
| 16  | 📦 Modules & Packages       | `mod`, `pub`, `use`, Cargo.toml, workspaces                  |
| 17  | 🔄 Lifetimes                | Lifetime annotations, elision, struct lifetimes              |
| 18  | 🎯 Smart Pointers           | `Box<T>`, `Rc<T>`, `RefCell<T>`, interior mutability         |
| 19  | 🔮 Macros                   | `macro_rules!`, declarative macros, common built-in macros   |
| 20  | ✅ Testing & Documentation  | Unit tests, integration tests, doc tests, doc comments       |

---

## 🛠️ Tech Stack

- **[React 19](https://react.dev/)** — UI library
- **[Vite 8](https://vitejs.dev/)** — build tool & dev server
- **[React Router v7](https://reactrouter.com/)** — client-side routing (HashRouter for GitHub Pages)
- **[react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)** — Rust code blocks with vscDarkPlus theme
- **Pure CSS** — no external component libraries; fully custom theme system with CSS custom properties
- **localStorage** — progress and theme persistence

---

## 🚀 Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/mdev64/rust-rover.git
cd rust-rover

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open http://localhost:5173 in your browser.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── CodeBlock.jsx       # Syntax-highlighted Rust code blocks with copy button
│   ├── Confetti.jsx        # Celebration particle animation
│   ├── ContentRenderer.jsx # Renders lesson blocks (text / code / tip)
│   ├── Layout.jsx          # App shell: header, nav, progress bar, theme toggle
│   └── RustLogo.jsx        # Rust gear logo SVG
├── data/
│   └── lessons.js          # All 20 lessons with content + 2-5 quizzes each
├── hooks/
│   ├── useProgress.js      # localStorage-backed lesson completion tracking
│   └── useTheme.js         # Dark/light mode with localStorage persistence
├── pages/
│   ├── Home.jsx            # Lesson grid + progress summary
│   ├── Lesson.jsx          # Individual lesson with random quiz + retake
│   └── Complete.jsx        # Completion certificate page
├── config.js               # App name, tagline, GitHub URL
└── index.css               # Global styles + CSS custom property theme system
```

---

## 📄 License

MIT — free to use, fork, and learn from.

---

Built with React · Made for learning · Open source
