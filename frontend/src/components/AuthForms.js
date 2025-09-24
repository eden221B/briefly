// frontend/src/components/AuthForms.js
// frontend/src/components/AuthForms.js
import React, { useState } from 'react';
import API, { setAuthToken } from '../services/api';
import backgroundImage from "../assets/back.jpg";

export default function AuthForms({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const body = isLogin ? { email, password } : { name, email, password };
      const res = await API.post(url, body);
      const { token, user } = res.data;
      setAuthToken(token);
      onAuth(user);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Auth error');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${backgroundImage})`,
        padding: '20px',
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
          marginBottom: "70px",
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#333' }}>
          {isLogin ? 'Login' : 'Signup'}
        </h2>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {!isLogin && (
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '16px'
              }}
            />
          )}
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '12px',
              borderRadius: '6px',
              border: 'none',
              background: '#333',
              color: '#fff',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => (e.target.style.background = '#8f8d8d')}
            onMouseOut={(e) => (e.target.style.background = '#333')}
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <p style={{ marginTop: '15px', fontSize: '14px', color: '#555' }}>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: 'none',
              border: 'none',
              color: '#2575fc',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '14px'
            }}
          >
            {isLogin ? 'Switch to Signup' : 'Switch to Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
