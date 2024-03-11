import SignupForm from './components/SignupForm';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardForm from "./components/DashboardForm";
import ProfileForm from "./components/ProfileForm";
import ProjectForm from './components/ProjectForm';
import TaskForm from './components/TaskForm';
import NewFinalLogin from './components/NewFinalLogin';
import Analytics from './components/analyticsData';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<NewFinalLogin/>} />
        <Route path="/dashboard" element={<DashboardForm />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/project" element={<ProjectForm />} />
        <Route path="/task" element={<TaskForm />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
