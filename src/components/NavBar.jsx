import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import ReactCountryFlag from "react-country-flag";
import ThemeToggle from "./ThemeToggle";

function NavItem({ to, children, isActive }) {
  return (
    <HashLink
      smooth
      to={to}
      className="group relative px-2 py-1 font-medium
                 text-brand-700 hover:text-brand-900
                 dark:text-brand-400 dark:hover:text-white
                 rounded focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-brand-400
                 transition-colors"
      aria-current={isActive ? "page" : undefined}
    >
      <span>{children}</span>
      <span
        className={`pointer-events-none absolute left-2 right-2 -bottom-0.5 h-0.5
                    origin-left bg-brand-700 dark:bg-brand-400
                    transition-transform duration-300
                    ${isActive ? "scale-x-100" : "scale-x-0"} group-hover:scale-x-100`}
      />
    </HashLink>
  );
}

function NavBar() {
  const { t, i18n } = useTranslation();
  const { hash, pathname } = useLocation();
  const activeHash = pathname === "/" ? (hash || "#home") : hash;

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "fr" ? "en" : "fr");
  };

  return (
    <nav
      className="fixed top-0 left-0 z-50 w-full
                 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70
                 border-b border-brand-50 shadow-sm
                 dark:bg-brand-950/80 dark:supports-[backdrop-filter]:bg-brand-950/70
                 dark:border-brand-900"
      role="navigation"
      aria-label="Main"
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <img
            src="/hiba_logo.png"
            alt="Hiba Oqba logo"
            className="h-10 w-10 object-contain dark:brightness-95"
          />
          <span className="text-xl font-bold text-brand-950 dark:text-white">
            Hiba Oqba
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavItem to="/#home"       isActive={activeHash === "#home"}>{t("navbar.home")}</NavItem>
          <NavItem to="/#about"      isActive={activeHash === "#about"}>{t("navbar.about")}</NavItem>
          <NavItem to="/#experience" isActive={activeHash === "#experience"}>{t("navbar.experience")}</NavItem>
          <NavItem to="/#showcase"   isActive={activeHash === "#showcase"}>{t("navbar.projects")}</NavItem>
          <NavItem to="/#contact"    isActive={activeHash === "#contact"}>{t("navbar.contact")}</NavItem>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            title="Switch language"
            className="relative flex items-center rounded-full w-20 h-8 overflow-hidden
                       bg-brand-50 hover:bg-brand-400/20
                       dark:bg-brand-900 dark:hover:bg-brand-900/80
                       transition"
            aria-label="Toggle language"
          >
            {/* Sliding thumb */}
            <span
              className={`absolute top-1 left-1 w-8 h-6 rounded-full shadow z-10
                          flex items-center justify-center text-xs font-bold
                          bg-white text-brand-950
                          dark:bg-brand-950 dark:text-brand-50
                          transition-transform duration-300
                          ${i18n.language === "fr" ? "translate-x-0" : "translate-x-10"}`}
            >
              {i18n.language === "fr" ? "FR" : "EN"}
            </span>

            {/* Flags */}
            <span
              className={`absolute left-2 flex items-center transition-opacity
                          ${i18n.language === "fr" ? "opacity-100" : "opacity-100"}`}
              aria-hidden="true"
            >
              <ReactCountryFlag countryCode="FR" svg style={{ fontSize: "1rem" }} />
            </span>
            <span
              className={`absolute right-2 flex items-center transition-opacity
                          ${i18n.language === "fr" ? "opacity-100" : "opacity-100"}`}
              aria-hidden="true"
            >
              <ReactCountryFlag countryCode="GB" svg style={{ fontSize: "1rem" }} />
            </span>
          </button>

          
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
