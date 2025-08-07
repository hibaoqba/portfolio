import { useTranslation } from "react-i18next";


function SkillsSection() {
  const { t } = useTranslation();
  const skills = t("skills", { returnObjects: true });

  return (
    <section id="skills" className="py-20 px-6 md:px-20 bg-white">
      <h2 className="text-3xl font-bold mb-12 text-center text-black-600">
        {t("skillsTitle")}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skills).map(([category, skillList]) => (
          <div
            key={category}
            className="bg-white border border-gray-200 rounded-2xl shadow p-6 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-4">
              {t(`skillCategories.${category}`)}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skillList.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm"
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


