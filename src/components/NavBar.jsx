import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import ReactCountryFlag from "react-country-flag";

// Composante pour les liens du menu mobile
function MobileNavItem({ to, children, isActive, onClick }) {
    return (
        <HashLink
            smooth
            to={to}
            onClick={onClick}
            className={`block px-4 py-3 text-base font-semibold rounded-lg transition-colors duration-200 
                        ${isActive 
                            // État Actif: Gris très clair pour une touche subtile
                            ? "bg-gray-100/70 text-gray-900 dark:bg-gray-800/70 dark:text-white" 
                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900"
                        } 
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 w-full text-left`}
            aria-current={isActive ? "page" : undefined}
        >
            {children}
        </HashLink>
    );
}

// Composante pour les liens du menu desktop
function NavItem({ to, children, isActive, onClick }) {
    return (
        <HashLink
            smooth
            to={to}
            onClick={onClick}
            className="group relative block px-3 py-2 font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 transition-colors"
            aria-current={isActive ? "page" : undefined}
        >
            <span className="inline-block">{children}</span>
            <span
                className={`pointer-events-none absolute left-3 right-3 -bottom-0.5 h-0.5 origin-left bg-gray-500 dark:bg-gray-300 transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0"} group-hover:scale-x-100`}
            />
        </HashLink>
    );
}

