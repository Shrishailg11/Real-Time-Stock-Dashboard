import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const handleAuthChange = () => {
    setAuthenticated(!!localStorage.getItem('token'));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  };

  return (
    <Router>
      <nav style={{ padding: 8, marginBottom: 20, background: '#eee' }}>
        {!authenticated ? (
          <>
            <Link to="/login" style={{ marginRight: 12 }}>
              Login
            </Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" style={{ marginRight: 12 }}>
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              style={{ padding: '4px 12px', fontWeight: 600 }}
            >
              Logout
            </button>
          </>
        )}
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            authenticated ? (
              <DashboardPage />
            ) : (
              <LoginPage onAuth={handleAuthChange} />
            )
          }
        />
        <Route
          path="/login"
          element={<LoginPage onAuth={handleAuthChange} />}
        />
        <Route
          path="/signup"
          element={<SignupPage onAuth={handleAuthChange} />}
        />
        <Route
          path="/dashboard"
          element={
            authenticated ? (
              <DashboardPage />
            ) : (
              <LoginPage onAuth={handleAuthChange} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;