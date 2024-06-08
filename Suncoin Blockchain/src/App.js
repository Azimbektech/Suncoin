import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import AdminPanel from './components/AdminPanel';
import PasswordReset from './components/PasswordReset';
import ResetPassword from './components/ResetPassword';
import DataChart from './components/DataChart';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, logout } from './redux/authActions';
import { loadData } from './redux/dataActions';

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const data = useSelector(state => state.data);

  const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('token', token);
      dispatch(loadUser());
    } else {
      localStorage.removeItem('token');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <div>
        <Navigation isAuthenticated={auth.isAuthenticated} handleLogout={handleLogout} />
        <Switch>
          <Route path="/" exact>
            <Dashboard data={data.data} />
          </Route>
          <Route path="/login">
            <Auth setAuthToken={setAuthToken} />
          </Route>
          <Route path="/register">
            <Register setAuthToken={setAuthToken} />
          </Route>
          <Route path="/profile">
            <UserProfile authToken={auth.token} />
          </Route>
          <Route path="/admin">
            <AdminPanel />
          </Route>
          <Route path="/password-reset">
            <PasswordReset />
          </Route>
          <Route path="/reset/:token">
            <ResetPassword />
          </Route>
          <Route path="/chart">
            <DataChart data={data.data} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
