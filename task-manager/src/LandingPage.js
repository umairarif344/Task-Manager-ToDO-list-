import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="content">
        <h1>Welcome to Task Manager</h1>
        <p>Organize your tasks effortlessly and boost your productivity.</p>
        <Link to="/tasks" className="get-started">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
