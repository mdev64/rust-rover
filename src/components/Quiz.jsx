import { useState } from 'react';
import Confetti from './Confetti';
import './Quiz.css';

// ─── MCQ Quiz ───────────────────────────────────────────────
export function QuizMCQ({ quiz, onCorrect, isRetake }) {
  const [selected, setSelected] = useState(null);
  const [wrongAttempt, setWrongAttempt] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const isLocked = correct || revealed || wrongAttempt;

  function handleSubmit() {
    if (selected === null) return;
    if (selected === quiz.correct) {
      setCorrect(true);
      setWrongAttempt(false);
      setShowConfetti(true);
      onCorrect();
    } else {
      setWrongAttempt(true);
    }
  }

  function handleRetry() {
    setSelected(null);
    setWrongAttempt(false);
  }

  function handleReveal() {
    setRevealed(true);
    setWrongAttempt(false);
  }

  function getOptionClass(i) {
    let cls = 'mcq-option';
    if (correct && i === quiz.correct) cls += ' mcq-option--correct';
    else if (revealed && i === quiz.correct) cls += ' mcq-option--correct';
    else if ((revealed || wrongAttempt) && i === selected && i !== quiz.correct)
      cls += ' mcq-option--wrong';
    else if (!isLocked && i === selected) cls += ' mcq-option--selected';
    return cls;
  }

  return (
    <div className="quiz-inner">
      <p className="quiz-question">{quiz.question}</p>

      <ul className="mcq-options">
        {quiz.options.map((option, i) => (
          <li key={i}>
            <button
              className={getOptionClass(i)}
              onClick={() => !isLocked && setSelected(i)}
              disabled={isLocked}
            >
              <span className="mcq-letter">{String.fromCharCode(65 + i)}</span>
              <span>{option}</span>
            </button>
          </li>
        ))}
      </ul>

      {wrongAttempt && !correct && !revealed && (
        <div className="quiz-feedback quiz-feedback--wrong">
          <p className="feedback-status">❌ Not quite — think it through and try again.</p>
          <div className="quiz-feedback-actions">
            <button className="retry-btn" onClick={handleRetry}>
              ↩ Try Again
            </button>
            <button className="show-answer-btn" onClick={handleReveal}>
              💡 Show Answer
            </button>
          </div>
        </div>
      )}

      {revealed && (
        <div className="quiz-feedback quiz-feedback--revealed">
          <p className="feedback-status">💡 Here&apos;s the answer:</p>
          <p className="feedback-explanation">{quiz.explanation}</p>
        </div>
      )}

      {correct && (
        <div className="quiz-feedback quiz-feedback--correct">
          {showConfetti && <Confetti />}
          <p className="feedback-status">
            {isRetake ? '🎉 Well done! Still got it!' : '🎉 Correct! Great job!'}
          </p>
          <p className="feedback-explanation">{quiz.explanation}</p>
        </div>
      )}

      {!wrongAttempt && !correct && !revealed && (
        <button className="quiz-submit-btn" onClick={handleSubmit} disabled={selected === null}>
          Submit Answer
        </button>
      )}
    </div>
  );
}

// ─── Code-Fill Quiz ─────────────────────────────────────────
export function QuizCodeFill({ quiz, onCorrect, isRetake }) {
  const [answer, setAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const isLocked = correct || revealed;

  function handleSubmit() {
    if (!answer.trim()) return;
    if (answer.trim() === quiz.answer) {
      setCorrect(true);
      setShowConfetti(true);
      onCorrect();
    } else {
      setAttempts((a) => a + 1);
    }
  }

  function handleReveal() {
    setRevealed(true);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubmit();
  }

  return (
    <div className="quiz-inner">
      <p className="quiz-question">{quiz.question}</p>

      <div className="code-fill-wrapper">
        <pre className="code-fill-pre">
          <code>
            {quiz.codePrefix && <span className="code-dim">{quiz.codePrefix}</span>}
            {isLocked ? (
              <span className={correct ? 'code-fill-answer--correct' : 'code-fill-answer--wrong'}>
                {correct ? answer.trim() : quiz.answer}
              </span>
            ) : (
              <input
                className="code-fill-input"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type here"
                autoFocus
                spellCheck={false}
              />
            )}
            {quiz.codeSuffix && <span className="code-dim">{quiz.codeSuffix}</span>}
          </code>
        </pre>
      </div>

      {attempts > 0 && !isLocked && (
        <div className="quiz-feedback quiz-feedback--wrong">
          <p className="feedback-status">
            {attempts === 1
              ? '❌ Not quite — try a different answer.'
              : `❌ Still not right — ${attempts} wrong attempt${attempts > 1 ? 's' : ''} so far.`}
          </p>
          <div className="quiz-feedback-actions">
            <button className="show-answer-btn" onClick={handleReveal}>
              💡 Show Answer
            </button>
          </div>
        </div>
      )}

      {revealed && (
        <div className="quiz-feedback quiz-feedback--revealed">
          <p className="feedback-status">
            💡 The answer is: <code className="inline-answer">{quiz.answer}</code>
          </p>
          <p className="feedback-explanation">{quiz.explanation}</p>
        </div>
      )}

      {correct && (
        <div className="quiz-feedback quiz-feedback--correct">
          {showConfetti && <Confetti />}
          <p className="feedback-status">
            {isRetake ? '🎉 Well done! Still got it!' : '🎉 Correct! Great job!'}
          </p>
          <p className="feedback-explanation">{quiz.explanation}</p>
        </div>
      )}

      {!isLocked && (
        <button className="quiz-submit-btn" onClick={handleSubmit} disabled={!answer.trim()}>
          Check Answer
        </button>
      )}
    </div>
  );
}

// ─── Quiz wrapper ────────────────────────────────────────────
function Quiz({ quiz, onCorrect, isRetake = false }) {
  if (!quiz) return null;

  return (
    <section className="quiz-card">
      <h3 className="quiz-title">{isRetake ? '🔁 Retaking Quiz' : '🧠 Quiz Time!'}</h3>
      {quiz.type === 'mcq' && <QuizMCQ quiz={quiz} onCorrect={onCorrect} isRetake={isRetake} />}
      {quiz.type === 'code-fill' && (
        <QuizCodeFill quiz={quiz} onCorrect={onCorrect} isRetake={isRetake} />
      )}
    </section>
  );
}

export default Quiz;
