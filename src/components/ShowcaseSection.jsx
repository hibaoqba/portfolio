import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Code, BadgeCheck, Layers } from 'lucide-react';
import Projects from './Projects';
import Certifications from './Certification';
import TechStack from './TechStack';

function ShowcaseSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('projects');

  const tabs = [
    { id: 'projects',       label: t('portfolio.tabs.projects'),       icon: <Code size={18} /> },
    { id: 'certifications', label: t('portfolio.tabs.certifications'), icon: <BadgeCheck size={18} /> },
    { id: 'stacks',         label: t('portfolio.tabs.stacks'),         icon: <Layers size={18} /> },
  ];

  const activeIndex = tabs.findIndex(t => t.id === activeTab);

  const handleKeyDown = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const next = (activeIndex + dir + tabs.length) % tabs.length;
    setActiveTab(tabs[next].id);
  };

  return (
    <section id="showcase" className="py-20 px-6 md:px-20 bg-white dark:bg-transparent">
      <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
        {t('portfolio.title')}
      </h2>

      {/* Tabs centered, no outer frames */}
      <div className="mx-auto max-w-5xl mb-10">
        <div
          role="tablist"
          aria-label={t('portfolio.title')}
          className="flex justify-center flex-wrap gap-3 p-1"
          onKeyDown={handleKeyDown}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'group relative inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/70',
                  isActive
                    ? 'text-white bg-gradient-to-r from-fuchsia-600 to-violet-600 shadow-[0_12px_40px_-16px_rgba(217,70,239,0.45)]'
                    : 'text-violet-800 dark:text-fuchsia-100 bg-transparent hover:bg-black/[0.03] dark:hover:bg-white/10'
                ].join(' ')}
              >
                {/* subtle glow for active only (not a frame) */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-xl blur-md transition-opacity duration-300 pointer-events-none ${
                    isActive ? 'opacity-30 bg-fuchsia-500/40' : 'opacity-0'
                  }`}
                />
                <span className="relative inline-flex items-center gap-2">
                  {tab.icon}
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content — no frames around the panel */}
      <div className="mx-auto max-w-6xl" role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        {activeTab === 'projects' && <Projects />}
        {activeTab === 'certifications' && <Certifications />}
        {activeTab === 'stacks' && <TechStack />}
      </div>
    </section>
  );
}

export default ShowcaseSection;
