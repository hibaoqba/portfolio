import { HashLink } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';
import { FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

function Projects() {

  const { t, i18n } = useTranslation();
  const lang = i18n.language || "fr";

  const projectData = [
    {
      id: 'loi-cadre',
      title: t('projects.loiCadre.title'),
      desc: t('projects.loiCadre.description'),
      techs: ['.NET', 'ASP.NET Core', 'Entity Framework Core', 'Angular', 'SQL Server'],
    },
    {
      id: 'expense-tracker',
      title: t('projects.expenseTracker.title'),
      desc: t('projects.expenseTracker.description'),
      techs: ['.NET 8', 'ASP.NET Core', 'SQLite', 'JWT', 'Angular 18', 'Chart.js', 'ngx-charts'],
    },
    {
      id: 'booking-app',
      title: t('projects.bookingApp.title'),
      desc: t('projects.bookingApp.description'),
      techs: ['Java', 'Spring Boot', 'Spring Security', 'REST API', 'MySQL'],
    },
    {
      id: 'fleet-app',
      title: t('projects.fleetApp.title'),
      desc: t('projects.fleetApp.description'),
      techs: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'MySQL', 'JUnit'],
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projectData.map((proj, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <HashLink
            smooth
            to={`/${lang}/projects/${proj.id}`}
            aria-label={proj.title}
            className="group block rounded-2xl h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/70"
          >
            <div
              className="
                relative rounded-2xl p-5 md:p-6
                bg-white/80 dark:bg-[#0B0B14]/40
                border border-gray-200 dark:border-transparent
                shadow-sm transition-all duration-300
                hover:shadow-md hover:-translate-y-0.5
                min-h-[290px] flex flex-col
              "
            >
              <FiExternalLink
                className="absolute top-5 right-5 opacity-50 group-hover:opacity-80 transition-opacity duration-200"
                size={18}
              />

              <h3 className="text-lg md:text-xl font-semibold mb-2 text-black dark:text-white pr-6">
                {proj.title}
              </h3>

              <p className="text-sm md:text-[15px] leading-relaxed text-gray-700 dark:text-gray-300 mb-4 flex-1">
                {proj.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {proj.techs.map((tech, idx) => (
                  <span
                    key={idx}
                    className="
                      text-[11px] md:text-xs font-medium px-2.5 py-1 rounded-full
                      bg-violet-100 text-violet-700
                      dark:bg-gray-800 dark:text-gray-200
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </HashLink>
        </motion.div>
      ))}
    </div>
  );
}

export default Projects;
