import { useState } from "react";
import ToDoList from "./components/ToDoList";

function App() {
  const currentYear = new Date().getFullYear();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="form-check form-switch">
        <input
          onClick={toggleDarkMode}
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
        />
        <label className="form-check-label">Dark Mode</label>
      </div>
      <ToDoList></ToDoList>
      <footer className="footer">
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
