import './App.css';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function RoutedHome() {
  const { lng } = useParams();
  const { i18n } = useTranslation();

  const lang = lng === 'fr' || lng === 'en' ? lng : null;

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  if (!lang) return <Navigate to="/fr" replace />;
  return <Home />;
}

export default function App() {
  return (
    <div className="font-sans">
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/fr" replace />} />
        <Route path="/:lng" element={<RoutedHome />} />
        <Route path="*" element={<Navigate to="/fr" replace />} />
      </Routes>
    </div>
  );
}
