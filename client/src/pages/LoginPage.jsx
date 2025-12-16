import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth.js';
import AuthForm from '../components/AuthForm.jsx';

export default function LoginPage({ onAuth }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await login(email, password);
      localStorage.setItem('token', data.token);
      if (onAuth) onAuth();
      navigate('/dashboard'); // redirect after successful login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      mode="login"
      onSubmit={handleLogin}
      loading={loading}
      error={error}
    />
  );
}