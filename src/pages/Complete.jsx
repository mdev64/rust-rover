import { Link } from 'react-router-dom';
import { APP_NAME, GITHUB_URL } from '../config';
import './Complete.css';

function Complete({ totalCount, onReset }) {
  return (
    <div className="complete-page">
      <div className="confetti-row">🎉 🎊 🦀 🎊 🎉</div>
      <h1 className="complete-title">You Did It!</h1>
      <p className="complete-subtitle">
        You&apos;ve completed all <strong>{totalCount}</strong> lessons in{' '}
        <strong>{APP_NAME}</strong>. You now know Rust from the basics all the way to advanced
        concepts like concurrency!
      </p>

      <div className="certificate">
        <div className="cert-icon">🏆</div>
        <h2 className="cert-title">Certificate of Completion</h2>
        <p className="cert-body">
          This certifies that you have successfully completed all <strong>{totalCount}</strong>{' '}
          lessons in the <em>{APP_NAME}</em> interactive course, covering topics from Variables and
          Ownership to Traits, Closures, and Concurrency.
        </p>
        <p className="cert-date">
          Completed on{' '}
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Reset progress */}
      <div className="complete-reset">
        <button
          className="complete-reset-btn"
          onClick={() => {
            if (window.confirm('Reset all progress and start over?')) onReset();
          }}
        >
          🔄 Reset &amp; Start Over
        </button>
      </div>

      <div className="complete-actions">
        <Link to="/" className="action-btn action-btn--primary">
          ← Back to Home
        </Link>
        <a
          href="https://doc.rust-lang.org/stable/book/"
          target="_blank"
          rel="noopener noreferrer"
          className="action-btn action-btn--secondary"
        >
          Explore The Rust Book ↗
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="action-btn action-btn--secondary"
        >
          ⭐ Star on GitHub
        </a>
      </div>
    </div>
  );
}

export default Complete;
