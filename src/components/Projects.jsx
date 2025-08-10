import { HashLink } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';

function Projects() {
  const { t } = useTranslation();

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
    <div className="flex flex-col gap-6">
      {projectData.map((proj, index) => (
        <HashLink
          key={index}
          smooth
          to={`/#${proj.id}`}
          aria-label={proj.title}
          className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/70 rounded-2xl"
        >
          <div
            className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300
                       bg-white/60 backdrop-blur-md border border-transparent shadow-sm
                       hover:shadow-[0_16px_48px_-20px_rgba(217,70,239,0.45)] hover:-translate-y-0.5
                       dark:bg-[#0B0B14]/40 dark:backdrop-blur-md dark:border-fuchsia-400/10"
          >
            {/* Neon accent bar (not a frame) */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-fuchsia-500 via-violet-500/70 to-cyan-400"
            />

            <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
              {proj.title}
              <span
                className="ml-2 inline-block translate-x-0 opacity-60 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                aria-hidden="true"
              >
                →
              </span>
            </h3>

            <p className="text-gray-700 dark:text-gray-300 mb-4">{proj.desc}</p>

            <div className="flex flex-wrap gap-2">
              {proj.techs.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-3 py-1 rounded-full backdrop-blur-[2px]
                             bg-white/60 text-violet-700 ring-1 ring-violet-200
                             hover:bg-white/70 transition-colors
                             dark:bg-white/10 dark:text-white dark:ring-white/15"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </HashLink>
      ))}
    </div>
  );
}

export default Projects;
