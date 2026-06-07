import { Link } from 'react-router-dom';
import lessons from '../data/lessons';
import RustLogo from '../components/RustLogo';
import { APP_NAME, APP_TAGLINE } from '../config';
import './Home.css';

function Home({ completed, onReset }) {
  const nextLesson = lessons.find((l) => !completed.includes(l.id));

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-logo">
          <RustLogo size={72} color="#ce422b" spinning />
        </div>
        <h1 className="hero-title">{APP_NAME}</h1>
        <p className="hero-subtitle">{APP_TAGLINE}</p>

        {nextLesson && (
          <Link to={`/lesson/${nextLesson.id}`} className="hero-cta">
            {completed.length === 0 ? 'Start Learning →' : 'Continue Learning →'}
          </Link>
        )}
        {!nextLesson && (
          <Link to="/complete" className="hero-cta">
            View Your Certificate 🎉
          </Link>
        )}
      </section>

      {/* Progress summary */}
      <section className="progress-summary">
        <span className="progress-summary-text">
          {completed.length} of {lessons.length} lessons completed
        </span>
        <div className="progress-bar-big-wrapper">
          <div
            className="progress-bar-big-fill"
            style={{ width: `${Math.round((completed.length / lessons.length) * 100)}%` }}
          />
        </div>
      </section>

      {/* Lesson grid */}
      <section className="lesson-grid">
        {lessons.map((lesson) => {
          const done = completed.includes(lesson.id);
          const isNext = nextLesson?.id === lesson.id;
          return (
            <Link
              key={lesson.id}
              to={`/lesson/${lesson.id}`}
              className={`lesson-card ${done ? 'lesson-card--done' : ''} ${isNext ? 'lesson-card--next' : ''}`}
            >
              <div className="lesson-card-top">
                <span className="lesson-emoji">{lesson.emoji}</span>
                {done && <span className="done-badge">✓</span>}
                {isNext && !done && <span className="next-badge">Next</span>}
              </div>
              <p className="lesson-number">Lesson {lesson.id}</p>
              <h3 className="lesson-card-title">{lesson.title}</h3>
              <p className="lesson-desc">{lesson.description}</p>
            </Link>
          );
        })}
      </section>

      {/* Reset progress */}
      {completed.length > 0 && (
        <div className="reset-section">
          <button
            className="reset-btn"
            onClick={() => {
              if (window.confirm('Reset all progress? This cannot be undone.')) {
                onReset();
              }
            }}
          >
            🔄 Reset All Progress
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
