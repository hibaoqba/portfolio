import React from "react";
import { useTranslation } from "react-i18next";
import HeroPattern from "./HeroPattern"; 
import ScrollIndicator from "./ScrollIndicator"; 
function Hero() {
  const { t } = useTranslation();
  return (
    
    <section
      id="home"
      className="relative h-screen flex flex-col dark:bg-[#070F2B] items-center justify-center pt-16 overflow-hidden text-gray-900 dark:text-white"
    >
<HeroPattern variant="tri-classic" />

      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-4">{t("home.title")}</h1>
        <p className="text-xl mb-6">{t("home.subtitle")}</p>
  
    <a
  href={t("home.cv-file")}
  download
  className="bg-violetTech dark:bg-brand-200 text-white px-6 py-2 rounded shadow
             transform transition duration-300
             hover:-translate-y-1 hover:shadow-md"
>
  {t("home.cv")}
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
