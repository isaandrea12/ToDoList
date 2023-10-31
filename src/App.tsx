import ToDoList from "./components/ToDoList";

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
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
