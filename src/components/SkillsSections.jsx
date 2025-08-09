import { useTranslation } from "react-i18next";
import { FaCode, FaServer, FaDatabase, FaTools } from "react-icons/fa";

function SkillsSection() {
  const { t } = useTranslation();
  const skills = t("skills", { returnObjects: true });

  const icons = {
    frontend: <FaCode />,
    backend: <FaServer />,
    database: <FaDatabase />,
    tools: <FaTools />,
  };

  const chipThemes = [
    "bg-purple-500/10 text-purple-800 ring-1 ring-purple-500/20",
    "bg-purple-500/10 text-purple-800 ring-1 ring-purple-500/20",
  ];

  return (
    <section id="skills" className="py-20 px-6 md:px-20">
      <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
        {t("skillsTitle")}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category} className="group relative rounded-2xl">
            <div
              className="rounded-2xl p-[1px] 
              bg-gradient-to-tr from-purple-500/40 via-indigo-400/30 to-purple-300/40
              dark:p-[1px] dark:bg-gradient-to-tr dark:from-purple-500/20 dark:via-indigo-400/15 dark:to-purple-300/20"
            >
              <div
                className="relative rounded-[1rem] bg-white/95 backdrop-blur-sm border border-transparent shadow-sm 
                dark:bg-transparent dark:backdrop-blur-sm dark:border-white/5"
              >
                <div className="p-6 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full 
                      bg-gradient-to-br from-purple-600 to-indigo-500 text-white text-sm shadow-sm 
                      dark:bg-white/10 text-lg">
                      {icons[category] ?? "✨"}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-indigo-200">
                      {t(`skillCategories.${category}`)}
                    </h3>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex flex-wrap gap-2">
                  {skillList.map((skill, i) => {
                    const theme = chipThemes[i % chipThemes.length];
                    return (
                      <span
                        key={i}
                        className={`${theme} dark:bg-purple-500/20 dark:text-purple-100 dark:ring-purple-400/30 
                          text-sm font-medium px-3 py-1 rounded-full shadow-sm 
                          flex items-center justify-center gap-1 
                          transition-transform duration-200 group-hover:translate-y-[-1px]`}
                      >
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
