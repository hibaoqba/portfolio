import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { 
  FaCode, FaLaptopCode, FaServer, FaDatabase, 
  FaTools, FaVial, FaUsers 
} from "react-icons/fa";

const ICONS = {
  languages: <FaCode />,
  frontend: <FaLaptopCode />,
  backend: <FaServer />,
  database: <FaDatabase />,
  devops: <FaTools />,
  testing: <FaVial />,
  collaboration: <FaUsers />,
};

const ACCENT_GRAD = "bg-gradient-to-r from-violet-500 to-fuchsia-500";
const CARD_SURFACE = "bg-white dark:bg-[#0d1230]";
const CARD_BORDER = "border border-slate-200 dark:border-white/10";

const SkillChip = memo(function SkillChip({ skill }) {
  return (
    <div
      className="px-3 py-1 text-sm font-medium rounded-full
                 bg-slate-100 text-slate-700
                 ring-1 ring-slate-200 
                 hover:ring-violet-400 dark:hover:ring-fuchsia-400
                 transition
                 dark:bg-slate-800/40 dark:text-slate-200 dark:ring-white/10"
    >
      {skill.name}
    </div>
  );
});

const SkillCard = memo(function SkillCard({ category, label, list }) {
  return (
    <div
      className={`relative rounded-2xl ${CARD_SURFACE} ${CARD_BORDER}
      shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)]
      hover:shadow-[0_0_10px_2px_rgba(168,85,247,0.4)] 
      dark:hover:shadow-[0_0_10px_2px_rgba(232,121,249,0.3)]
      transition-shadow duration-300`}
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-black/[0.02] dark:ring-white/[0.04]" />
      <div className="p-6 pb-3">
        <div className="flex items-center gap-3">
          <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${ACCENT_GRAD} text-white`}>
            {ICONS[category] ?? "✨"}
          </span>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {label}
          </h3>
        </div>
      </div>
      <div className="px-6 pb-6 pt-2 flex flex-wrap gap-2">
        {list.map((skill, i) => (
          <SkillChip key={skill.name || i} skill={skill} />
        ))}
      </div>
    </div>
  );
});

function SkillsSection() {
  const { t, i18n } = useTranslation();
  const skillsTitle = t("skillsTitle");
  const skills = useMemo(() => t("skills", { returnObjects: true }) || {}, [t, i18n.language]);

  const categories = useMemo(
    () =>
      Object.entries(skills).map(([category, list]) => ({
        category,
        label: t(`skillCategories.${category}`),
        list: Array.isArray(list) ? list : [],
      })),
    [skills, t]
  );

  return (
    <section id="skills" className="py-20 px-6 md:px-20 bg-transparent">
      <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">
        {skillsTitle}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(({ category, label, list }) => (
          <SkillCard key={category} category={category} label={label} list={list} />
        ))}
      </div>
    </section>
  );
}

export default memo(SkillsSection);
