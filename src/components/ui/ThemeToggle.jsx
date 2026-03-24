import { Sun, Moon } from "lucide-react";
import useTheme from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-colors duration-200 bg-cyan-500 text-white hover:bg-cyan-400 dark:bg-cyan-200 dark:text-black dark:hover:bg-cyan-300"
      aria-label="Toggle dark mode"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-white dark:text-black" />
      ) : (
        <Moon size={18} className="text-white dark:text-black" />
      )}
    </button>
  );
}