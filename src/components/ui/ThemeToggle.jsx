import useTheme from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg font-bold transition-colors duration-200 bg-cyan-500 text-white hover:bg-cyan-400 dark:bg-cyan-200 dark:text-black dark:hover:bg-cyan-300"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? "LIGHT" : "DARK"}
    </button>
  );
}