import React, { useState } from 'react';

export default function AuthForm({ mode = 'login', onSubmit, loading, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 350,
        margin: '2rem auto',
        padding: 16,
        border: '1px solid #ccc',
        borderRadius: 8,
      }}
    >
      <h2 style={{ textAlign: 'center' }}>
        {mode === 'signup' ? 'Sign Up' : 'Login'}
      </h2>

      <div style={{ marginBottom: 12 }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: 8 }}>
          {error}
        </div>
      )}

      <button
        disabled={loading}
        type="submit"
        style={{
          width: '100%',
          padding: 10,
          background: '#5461f7',
          color: 'white',
          fontWeight: 600,
          border: 'none',
          borderRadius: 4,
        }}
      >
        {loading ? 'Loading...' : mode === 'signup' ? 'Sign Up' : 'Login'}
      </button>
    </form>
  );
}