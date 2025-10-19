import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import HeroPattern from "../components/HeroPattern";
import AppLayout from "./AppLayout";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function LoiCadrePage() {
  const { t } = useTranslation();

  return (
    <AppLayout>
      {/* HERO */}
      <section
        id="loi-cadre"
        className="relative flex flex-col items-center justify-center min-h-[100vh] overflow-hidden bg-gray-50 text-gray-900 dark:text-white"
      >
        <HeroPattern variant="tri-classic" />
        <div className="relative z-10 text-center px-6 md:px-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            {t("projectDetails.loiCadre.title")}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            {t("projectDetails.loiCadre.subtitle")}
          </p>
        </div>
        <div
          className="pointer-events-none absolute -bottom-[2px] -left-[2px] -right-[2px] h-44
                     bg-gradient-to-b from-transparent to-[var(--bg0)] dark:to-[var(--bg0)]"
          aria-hidden="true"
        />
      </section>

      {/* MAIN BODY */}
      <section className="px-6 md:px-20 py-20 max-w-6xl mx-auto text-gray-800 dark:text-gray-200 space-y-24">
        {/* OVERVIEW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            {t("projectDetails.loiCadre.overview.title")}
          </h2>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
            {t("projectDetails.loiCadre.overview.text")}
          </p>
        </motion.div>

        {/* CONTEXT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl p-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
            {t("projectDetails.loiCadre.context.title")}
          </h3>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
            {t("projectDetails.loiCadre.context.text")}
          </p>
        </motion.div>

        {/* OBJECTIVES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl p-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <h3 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            {t("projectDetails.loiCadre.objectives.title")}
          </h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            {t("projectDetails.loiCadre.objectives.items", { returnObjects: true }).map((goal, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 flex-shrink-0"></span>
                {goal}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ARCHITECTURE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl p-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <h3 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            {t("projectDetails.loiCadre.architecture.title")}
          </h3>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-10 text-center">
            {t("projectDetails.loiCadre.architecture.text")}
          </p>
          {/* Light and Dark diagram */}
          
        </motion.div>

        {/* TECHNOLOGIES */}
        <div className="grid md:grid-cols-2 gap-10">
          {["frontend", "backend"].map((side) => (
            <motion.div
              key={side}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 transition"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                {t(`projectDetails.loiCadre.technologies.${side}.title`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {t(`projectDetails.loiCadre.technologies.${side}.items`, {
                  returnObjects: true,
                }).map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* MODULES + SECURITY */}
        <div className="grid md:grid-cols-2 gap-10">
          {["modules", "security"].map((section, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="rounded-2xl p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                {t(`projectDetails.loiCadre.${section}.title`)}
              </h3>
              <div className="space-y-3 text-gray-700 dark:text-gray-300 text-base">
                {t(`projectDetails.loiCadre.${section}.items`, {
                  returnObjects: true,
                }).map((f, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0"></span>
                    <p>{f}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* IMPACT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl p-10 bg-gradient-to-br from-purple-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-purple-200 dark:border-gray-800 shadow-md"
        >
          <h3 className="text-3xl font-bold mb-6 text-center text-purple-700 dark:text-purple-300">
            {t("projectDetails.loiCadre.impact.title")}
          </h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            {t("projectDetails.loiCadre.impact.items", { returnObjects: true }).map((impact, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 w-2 h-2 rounded-full bg-purple-500 flex-shrink-0"></span>
                {impact}
              </li>
            ))}
          </ul>
        </motion.div>

        
      </section>
    </AppLayout>
  );
}
