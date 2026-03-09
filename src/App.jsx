import { useEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Dashboard from './components/shared/Dashboard.jsx';
import Evolution from './components/shared/Evolution.jsx';
import Settings from './components/Settings/Settings.jsx';
import Reader from './components/Reader/Reader.jsx';
import Builder from './components/Builder/Builder.jsx';
import Flashcard from './components/Flashcard/Flashcard.jsx';
import Vocabulary from './components/Vocabulary/Vocabulary.jsx';
import AppLayout from './components/shared/AppLayout.jsx';
import { useWordStore } from './store/useWordStore.js';
import { useProgressStore } from './store/useProgressStore.js';

function DashboardRoute() {
  return <Dashboard />;
}

function ReaderRoute() {
  const navigate = useNavigate();
  return <Reader onPractice={(selectedWords) => navigate('/practice', { state: { words: selectedWords } })} />;
}

function PracticeRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialWords = location.state?.words || [];
  const initialMode = location.state?.mode || 'assembly';

  return (
    <Builder
      key={`${initialMode}:${initialWords.map((word) => word.wordId || word.id).join(',')}`}
      initialWords={initialWords}
      initialMode={initialMode}
      onDone={() => navigate('/flashcards')}
    />
  );
}

export default function App() {
  const { words } = useWordStore();
  const { syncWordStatusTotals } = useProgressStore();
  const activeWords = words.filter((word) => ['ativa', 'dominada'].includes(word.status)).length;
  const masteredWords = words.filter((word) => word.status === 'dominada').length;

  useEffect(() => {
    syncWordStatusTotals({ activeWords, masteredWords });
  }, [activeWords, masteredWords, syncWordStatusTotals]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardRoute />} />
          <Route path="/reader" element={<ReaderRoute />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/practice" element={<PracticeRoute />} />
          <Route path="/flashcards" element={<Flashcard />} />
          <Route path="/evolution" element={<Evolution />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
