import { HashLink } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';

function Projects() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      {/* Projet 1 - Loi Cadre Budgétaire */}
      <HashLink smooth to="/#loi-cadre" className="block">
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200">
          <h3 className="text-xl font-bold text-violet-700 mb-2">
            {t("projects.loiCadre.title")}
          </h3>
          <p className="text-gray-600 mb-4">
            {t("projects.loiCadre.description")}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="tech-tag">.NET</span>
            <span className="tech-tag">ASP.NET Core</span>
            <span className="tech-tag">Entity Framework Core</span>
            <span className="tech-tag">Angular</span>
            <span className="tech-tag">SQL Server</span>
          </div>
        </div>
      </HashLink>

      {/* Projet 2 - Expense Tracker */}
      <HashLink smooth to="/#expense-tracker" className="block">
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200">
          <h3 className="text-xl font-bold text-violet-700 mb-2">
            {t("projects.expenseTracker.title")}
          </h3>
          <p className="text-gray-600 mb-4">
            {t("projects.expenseTracker.description")}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="tech-tag">.NET 8</span>
            <span className="tech-tag">ASP.NET Core</span>
            <span className="tech-tag">SQLite</span>
            <span className="tech-tag">JWT</span>
            <span className="tech-tag">Angular 18</span>
            <span className="tech-tag">Chart.js</span>
            <span className="tech-tag">ngx-charts</span>
          </div>
        </div>
      </HashLink>

      {/* Projet 3 - Booking App */}
      <HashLink smooth to="/#booking-app" className="block">
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200">
          <h3 className="text-xl font-bold text-violet-700 mb-2">
            {t("projects.bookingApp.title")}
          </h3>
          <p className="text-gray-600 mb-4">
            {t("projects.bookingApp.description")}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="tech-tag">Java</span>
            <span className="tech-tag">Spring Boot</span>
            <span className="tech-tag">Spring Security</span>
            <span className="tech-tag">REST API</span>
            <span className="tech-tag">MySQL</span>
          </div>
        </div>
      </HashLink>

      {/* Projet 4 - Fleet App */}
      <HashLink smooth to="/#fleet-app" className="block">
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200">
          <h3 className="text-xl font-bold text-violet-700 mb-2">
            {t("projects.fleetApp.title")}
          </h3>
          <p className="text-gray-600 mb-4">
            {t("projects.fleetApp.description")}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="tech-tag">Java</span>
            <span className="tech-tag">Spring Boot</span>
            <span className="tech-tag">Spring Security</span>
            <span className="tech-tag">Spring Data JPA</span>
            <span className="tech-tag">MySQL</span>
            <span className="tech-tag">JUnit</span>
          </div>
        </div>
      </HashLink>
    </div>
  );
}

export default Projects;
