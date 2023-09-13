import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === '') return;
    const newTask = { text: task, completed: false };
    setTasks([...tasks, newTask]);
    setTask('');
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleTaskStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <center>
      <div className="container">
      <h1>To-Do App</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((item, index) => (
          <li
            key={index}
            className={item.completed ? 'completed' : 'pending'}
          >
            {item.text}
            <button onClick={() => toggleTaskStatus(index)}>
              {item.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => setTasks([])}>Clear All</button>
    </div>
    </center>
  );
}

export default App;