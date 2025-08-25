import React from "react";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import HeroPattern from "./HeroPattern";
import ScrollIndicator from "./ScrollIndicator";
import { FaChevronDown } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col items-center justify-center pt-16 overflow-hidden text-gray-900 dark:text-white dark:bg-[#070F2B]"
    >
      <HeroPattern variant="tri-classic" />

      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-4">{t("home.title")}</h1>
        <p className="text-xl mb-6">{t("home.subtitle")}</p>

       <div className="mt-8 flex items-center justify-center gap-4">
  <a
  href={t("home.cv-file")}
  target="_blank"
  rel="noreferrer"
  className="inline-flex items-center justify-center gap-2 px-6 py-3 
             font-semibold text-white bg-violetTech
             rounded-lg shadow-md
             transition transform hover:-translate-y-0.5 hover:shadow-lg
             focus:outline-none focus-visible:ring-2 focus-visible:ring-violetTech/70"
>
  {t("home.cv")}
  <FaExternalLinkAlt className="text-sm " />
</a>

  <a
    href="#showcase"
    className="inline-flex items-center justify-center px-6 py-3 
               font-semibold text-violetTech dark:text-violet-300
               bg-transparent border border-violetTech/70 dark:border-violet-300/50
               rounded-lg shadow-sm
               transition transform hover:-translate-y-0.5 hover:shadow-md
               hover:bg-violetTech/10 dark:hover:bg-violet-300/10
               focus:outline-none focus-visible:ring-2 focus-visible:ring-violetTech/70"
  >
    {t("portfolio.tabs.projects")}
  </a>
</div>

      </div>

      <div className="hidden md:flex flex-col gap-4 items-center fixed left-6 top-1/2 -translate-y-1/2 z-20">
        <a
          href={t("contact.links.linkedin")}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="p-3 rounded-full bg-white/80 dark:bg-white/10 shadow hover:shadow-lg transition hover:-translate-y-0.5 text-slate-800 dark:text-white ring-1 ring-slate-200 dark:ring-white/20"
        >
          <FaLinkedin className="text-xl" />
        </a>
        <a
          href={t("contact.links.github")}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="p-3 rounded-full bg-white/80 dark:bg-white/10 shadow hover:shadow-lg transition hover:-translate-y-0.5 text-slate-800 dark:text-white ring-1 ring-slate-200 dark:ring-white/20"
        >
          <FaGithub className="text-xl" />
        </a>
      </div>

      <ScrollIndicator target="#showcase" />

      <div
        className="pointer-events-none absolute -bottom-[2px] -left-[2px] -right-[2px] h-44
                   bg-gradient-to-b from-transparent
                   to-[var(--bg0)] dark:to-[var(--bg0)]"
        aria-hidden="true"
      />
    </section>
  );
}

export default Hero;
