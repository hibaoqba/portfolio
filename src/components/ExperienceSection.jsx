import { useTranslation } from 'react-i18next';

function ExperienceSection() {
  const { t } = useTranslation();
  const steps = t("experience.steps", { returnObjects: true });

  return (
    <section id="experience" className="py-20 px-6 md:px-20 bg-white">
      <h2 className="text-3xl font-bold mb-16 text-center text-gray-900">
        {t("experience.title")}
      </h2>

      <div className="grid gap-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-6 border border-gray-200 bg-white rounded-xl shadow-sm hover:shadow-lg hover:shadow-purple-200/40 transition"
          >
            <div className="mb-2 text-sm text-gray-500">
              {step.year} — {step.location}
            </div>
            <h3 className="text-lg font-semibold text-black-700 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              {step.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {step.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;
