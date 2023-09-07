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
    setTodoList(updatedList);
  };

  const handleEnterKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      // Prevent the form from actually submitting, which is the default behavior
      event.preventDefault();
      handleAddTask();
    }
  };

  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>
      <div className="input-group m-3 p-3">
        <input
          style={{ marginTop: "0" }}
          value={inputValue}
          type="text"
          className="form-control border-0"
          placeholder="What is the task today?"
          onChange={handleInputChange}
          onKeyPress={handleEnterKeyPress}
        />
        <button
          style={{ margin: "0" }}
          type="button"
          className="btn btn-primary"
          onClick={() => handleAddTask()}
        >
          Add Task
        </button>
      </div>
      <div
        className="card card-main border-0 m-4"
        style={{ height: "400px", overflowY: "auto" }}
      >
        <ul className="task-list p-3">
          {todoList.map((item, index) => (
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
