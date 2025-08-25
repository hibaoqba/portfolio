import { FaMoon, FaSun } from "react-icons/fa";
import React from "react";

function ThemeToggle() {
 const getInitialTheme = () => {
  const stored = localStorage.getItem("theme");
  if (stored) return stored;
  return "dark"; 
};


  const [theme, setTheme] = React.useState(getInitialTheme);
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
    localStorage.setItem("theme", theme);
    return () => window.clearTimeout(timeoutRef.current);
  }, [theme]);

  const withSmoothTransition = (nextTheme) => {
    const root = document.documentElement;
    root.classList.add("theme-switching");
    window.clearTimeout(timeoutRef.current);
    requestAnimationFrame(() => setTheme(nextTheme));
    timeoutRef.current = window.setTimeout(() => {
      root.classList.remove("theme-switching");
    }, 360);
  };

  return (
    <button
      onClick={() => withSmoothTransition(theme === "dark" ? "light" : "dark")}
      className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg
                 bg-white dark:opacity-80 dark:bg-brand-950 hover:scale-105
                 transition-transform duration-300"
      aria-label="Toggle dark mode"
    >
      <span className="grid place-items-center transition-transform duration-300">
        {theme === "dark" ? (
          <FaSun className="text-yellow-400 text-lg animate-[spin_0.4s_linear]" />
        ) : (
          <FaMoon className="text-slate-800 text-lg animate-[spin_0.4s_linear]" />
        )}
      </span>
    </button>
  );
}

export default ThemeToggle;
