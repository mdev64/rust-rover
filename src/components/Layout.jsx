import { Link, useNavigate } from 'react-router-dom';
import lessons from '../data/lessons';
import useTheme from '../hooks/useTheme';
import RustLogo from './RustLogo';
import { APP_NAME, APP_VERSION, GITHUB_URL } from '../config';
import './Layout.css';

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13 -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66 .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15 -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function Layout({ children, lessonId, completed }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const totalLessons = lessons.length;
  const completedCount = completed.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const currentIndex = lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const isLastLesson = currentIndex === lessons.length - 1;
  const currentIsComplete = completed.includes(lessonId);

  return (
    <div className="layout">
      {/* ── Header ── */}
      <header className="header">
        <Link to="/" className="logo">
          <RustLogo size={28} color="#ce422b" spinning />
          <span className="logo-text-group">
            <span className="logo-text">{APP_NAME}</span>
            <span className="logo-version">v{APP_VERSION}</span>
          </span>
        </Link>

        <div className="header-right">
          <span className="progress-label">
            {completedCount}/{totalLessons}
          </span>
          <div className="progress-bar-wrapper">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>

          {/* GitHub link */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
            title="View on GitHub"
            aria-label="View on GitHub"
          >
            <GitHubIcon />
          </a>

          {/* Theme toggle */}
          <button
            className="icon-btn theme-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="main">{children}</main>

      {/* ── Navigation footer (only on lesson pages) ── */}
      {lessonId && (
        <nav className="lesson-nav">
          <button
            className="nav-btn nav-btn--prev"
            onClick={() => (prevLesson ? navigate(`/lesson/${prevLesson.id}`) : navigate('/'))}
          >
            ← {prevLesson ? prevLesson.title : 'Home'}
          </button>

          <span className="nav-counter">
            {currentIndex + 1} / {totalLessons}
          </span>

          {currentIsComplete ? (
            <button
              className="nav-btn nav-btn--next"
              onClick={() => {
                if (isLastLesson) navigate('/complete');
                else navigate(`/lesson/${nextLesson.id}`);
              }}
            >
              {isLastLesson ? 'Finish 🎉' : `${nextLesson.title} →`}
            </button>
          ) : (
            <button className="nav-btn nav-btn--next nav-btn--disabled" disabled>
              Complete quiz to continue →
            </button>
          )}
        </nav>
      )}
    </div>
  );
}

export default Layout;
