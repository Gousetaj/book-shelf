import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Login from './../components/Login';
import SignUp from './../components/SignUp';
import Dashboard from './../components/Dashboard';
import Bookshelf from './../components/Bookshelf';
import Profile from './../components/Profile';
import ProtectedRoute from './../components/ProtectedRoute';

const AppRouter: React.FC = () => {
  return (
    <Router>
    <Routes>
      {/* Non-Protected Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookshelf"
        element={
          <ProtectedRoute>
            <Bookshelf />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
    </Router>
  );
};

export default AppRouter;
