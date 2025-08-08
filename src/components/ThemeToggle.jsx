import { FaMoon, FaSun } from "react-icons/fa";
import React from "react";
function ThemeToggle() {
  const [theme, setTheme] = React.useState(localStorage.getItem("theme") || "light");

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg
                 bg-white dark:bg-slate-800 hover:scale-105
                 transition-transform duration-200"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <FaSun className="text-yellow-400 text-lg" />
      ) : (
        <FaMoon className="text-slate-800 text-lg" />
      )}
    </button>
  );
}

export default ThemeToggle;
