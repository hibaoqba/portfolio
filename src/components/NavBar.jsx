import react from "react";
import { useTranslation } from 'react-i18next';
import i18next from "i18next";
import { HashLink } from 'react-router-hash-link';
function NavBar() {
      const { t, i18n } = useTranslation();
    return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#home" className="flex items-center space-x-2">
          <img src="/hiba_logo.png" alt="Logo" className="h-10 w-10 object-contain" />
          <span className="text-xl font-bold text-black-600">Hiba Oqba</span>
        </a>
          <div className="space-x-6 hidden md:flex">
            <HashLink smooth to="/#home">{t('navbar.home')}</HashLink>
            <HashLink smooth to="/#about">{t('navbar.about')}</HashLink>
            <HashLink smooth to="/#experience">{t('navbar.experience')}</HashLink>
            <HashLink smooth to="/#showcase">{t('navbar.projects')}</HashLink>
            <HashLink smooth to="/#contact">{t('navbar.contact')}</HashLink>
          </div>
          <button onClick={() => i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')} className="text-sm text-blue-600 underline">
            {i18n.language === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>
      </nav>
    );
}
export default NavBar;