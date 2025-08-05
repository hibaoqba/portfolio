import React from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

function Hero() {
  const { t, i18n } = useTranslation();

  return (
    <section
  id="home"
  className="h-screen flex flex-col items-center justify-center pt-16 relative overflow-hidden text-gray-900 bg-gray-100"
>
  {/* Motif SVG triangulaire */}
  <svg
    className="absolute inset-0 w-full h-full opacity-20 z-0"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <pattern
        id="triangles"
        width="60"
        height="52"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M30 0 L60 52 L0 52 Z"
          fill="none"
          stroke="#999999"
          strokeWidth="0.6"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#triangles)" />
  </svg>

  {/* Contenu du Hero */}
  <div className="relative z-10 text-center">
    <h1 className="text-5xl font-bold mb-4">{t('home.title')}</h1>
    <p className="text-xl mb-6">{t('home.subtitle')}</p>
    <a
      href={t('home.cv-file')}
      download
      className="bg-violetTech text-white px-6 py-2 rounded shadow hover:-translate-y-[3px] transition-all duration-500 hover:bg-violetTechHover"
    >
      {t('home.cv')}
    </a>
  </div>
</section>

  );
}

export default Hero;
