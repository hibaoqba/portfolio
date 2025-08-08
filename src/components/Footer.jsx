import { useTranslation } from "react-i18next";
import { Linkedin, Github, Mail } from "lucide-react";

function Footer() {
  const { t } = useTranslation();
  const links = t("contact.links", { returnObjects: true });

  const year = new Date().getFullYear();
  const email = t("contact.emailTo");

  return (
    <footer
      className="
        relative mt-16
        border-t border-gray-200 dark:border-white/10
        bg-white/60 dark:bg-white/[0.03] backdrop-blur
        transition-colors duration-200
      "
    >
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="py-10 grid gap-8 md:grid-cols-2">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <img
                src="/hiba_logo.png"
                alt="Hiba Oqba logo"
                className="h-10 w-10 object-contain dark:brightness-95"
              />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    Hiba Oqba
                  </span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400/90">
                  {t("contact.location")}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {t("footer.tagline", "Engineering reliable, user‑centric web experiences.")}
            </p>
          </div>

         
          <div className="md:justify-self-end">
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${email}`}
                className="
                  inline-flex items-center gap-2 text-sm font-medium
                  text-gray-800 dark:text-gray-100
                  hover:text-violet-600 dark:hover:text-violet-400
                  transition-colors
                "
              >
                <Mail size={18} className="opacity-90" />
                {email}
              </a>
            </div>
            <ul className="mt-4 flex items-center gap-3">
              <li>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="
                    inline-flex h-10 w-10 items-center justify-center
                    rounded-xl border border-gray-200 dark:border-white/10
                    bg-white dark:bg-white/5
                    text-gray-700 dark:text-gray-200
                    hover:text-violet-600 dark:hover:text-violet-400
                    hover:shadow-sm
                    transition-colors duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60
                  "
                >
                  <Linkedin size={20} strokeWidth={1.8} />
                </a>
              </li>
              <li>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="
                    inline-flex h-10 w-10 items-center justify-center
                    rounded-xl border border-gray-200 dark:border-white/10
                    bg-white dark:bg-white/5
                    text-gray-700 dark:text-gray-200
                    hover:text-violet-600 dark:hover:text-violet-400
                    hover:shadow-sm
                    transition-colors duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60
                  "
                >
                  <Github size={20} strokeWidth={1.8} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {year} Hiba Oqba · {t("contact.rights", "All rights reserved")}
          </p>
         
        </div>
      </div>
    </footer>
  );
}

export default Footer;
