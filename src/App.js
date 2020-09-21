import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Dashboard from './components/dashboard/Dashboard';
import TeamPage from './components/team_page/TeamPage';
import Teams from './components/dashboard/teams/Teams'
import ProjectPage from './components/project_page/ProjectPage';
import HomePage from './components/homepage/HomePage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/team/:teamid/project/:projectid">
          <ProjectPage />
        </Route>
        <Route path="/team/:teamid">
          <TeamPage />
        </Route>
        <Route path="/teams">
          <Teams />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
