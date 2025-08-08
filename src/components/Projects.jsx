import { HashLink } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';

function Projects() {
  const { t } = useTranslation();

  const projectData = [
    {
      id: "loi-cadre",
      title: t("projects.loiCadre.title"),
      desc: t("projects.loiCadre.description"),
      techs: [".NET", "ASP.NET Core", "Entity Framework Core", "Angular", "SQL Server"]
    },
    {
      id: "expense-tracker",
      title: t("projects.expenseTracker.title"),
      desc: t("projects.expenseTracker.description"),
      techs: [".NET 8", "ASP.NET Core", "SQLite", "JWT", "Angular 18", "Chart.js", "ngx-charts"]
    },
    {
      id: "booking-app",
      title: t("projects.bookingApp.title"),
      desc: t("projects.bookingApp.description"),
      techs: ["Java", "Spring Boot", "Spring Security", "REST API", "MySQL"]
    },
    {
      id: "fleet-app",
      title: t("projects.fleetApp.title"),
      desc: t("projects.fleetApp.description"),
      techs: ["Java", "Spring Boot", "Spring Security", "Spring Data JPA", "MySQL", "JUnit"]
    }
  ];

  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-transparent">
      {projectData.map((proj, index) => (
        <HashLink key={index} smooth to={`/#${proj.id}`} className="block">
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-6 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-violet-700 dark:text-violet-400 mb-2">
              {proj.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {proj.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {proj.techs.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 dark:bg-blue-100/10 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full shadow-sm"
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
