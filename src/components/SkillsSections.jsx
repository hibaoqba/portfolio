import { useTranslation } from "react-i18next";

function SkillsSection() {
  const { t } = useTranslation();
  const skills = t("skills", { returnObjects: true });

  return (
    <section
      id="skills"
      className="py-20 px-6 md:px-20 bg-white dark:bg-transparent"
    >
      <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
        {t("skillsTitle")}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skills).map(([category, skillList]) => (
          <div
            key={category}
            className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl shadow p-6 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-blue-600 dark:text-indigo-200 mb-4">
              {t(`skillCategories.${category}`)}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skillList.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 dark:bg-indigo-400/20 dark:text-indigo-100 border border-transparent dark:border-indigo-400/30 text-sm font-medium px-3 py-1 rounded-full shadow-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
