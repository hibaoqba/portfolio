import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import ReactCountryFlag from "react-country-flag";

// Mobile-specific NavItem Component (More block-like for better tap target)
function MobileNavItem({ to, children, isActive, onClick }) {
    return (
        <HashLink
            smooth
            to={to}
            onClick={onClick}
            className={`block px-4 py-3 text-base font-semibold rounded-lg transition-colors duration-200 
                        ${isActive 
                            ? "bg-brand-300/10 text-brand-950 dark:bg-brand-700/20 dark:text-white" 
                            : "text-brand-900 hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-brand-900"
                        } 
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 w-full text-left`}
            aria-current={isActive ? "page" : undefined}
        >
            {children}
        </HashLink>
    );
}

// Re-using the desktop NavItem for consistency
function NavItem({ to, children, isActive, onClick }) {
    return (
        <HashLink
            smooth
            to={to}
            onClick={onClick}
            className="group relative block px-3 py-2 font-medium text-brand-900 hover:text-brand-900 dark:text-brand-600 dark:hover:text-white rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 transition-colors"
            aria-current={isActive ? "page" : undefined}
        >
            <span className="inline-block">{children}</span>
            <span
                className={`pointer-events-none absolute left-3 right-3 -bottom-0.5 h-0.5 origin-left bg-brand-300 dark:bg-brand-400 transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0"} group-hover:scale-x-100`}
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

    // --- Original Effects (Kept for functionality) ---

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
                if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false);
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

    // --- Rendering ---

    return (
        <nav
            className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 border-b border-brand-50 shadow-sm dark:bg-brand-950/80 dark:supports-[backdrop-filter]:bg-brand-950/70 dark:border-brand-900"
            role="navigation"
            aria-label="Main"
        >
            {/* --- Desktop/Main Header --- */}
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <HashLink smooth to={`${prefix}#home`} className="flex items-center gap-2">
                    <img src="/hiba_logo.png" alt="Hiba Oqba logo" className="h-10 w-10 object-contain dark:brightness-95" />
                    <span className="text-xl font-bold text-brand-950 dark:text-white">Hiba Oqba</span>
                </HashLink>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6">
                    {links.map(l => (
                        <NavItem key={l.id} to={l.to} isActive={activeSection === `#${l.id}`}>{l.label}</NavItem>
                    ))}
                </div>

                {/* Language Toggle and Mobile Menu Button */}
                <div className="flex items-center gap-3">
                    {/* Reusable Flag Toggle */}
                    <button
                        onClick={toggleLang}
                        title="Switch language"
                        className="relative flex items-center rounded-full w-20 h-8 overflow-hidden bg-brand-50 hover:bg-brand-400/20 dark:bg-brand-900 dark:hover:bg-brand-900/80 transition"
                        aria-label="Toggle language"
                    >
                        <span
                            className={`absolute top-1 left-1 w-8 h-6 rounded-full shadow z-10 flex items-center justify-center text-xs font-bold bg-white text-brand-950 dark:bg-brand-950 dark:text-brand-50 transition-transform duration-300 ${i18n.language === "fr" ? "translate-x-0" : "translate-x-10"}`}
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

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsOpen(v => !v)}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:text-white"
                        title="Toggle menu"
                    >
                        <svg className={`w-6 h-6 transition-transform ${isOpen ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* --- Mobile Menu Content --- */}
            <div
                id="mobile-menu"
                ref={menuRef}
                className={`md:hidden fixed inset-x-4 top-[58px] z-40 transform-gpu transition-all duration-300 
                            ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 pointer-events-none invisible"}`}
                aria-hidden={!isOpen}
            >
                <div className="rounded-xl bg-white dark:bg-brand-950 border border-gray-200 dark:border-brand-900 shadow-xl overflow-hidden">
                    
                    {/* Cleaned-up Header (Language Toggle & Close Button) */}
                    <div className="px-4 py-3 flex items-center justify-end border-b border-gray-100 dark:border-brand-900/50">
                        {/* Re-using the flag toggle style for better UX */}
                        <button
                            onClick={toggleLang}
                            title="Switch language"
                            className="relative flex items-center rounded-full w-20 h-8 overflow-hidden bg-brand-50 hover:bg-brand-400/20 dark:bg-brand-900 dark:hover:bg-brand-900/80 transition mr-4"
                            aria-label="Toggle language"
                        >
                            <span
                                className={`absolute top-1 left-1 w-8 h-6 rounded-full shadow z-10 flex items-center justify-center text-xs font-bold bg-white text-brand-950 dark:bg-brand-950 dark:text-brand-50 transition-transform duration-300 ${i18n.language === "fr" ? "translate-x-0" : "translate-x-10"}`}
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
                        
                        <button onClick={() => setIsOpen(false)} aria-label="Close menu" className="p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:text-white">
                             {/* Close Icon */}
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="p-2 space-y-1" aria-label="Mobile">
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

                    {/* Call to Action (CTA) */}
                    <div className="p-4 border-t border-gray-100 dark:border-brand-900/50">
                        <a
                            href="/your-resume.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-violetTech hover:bg-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-violetTech focus-visible:ring-offset-2 transition duration-150 ease-in-out"
                            onClick={() => setIsOpen(false)} // Close menu on click
                        >
                            {t("navbar.download_cv")} 
                            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 12.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v9a1 1 0 11-2 0V3a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;