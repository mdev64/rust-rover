import { HashRouter, Routes, Route, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Complete from './pages/Complete';
import useProgress from './hooks/useProgress';
import lessons from './data/lessons';

function LessonRoute({ markComplete, isComplete, completed }) {
  const { id } = useParams();
  const lessonId = parseInt(id, 10);
  return (
    <Layout lessonId={lessonId} completed={completed}>
      <Lesson markComplete={markComplete} isComplete={isComplete} />
    </Layout>
  );
}

function App() {
  const { completed, markComplete, isComplete, resetProgress } = useProgress();

  return (
    <HashRouter>
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <Layout completed={completed}>
              <Home completed={completed} onReset={resetProgress} />
            </Layout>
          }
        />

        {/* Individual lesson */}
        <Route
          path="/lesson/:id"
          element={
            <LessonRoute
              markComplete={markComplete}
              isComplete={isComplete}
              completed={completed}
            />
          }
        />

        {/* Completion page */}
        <Route
          path="/complete"
          element={
            <Layout completed={completed}>
              <Complete
                completedCount={completed.length}
                totalCount={lessons.length}
                onReset={resetProgress}
              />
            </Layout>
          }
        />

        {/* Catch-all — redirect home */}
        <Route
          path="*"
          element={
            <Layout completed={completed}>
              <Home completed={completed} onReset={resetProgress} />
            </Layout>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
