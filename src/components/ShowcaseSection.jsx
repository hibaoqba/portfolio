import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Code, BadgeCheck, Layers } from "lucide-react";
import Projects from "./Projects";
import Certifications from "./Certification";
import TechStack from "./TechStack";

function ShowcaseSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("projects");

  const tabs = [
    { id: "projects",        label: t("portfolio.tabs.projects"),        icon: <Code size={18} /> },
    { id: "certifications",  label: t("portfolio.tabs.certifications"),  icon: <BadgeCheck size={18} /> },
    { id: "stacks",          label: t("portfolio.tabs.stacks"),          icon: <Layers size={18} /> }
  ];

  return (
    <section
      id="showcase"
      className="py-20 px-6 md:px-20 bg-white dark:bg-transparent"
    >
      <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
        {t("portfolio.title")}
      </h2>

      {/* Tabs */}
      <div className="flex justify-center flex-wrap gap-4 mb-10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={[
                "flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium transition shadow-sm",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60",
                isActive
                  ? "bg-purple-600 text-white shadow-md dark:bg-purple-500/90"
                  : "bg-gray-100 text-purple-700 hover:bg-purple-100 dark:bg-white/10 dark:text-purple-100 dark:hover:bg-white/15 dark:border dark:border-white/10"
              ].join(" ")}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content area */}
      <div className="transition-all duration-300">
        {activeTab === "projects" && <Projects />}
        {activeTab === "certifications" && <Certifications />}
        {activeTab === "stacks" && <TechStack />}
      </div>
    </section>
  );
}

export default ShowcaseSection;
