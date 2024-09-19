import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

const getTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(getTasksFromLocalStorage());
  const [categories, setCategories] = useState(['Work', 'Personal']);
  const [currentCategory, setCurrentCategory] = useState('All');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, category) => {
    if (text.trim() !== '') {
      const newTask = { text, completed: false, category, id: Date.now() };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  const toggleTaskCompletion = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const filteredTasks = currentCategory === 'All'
    ? tasks
    : tasks.filter(task => task.category === currentCategory);

  return (
    <TaskContext.Provider value={{
      tasks: filteredTasks,
      addTask,
      toggleTaskCompletion,
      deleteTask,
      categories,
      currentCategory,
      setCurrentCategory,
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
