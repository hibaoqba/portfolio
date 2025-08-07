import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Code, BadgeCheck, Layers } from "lucide-react";
import Certifications from "./Certification";
import TechStack from "./TechStack"; 
function ShowcaseSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("projects");

  const tabs = [
    {
      id: "projects",
      label: t("portfolio.tabs.projects"),
      icon: <Code size={18} />
    },
    {
      id: "certifications",
      label: t("portfolio.tabs.certifications"),
      icon: <BadgeCheck size={18} />
    },
    {
      id: "stacks",
      label: t("portfolio.tabs.stacks"),
      icon: <Layers size={18} />
    }
  ];

  return (
    <section id="showcase" className="py-20 px-6 md:px-20 bg-gray-50">
      <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
        {t("portfolio.title")}
      </h2>

      {/* Tabs */}
      <div className="flex justify-center flex-wrap gap-4 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl shadow-sm transition text-sm font-medium ${
              activeTab === tab.id
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-100 text-purple-700 hover:bg-purple-100"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="transition-all duration-300">
        {activeTab === "projects" && (
          <div className="text-center text-gray-600 italic">[ Tes projets ici ]</div>
        )}
        {activeTab === "certifications" && (
          <Certifications />
        )}
        {activeTab === "stacks" && (
          <TechStack />
        )}
      </div>
    </section>
  );
}

export default ShowcaseSection;
