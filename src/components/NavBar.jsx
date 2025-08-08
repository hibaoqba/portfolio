import React, { useEffect, useState } from "react";
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
                 text-brand-900 hover:text-brand-900
                 dark:text-brand-600 dark:hover:text-white
                 rounded focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-brand-400
                 transition-colors"
      aria-current={isActive ? "page" : undefined}
    >
      <span>{children}</span>
      <span
        className={`pointer-events-none absolute left-2 right-2 -bottom-0.5 h-0.5
                    origin-left bg-brand-300 dark:bg-brand-400
                    transition-transform duration-300
                    ${isActive ? "scale-x-100" : "scale-x-0"} group-hover:scale-x-100`}
      />
    </HashLink>
  );
}

function NavBar() {
  const { t, i18n } = useTranslation();
  const { hash, pathname } = useLocation();

  const sectionIds = ["home", "about", "experience", "showcase", "contact"];

  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const initial = pathname === "/" ? (hash || "#home") : (hash || "#home");
    setActiveSection(initial);
  }, [hash, pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []); 

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

        <div className="hidden md:flex items-center gap-6">
          <NavItem to="/#home"       isActive={activeSection === "#home"}>{t("navbar.home")}</NavItem>
          <NavItem to="/#about"      isActive={activeSection === "#about"}>{t("navbar.about")}</NavItem>
          <NavItem to="/#experience" isActive={activeSection === "#experience"}>{t("navbar.experience")}</NavItem>
          <NavItem to="/#showcase"   isActive={activeSection === "#showcase"}>{t("navbar.projects")}</NavItem>
          <NavItem to="/#contact"    isActive={activeSection === "#contact"}>{t("navbar.contact")}</NavItem>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            title="Switch language"
            className="relative flex items-center rounded-full w-20 h-8 overflow-hidden
                       bg-brand-50 hover:bg-brand-400/20
                       dark:bg-brand-900 dark:hover:bg-brand-900/80
                       transition"
            aria-label="Toggle language"
          >
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

            <span className="absolute left-2 flex items-center" aria-hidden="true">
              <ReactCountryFlag countryCode="FR" svg style={{ fontSize: "1rem" }} />
            </span>
            <span className="absolute right-2 flex items-center" aria-hidden="true">
              <ReactCountryFlag countryCode="GB" svg style={{ fontSize: "1rem" }} />
            </span>
          </button>

        </div>
      </div>
    </nav>
  );
}

export default NavBar;
