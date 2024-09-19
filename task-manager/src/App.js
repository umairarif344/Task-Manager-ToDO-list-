import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TaskProvider } from './TaskContext';
import TaskManager from './TaskManager';
import LandingPage from './LandingPage';

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tasks" element={<TaskManager />} />
          <Route path="/tasks/:category" element={<TaskManager />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
