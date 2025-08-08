import { useTranslation } from 'react-i18next';

function TimelineSection() {
  const { t } = useTranslation();
  const steps = t("timeline.steps", { returnObjects: true });

  return (
    <section
      id="timeline"
      className="py-20 px-6 md:px-20 bg-white dark:bg-transparent"
    >
      <h2 className="text-3xl font-bold mb-16 text-center text-gray-900 dark:text-white">
        {t("timeline.title")}
      </h2>

      <div className="relative border-l border-blue-300 dark:border-indigo-400/40 ml-4 md:ml-1 w-full px-6">
        {steps.map((step, index) => (
          <div key={index} className="mb-12 ml-6 w-full relative pr-20">
            
            <div className="absolute w-4 h-4 bg-blue-600 dark:bg-indigo-400 rounded-full left-[-1.5rem] top-1.5 animate-pulse border-4 border-white/90 dark:border-white/30 shadow-lg" />

           
            {step.logo && (
              <img
                src={step.logo}
                alt={`Logo de ${step.title}`}
                className="w-14 h-14 object-contain absolute right-6 top-0 bg-white/95 dark:bg-white/90 p-1 shadow rounded"
              />
            )}

            <time className="text-sm text-gray-500 dark:text-gray-300">{step.year}</time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{step.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TimelineSection;
