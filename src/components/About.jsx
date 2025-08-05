// src/pages/About.jsx
import { useTranslation } from 'react-i18next';

function About({ id }) {
  const { t } = useTranslation();

  return (
    <section id={id} className="py-20 px-6 md:px-20 bg-white">
      <h2 className="text-3xl font-bold mb-4 text-black-600">{t('about.title')}</h2>
      <p className="text-gray-700 max-w-3xl">{t('about.description')}</p>
    </section>
  );
}


export default About;
