
import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("myTasks")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task.trim(),
        done: false
      }
    ]);

    setTask("");
  }

  function toggleTask(id) {
    setTasks(tasks.map(item =>
      item.id === id
        ? { ...item, done: !item.done }
        : item
    ));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(item => item.id !== id));
  }

  return (
    <div className="app">
      <div className="card">
        <h1>✨ My ToDo</h1>
        <p className="subtitle">Make today productive!</p>

        <div className="input-box">
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={e => setTask(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") addTask();
            }}
          />

          <button onClick={addTask}>Add +</button>
        </div>

        <h3>My Tasks ({tasks.length})</h3>

        {tasks.length === 0 ? (
          <p className="empty">No tasks yet. Add your first task!</p>
        ) : (
          tasks.map(item => (
            <div className="task" key={item.id}>
              <span
                className={item.done ? "completed" : ""}
                onClick={() => toggleTask(item.id)}
              >
                {item.done ? "✅" : "⭕"} {item.text}
              </span>

              <button
                className="delete"
                onClick={() => deleteTask(item.id)}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
