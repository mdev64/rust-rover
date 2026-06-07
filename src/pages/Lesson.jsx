import { useParams, Navigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import lessons from '../data/lessons';
import ContentRenderer from '../components/ContentRenderer';
import Quiz from '../components/Quiz';
import './Lesson.css';

function Lesson({ markComplete, isComplete }) {
  const { id } = useParams();
  const lessonId = parseInt(id, 10);
  const lesson = lessons.find((l) => l.id === lessonId);

  // Lazily pick a random quiz index for this lesson mount
  function initQuizIndex() {
    return Math.floor(Math.random() * lesson.quizzes.length);
  }

  const [seenIndices, setSeenIndices] = useState(function () {
    return new Set([initQuizIndex()]);
  });
  const [activeIndex, setActiveIndex] = useState(initQuizIndex);
  const [isRetaking, setIsRetaking] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const prevLessonId = useRef(lessonId);

  useEffect(() => {
    if (prevLessonId.current === lessonId) return;
    prevLessonId.current = lessonId;
    const idx = Math.floor(Math.random() * lesson.quizzes.length);
    setSeenIndices(new Set([idx]));
    setActiveIndex(idx);
    setIsRetaking(false);
    setQuizPassed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  if (!lesson) return <Navigate to="/" replace />;

  const done = isComplete(lessonId);
  const activeQuiz = lesson.quizzes[activeIndex];

  const prevLesson = lessonId > 1 ? lessons.find((l) => l.id === lessonId - 1) : null;
  const quizLocked = prevLesson !== null && !isComplete(prevLesson.id);

  const unseenIndices = lesson.quizzes.map((_, i) => i).filter((i) => !seenIndices.has(i));

  function handleCorrect() {
    if (!isRetaking) markComplete(lessonId);
    setQuizPassed(true);
  }

  function handleTryAnother() {
    const newIndex = unseenIndices[Math.floor(Math.random() * unseenIndices.length)];
    setSeenIndices((prev) => new Set([...prev, newIndex]));
    setActiveIndex(newIndex);
    setIsRetaking(true);
    setQuizPassed(false);
  }

  function handleRetake() {
    const others = lesson.quizzes.map((_, i) => i).filter((i) => i !== activeIndex);
    const pool = others.length > 0 ? others : lesson.quizzes.map((_, i) => i);
    const newIndex = pool[Math.floor(Math.random() * pool.length)];
    setSeenIndices((prev) => new Set([...prev, newIndex]));
    setActiveIndex(newIndex);
    setIsRetaking(true);
    setQuizPassed(false);
  }

  return (
    <article className="lesson-page">
      {/* Lesson header */}
      <header className="lesson-header">
        <span className="lesson-badge">Lesson {lesson.id}</span>
        <h1 className="lesson-page-title">
          <span className="lesson-page-emoji">{lesson.emoji}</span>
          {lesson.title}
        </h1>
        <p className="lesson-page-desc">{lesson.description}</p>
      </header>

      {/* Lesson content */}
      <ContentRenderer content={lesson.content} />

      {/* Divider */}
      <hr className="lesson-divider" />

      {quizLocked ? (
        <div className="quiz-locked-banner">
          <span className="quiz-locked-icon">🔒</span>
          <div className="quiz-locked-body">
            <h3 className="quiz-locked-title">Quiz Locked</h3>
            <p className="quiz-locked-msg">
              Complete{' '}
              <Link to={`/lesson/${prevLesson.id}`} className="quiz-locked-link">
                {prevLesson.emoji} Lesson {prevLesson.id}: {prevLesson.title}
              </Link>{' '}
              first to unlock this quiz.
            </p>
          </div>
          <Link to={`/lesson/${prevLesson.id}`} className="quiz-locked-btn">
            Go to Lesson {prevLesson.id} →
          </Link>
        </div>
      ) : done && !isRetaking && !quizPassed ? (
        <div className="lesson-done-banner">
          <span className="lesson-done-text">✅ You&apos;ve already completed this lesson!</span>
          <div className="done-banner-actions">
            {unseenIndices.length > 0 && (
              <button className="retake-btn retake-btn--new" onClick={handleTryAnother}>
                🆕 Try another question
              </button>
            )}
            <button className="retake-btn" onClick={handleRetake}>
              🔁 Retake Quiz
            </button>
          </div>
        </div>
      ) : (
        <>
          <Quiz
            key={`${lessonId}-quiz-${activeIndex}`}
            quiz={activeQuiz}
            onCorrect={handleCorrect}
            isRetake={isRetaking}
          />

          {quizPassed && unseenIndices.length > 0 && (
            <div className="try-another-row">
              <button className="try-another-btn" onClick={handleTryAnother}>
                🆕 Try another question
                <span className="try-another-count">{unseenIndices.length} left</span>
              </button>
            </div>
          )}
        </>
      )}
    </article>
  );
}

export default Lesson;
