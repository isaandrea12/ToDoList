import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FaTrash } from "react-icons/fa";

const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState<string[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      const arr = [...todoList, inputValue];
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
          value={inputValue}
          type="text"
          className="form-control border-0"
          placeholder="What is the task today?"
          onChange={handleInputChange}
          onKeyPress={handleEnterKeyPress}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleAddTask()}
        >
          Add Task
        </button>
      </div>
      <div className="card border-0">
        <ul className="task-list pe-3 pt-3">
          {todoList.map((item, index) => (
            <li key={index}>
              {item}
              <button
                type="button"
                className="btn btn-delete btn-sm ms-2 mr-5"
                onClick={() => handleDeleteTask(index)}
              >
                <FaTrash className="fa-trash"></FaTrash>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
