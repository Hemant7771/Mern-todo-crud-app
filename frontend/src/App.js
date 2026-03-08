import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";
import "./App.css";

function App() {

  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("http://localhost:5000/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => console.log(err));
  };

  // Add Task
  const addTask = () => {

    if (!text.trim()) return;

    axios
      .post("http://localhost:5000/add", { text })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setText("");
      })
      .catch((err) => console.log(err));
  };

  // Delete Task
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then(() => {
        setTasks(tasks.filter((t) => t._id !== id));
      })
      .catch((err) => console.log(err));
  };

  // Update Task
  const updateTask = (id, newText) => {
    axios
      .put(`http://localhost:5000/update/${id}`, { text: newText })
      .then((res) => {
        setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">

      <h1>MERN ToDo App</h1>

      <div className="inputBox">
        <input
          type="text"
          placeholder="Enter your task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="addBtn" onClick={addTask}>
          Add
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        ))}
      </ul>

    </div>
  );
}

export default App;