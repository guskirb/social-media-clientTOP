import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkMode() {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    if (localStorage.theme === "dark") {
      setDarkMode();
      setMode("dark");
    } else {
      setLightMode();
      setMode("light");
    }
  }, []);

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      setLightMode();
    } else {
      setMode("dark");
      setDarkMode();
    }
  };

  const setDarkMode = () => {
    document.querySelector("body")?.classList.add("dark");
    localStorage.theme = "dark";
  };
  const setLightMode = () => {
    document.querySelector("body")?.classList.remove("dark");
    localStorage.theme = "light";
  };
  return (
    <div className="fixed left-[22px] bottom-28 lg:left-auto lg:right-5 lg:bottom-5">
      <button
        onClick={toggleMode}
        className="transition-all bg-white dark:bg-slate-700 dark:text-white p-1 shadow-sm hover:shadow hover:scale-110"
      >
        {mode === "light" ? <Sun /> : <Moon />}
      </button>
    </div>
  );
}
