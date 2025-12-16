import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth.js';
import AuthForm from '../components/AuthForm.jsx';

export default function SignupPage({ onAuth }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      await signup(email, password);
      // optional: onAuth(); // if you want to auto-mark as authenticated
      navigate('/login');   // go to login after signup
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      mode="signup"
      onSubmit={handleSignup}
      loading={loading}
      error={error}
    />
  );
}