function NavBar() {
    const { t, i18n } = useTranslation();
    const { hash, pathname } = useLocation();
    const navigate = useNavigate();
    const sectionIds = ["home", "about", "experience", "showcase", "contact"];
    const [activeSection, setActiveSection] = useState("#home");
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const firstLinkRef = useRef(null);
    const prefix = `/${i18n.language}`;

    // --- Hooks et Logique (inchangés) ---

    useEffect(() => {
        if (hash) setActiveSection(hash);
    }, [hash, pathname, i18n.language]);
    
    useEffect(() => {
        let io = null;
        let raf = null;
        const setup = () => {
            const els = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
            if (els.length === 0) {
                raf = requestAnimationFrame(setup);
                return;
            }
            io = new IntersectionObserver((entries) => {
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
                if (visible?.target?.id) setActiveSection(`#${visible.target.id}`);
            }, { root: null, rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });
            els.forEach(el => io.observe(el));
            requestAnimationFrame(() => window.dispatchEvent(new Event('scroll')));
        };
        setup();
        return () => {
            if (io) io.disconnect();
            if (raf) cancelAnimationFrame(raf);
        };
    }, [pathname, i18n.language]);

    useEffect(() => {
        if (isOpen) {
            const onKey = (e) => {
                if (e.key === "Escape") setIsOpen(false);
            };
            const onClickOutside = (e) => {
                // S'assurer que le clic n'est pas sur le menu ET pas sur le bouton toggle lui-même
                const toggleButton = document.querySelector('[aria-controls="mobile-menu"]');
                if (menuRef.current && !menuRef.current.contains(e.target) && !toggleButton.contains(e.target)) {
                    setIsOpen(false);
                }
            };
            window.addEventListener("keydown", onKey);
            window.addEventListener("pointerdown", onClickOutside);
            return () => {
                window.removeEventListener("keydown", onKey);
                window.removeEventListener("pointerdown", onClickOutside);
            };
        }
    }, [isOpen]);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname, hash, i18n.language]);

    useEffect(() => {
        if (isOpen && firstLinkRef.current) firstLinkRef.current.focus();
    }, [isOpen]);

    const toggleLang = () => {
        const newLang = i18n.language === "fr" ? "en" : "fr";
        i18n.changeLanguage(newLang);
        document.documentElement.lang = newLang;
        const langRE = /^\/(fr|en)(?=\/|$)/;
        const suffix = pathname.replace(langRE, "");
        const target = `/${newLang}${suffix}${hash || ""}`;
        navigate(target, { replace: true, preventScrollReset: true });
    };

    const links = [
        { id: "home", to: `${prefix}#home`, label: t("navbar.home") },
        { id: "about", to: `${prefix}#about`, label: t("navbar.about") },
        { id: "experience", to: `${prefix}#experience`, label: t("navbar.experience") },
        { id: "showcase", to: `${prefix}#showcase`, label: t("navbar.projects") },
        { id: "contact", to: `${prefix}#contact`, label: t("navbar.contact") },
    ];


    return (
        <nav
            // Fond de la barre de navigation : plus clair (plus d'opacité en mode clair, moins d'opacité en mode sombre)
            className="fixed top-0 left-0 z-50 w-full bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/90 border-b border-gray-100 shadow-sm dark:bg-gray-900/60 dark:supports-[backdrop-filter]:bg-gray-900/60 dark:border-gray-800"
            role="navigation"
            aria-label="Main"
        >
            {/* --- En-tête Principal (Desktop & Mobile) --- */}
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <HashLink smooth to={`${prefix}#home`} className="flex items-center gap-2">
                    <img src="/hiba_logo.png" alt="Hiba Oqba logo" className="h-10 w-10 object-contain dark:brightness-95" />
                    <span className="text-xl font-bold text-gray-950 dark:text-white">Hiba Oqba</span>
                </HashLink>

                {/* Liens Desktop */}
                <div className="hidden md:flex items-center gap-6">
                    {links.map(l => (
                        <NavItem key={l.id} to={l.to} isActive={activeSection === `#${l.id}`}>{l.label}</NavItem>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    {/* Bouton Hamburger Mobile (Change en icône de menu vertical pour fermer) */}
                    <button
                        onClick={() => setIsOpen(v => !v)}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:text-white text-gray-950"
                        title={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            {isOpen ? (
                                // Icône de menu vertical (trois barres verticales) pour la fermeture
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01" />
                            ) : (
                                // Icône Hamburger pour l'ouverture
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* --- Contenu du Menu Mobile --- */}
            <div
                id="mobile-menu"
                ref={menuRef}
                className={`md:hidden fixed inset-x-4 top-[58px] z-40 transform-gpu transition-all duration-300 
                            ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 pointer-events-none invisible"}`}
                aria-hidden={!isOpen}
            >
                {/* Fond du menu : plus clair (plus d'opacité en mode clair, moins d'opacité en mode sombre) */}
                <div className="rounded-xl bg-white/95 dark:bg-gray-950/95 border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">
                    
                    {/* Navigation Links */}
                    <nav className="p-2 space-y-1 pt-4" aria-label="Mobile">
                        {links.map((l, i) => (
                            <MobileNavItem
                                key={l.id}
                                to={l.to}
                                isActive={activeSection === `#${l.id}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <span ref={i === 0 ? firstLinkRef : null} className="text-base">{l.label}</span>
                            </MobileNavItem>
                        ))}
                    </nav>

                    {/* Sélecteur de Langue (Placé en bas du menu) */}
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-center">
                        <button
                            onClick={toggleLang}
                            title="Switch language"
                            className="relative flex items-center rounded-full w-24 h-9 overflow-hidden bg-gray-100 hover:bg-gray-200/80 dark:bg-gray-800 dark:hover:bg-gray-700/80 transition"
                            aria-label="Toggle language"
                        >
                            <span
                                className={`absolute top-1 left-1 w-11 h-7 rounded-full shadow z-10 flex items-center justify-center text-sm font-bold bg-white text-gray-950 dark:bg-gray-900 dark:text-gray-50 transition-transform duration-300 ${i18n.language === "fr" ? "translate-x-0" : "translate-x-12"}`}
                            >
                                {i18n.language === "fr" ? "FR" : "EN"}
                            </span>
                            <span className="absolute left-2 flex items-center" aria-hidden="true">
                                <ReactCountryFlag countryCode="FR" svg style={{ fontSize: "1.2rem" }} />
                            </span>
                            <span className="absolute right-2 flex items-center" aria-hidden="true">
                                <ReactCountryFlag countryCode="GB" svg style={{ fontSize: "1.2rem" }} />
                            </span>
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default NavBar;