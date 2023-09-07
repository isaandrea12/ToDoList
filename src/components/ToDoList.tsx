import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FaTrash } from "react-icons/fa";

const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState<
    { task: string; completed: boolean }[]
  >([]);

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
    <div className="container mt-5 p-4">
      <h1 className="title pt-4">To-Do List</h1>
      <div className="input-group px-4 my-5">
        <input
          value={inputValue}
          type="text"
          className="form-control input-taller border-0 mt-0"
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
      <div className="card card-main border-0 m-4" style={{ height: "400px" }}>
        <ul className="task-list p-3">
          {sortedTodoList.map((item, index) => (
            <div className="card task-card p-3 m-3" key={index}>
              <li className="d-flex justify-content-between">
                <div className="task-info">
                  <div>
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
                  className="btn btn-delete btn-sm"
                  onClick={() => handleDeleteTask(index)}
                >
                  <FaTrash className="fa-trash" />
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
