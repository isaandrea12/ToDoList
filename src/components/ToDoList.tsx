import { ChangeEvent, KeyboardEvent, useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

interface ToDoListProps {
  isDarkMode: boolean;
}

const ToDoList: React.FC<ToDoListProps> = ({ isDarkMode }) => {
  const storedValue = localStorage.getItem("todo") || "[]";
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState<
    { task: string; completed: boolean }[]
  >(storedValue && JSON.parse(storedValue));

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoList));
  }, [todoList]);

  // Load tasks from localStorage
  useEffect(() => {
    if (storedValue !== null) {
      const retrievedValue = JSON.parse(storedValue);
      setTodoList(retrievedValue);
    }
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = {
        task: inputValue,
        completed: false,
      };
      const arr = [...todoList, newTask];
      setTodoList(arr);
      setInputValue("");
    }
  };

  const handleDeleteTask = (indexToDelete: number) => {
    const updatedList = todoList.filter((_, index) => index !== indexToDelete);
    setTodoList(updatedList);
  };

  const handleTaskCompletionToggle = (indexToToggle: number) => {
    const updatedList = todoList.map((task, index) => {
      if (index === indexToToggle) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    });

    // Sort the updated list so completed tasks are at the bottom
    updatedList.sort((a, b) =>
      a.completed === b.completed ? 0 : a.completed ? 1 : -1
    );

    setTodoList(updatedList);
  };

  const sortedTodoList = todoList.sort((a, b) => {
    // Place completed tasks at the end
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return 0;
  });

  const handleEnterKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      // Prevent the form from actually submitting, which is the default behavior
      event.preventDefault();
      handleAddTask();
    }
  };

  return (
    <div className={`container p-4 ${isDarkMode ? "dark-main-container" : ""}`}>
      <h1 className="title pt-4">To-Do List</h1>
      <div className="input-group px-4 my-5">
        <input
          value={inputValue}
          type="text"
          className={`form-control input-taller border-0 mt-0 ${
            isDarkMode ? "dark-input" : ""
          }`}
          placeholder="Add Task..."
          onChange={handleInputChange}
          onKeyPress={handleEnterKeyPress}
        />
        <button
          type="button"
          className="btn btn-primary m-0"
          onClick={() => handleAddTask()}
        >
          Add
        </button>
      </div>
      <div
        className={`card card-main border-0 m-4 ${
          isDarkMode ? "dark-card-main" : ""
        }`}
      >
        <ul
          className={`task-list p-3 ${
            isDarkMode ? "dark-tasks-container" : ""
          }`}
        >
          {sortedTodoList.map((item, index) => (
            <div className="card task-card m-3" key={index}>
              <li
                className={`d-flex justify-content-between p-3 ${
                  isDarkMode ? "dark-task" : ""
                }`}
              >
                <div className="task-info">
                  <div className="">
                    <input
                      className="form-check-input"
                      value=""
                      aria-label="..."
                      id="checkboxNoLabel"
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleTaskCompletionToggle(index)}
                    />
                  </div>
                  <div
                    className={`task-text ${item.completed ? "completed" : ""}`}
                  >
                    {item.task}
                  </div>
                </div>
                <button
                  type="button"
                  className={`btn btn-delete btn-sm ${
                    isDarkMode ? "dark-button" : ""
                  }`}
                  onClick={() => handleDeleteTask(index)}
                >
                  <FaTrash
                    className={`fa-trash ${isDarkMode ? "dark-fa-trash" : ""}`}
                  />
                </button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
