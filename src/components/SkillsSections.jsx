import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FaCode, FaServer, FaDatabase, FaTools } from "react-icons/fa";

const ICONS = {
  frontend: <FaCode />,
  backend: <FaServer />,
  database: <FaDatabase />,
  tools: <FaTools />,
};

// keep palette tight to your hero
const ACCENT_GRAD = "bg-gradient-to-r from-violet-500 to-fuchsia-500";
const CARD_SURFACE =
  "bg-[#0d1230]"; // deep indigo to blend with your header
const CARD_BORDER =
  "border border-white/10"; // very light border for definition

const CHIP =
  "bg-white/5 text-slate-200 ring-1 ring-white/10 hover:ring-white/20";

const SkillChip = memo(function SkillChip({ skill }) {
  return (
    <span className={`${CHIP} text-sm font-medium px-3 py-1 rounded-full`}>
      {skill.name}
    </span>
  );
});

const SkillCard = memo(function SkillCard({ category, label, list }) {
  return (
    <div
      className={`relative rounded-2xl ${CARD_SURFACE} ${CARD_BORDER} shadow-[0_4px_20px_rgba(0,0,0,0.25)] 
                  hover:shadow-[0_8px_28px_rgba(0,0,0,0.35)] transition-shadow`}
    >
     
      {/* subtle inner highlight line (not blur) */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-white/[0.04]" />

      <div className="p-6 pb-3">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${ACCENT_GRAD} text-white`}
          >
            {ICONS[category] ?? "✨"}
          </span>
          <h3 className="text-lg font-semibold text-slate-100">
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
      <h2 className="text-3xl font-bold mb-12 text-center text-white">
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
