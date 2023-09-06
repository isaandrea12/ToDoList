import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FaTrash } from "react-icons/fa";

const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState<
    { task: string; timestamp: string }[]
  >([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const getCurrentTimestamp = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = { task: inputValue, timestamp: getCurrentTimestamp() };
      const arr = [...todoList, newTask];
      setTodoList(arr);
      setInputValue("");
    }
  };
  const handleDeleteTask = (indexToDelete: number) => {
    const updatedList = todoList.filter((_, index) => index !== indexToDelete);
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
      <div className="input-group mb-3">
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
            <div className="card task-card p-3 m-3">
              <li className="d-flex justify-content-between" key={index}>
                <div className="task-info">
                  <div>{item.task}</div>
                  <div className="task-date">{item.timestamp}</div>
                </div>
                <button
                  type="button"
                  className="btn btn-delete btn-sm ms-2 mr-5"
                  onClick={() => handleDeleteTask(index)}
                >
                  <FaTrash className="fa-trash"></FaTrash>
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
