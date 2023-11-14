import { useEffect, useState } from "react";
import ToDoList from "./components/ToDoList";

function App() {
  const currentYear = new Date().getFullYear();
  const [isDarkMode, setIsDarkMode] = useState(
    Boolean(localStorage.getItem("darkMode"))
  );

  // Save dark mode preference to localStorage
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") || "false";
    localStorage.setItem(
      "darkMode",
      storedDarkMode === "false" ? "true" : "false"
    );
    setIsDarkMode(JSON.parse(storedDarkMode));
  }, []);

  const toggleDarkMode = () => {
    const storedDarkMode = localStorage.getItem("darkMode") || "false";
    localStorage.setItem(
      "darkMode",
      storedDarkMode === "false" ? "true" : "false"
    );
    setIsDarkMode(JSON.parse(storedDarkMode));
  };

  return (
    <div className={`${!isDarkMode ? "dark-background" : ""}`}>
      <span className="toggle-title">Dark Mode</span>
      <div className="toggle-container">
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={!isDarkMode}
            onChange={toggleDarkMode}
          />
          <span className="switch" />
        </label>
      </div>
      <ToDoList isDarkMode={!isDarkMode} />
      <footer className={`footer ${!isDarkMode ? "dark-footer" : ""}`}>
        <strong>
          <p>
            &copy;{currentYear}{" "}
            <a
              href="https://github.com/isaandrea12/ToDoList"
              className="containerLink"
              target="_blank"
              rel="noreferrer"
            >
              Isabel Muñiz
            </a>
          </p>
        </strong>
      </footer>
    </div>
  );
}

export default App;
