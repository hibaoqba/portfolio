import { useTranslation } from "react-i18next";
import { Linkedin, Github, Mail } from "lucide-react";

function Footer() {
  const { t } = useTranslation();
  const links = t("contact.links", { returnObjects: true });

  return (
    <footer className="bg-gray-100 dark:bg-transparent border-t border-gray-200 dark:border-white/10 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Texte */}
        <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg font-medium">
          © {new Date().getFullYear()} Hiba Oqba — {t("contact.location")}
        </p>

        {/* Réseaux sociaux */}
        <div className="flex gap-6">
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
          >
            <Linkedin size={28} strokeWidth={1.8} />
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
          >
            <Github size={28} strokeWidth={1.8} />
          </a>
          <a
            href={`mailto:${t("contact.emailTo")}`}
            className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
          >
            <Mail size={28} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
