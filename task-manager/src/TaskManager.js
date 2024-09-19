import React, { useEffect, useState } from 'react';
import { useTasks } from './TaskContext';
import { useParams, Link } from 'react-router-dom';
import './TaskManager.css';

const TaskManager = () => {
  const { tasks, addTask, toggleTaskCompletion, deleteTask, categories, currentCategory, setCurrentCategory } = useTasks();
  const { category } = useParams(); // Get category from URL
  const [taskInput, setTaskInput] = useState('');
  
  useEffect(() => {
    if (category) {
      setCurrentCategory(category);
    } else {
      setCurrentCategory('All');
    }
  }, [category, setCurrentCategory]);

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask(taskInput, currentCategory);
    setTaskInput('');
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task"
        />
        <select
          value={currentCategory}
          onChange={(e) => setCurrentCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>

      <h2>Tasks in {currentCategory}</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTaskCompletion(index)}>{task.text}</span>
            <button className="delete" onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <nav>
        {categories.map((category) => (
          <Link key={category} to={`/tasks/${category}`} onClick={() => setCurrentCategory(category)}>
            {category}
          </Link>
        ))}
        <Link to="/tasks" onClick={() => setCurrentCategory('All')}>All</Link>
      </nav>
    </div>
  );
};

export default TaskManager;
