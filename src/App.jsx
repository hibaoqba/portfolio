import './App.css';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LoiCadrePage from './pages/LoiCadrePage';
import ExpenseTrackerPage from './pages/ExpenseTrackerPage';
import BookingAppPage from './pages/BookingAppPage';
import FleetAppPage from './pages/FleetAppPage';
import ScrollToTop from './components/ScrollToTop'; //

function RoutedHome() {
  const { lng } = useParams();
  const { i18n } = useTranslation();

  const lang = lng === 'fr' || lng === 'en' ? lng : null;

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
      document.documentElement.lang = lang;
    }
  }, [lang, i18n]);

  if (!lang) return <Navigate to="/fr" replace />;

  return (
    
    <Routes>
      <Route index element={<Home />} />
      <Route path="projects/loi-cadre" element={<LoiCadrePage />} />
      <Route path="projects/expense-tracker" element={<ExpenseTrackerPage />} />
      <Route path="projects/booking-app" element={<BookingAppPage />} />
      <Route path="projects/fleet-app" element={<FleetAppPage />} />
      <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
    </Routes>
  );
}


export default function App() {
  return (
    <div className="font-sans">
      <NavBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/fr" replace />} />
        <Route path="/:lng/*" element={<RoutedHome />} />
        <Route path="*" element={<Navigate to="/fr" replace />} />
      </Routes>
    </div>
  );
}
