import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!task.trim()) return;
    setTodos([...todos, task]);
    setTask("");
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <div className="todo">
        <h1>ToDo List</h1>

        <div className="input">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
          />
          <button onClick={addTodo}>Add</button>
        </div>

        {todos.map((item, index) => (
          <div className="item" key={index}>
            <span>{item}</span>
            <button onClick={() => deleteTodo(index)}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;